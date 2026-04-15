"""
Build schools.json from IPEDS HD (Institutional Characteristics) CSV.
No API key required — downloads directly from NCES public data.
"""
import json, re, csv, io, zipfile, urllib.request, os, sys

# IPEDS HD file: institution-level data for all ~6,700 US colleges
IPEDS_HD_URL = "https://nces.ed.gov/ipeds/datacenter/data/HD2023.zip"
IPEDS_CSV_NAME = "HD2023.csv"

CACHE_ZIP = "tmp/HD2023.zip"
CACHE_CSV = "tmp/hd2023.csv"
OUT_FILE  = "src/data/schools.json"

# IPEDS ICLEVEL: 1=4-year, 2=2-year, 3=less-than-2-year
# SECTOR: 0=admin,1=pub 4yr,2=priv np 4yr,3=priv fp 4yr,4=pub 2yr,5=priv np 2yr,6=priv fp 2yr,7=pub <2yr,8=priv np <2yr,9=priv fp <2yr
# CLOSEDAT: -2 = still open
KEEP_ICLEVEL = {"1"}          # 4-year only
KEEP_SECTOR  = {"1","2","3"}  # 4-year public + nonprofit + for-profit

def slugify(name: str) -> str:
    s = name.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")

def normalize(s: str) -> str:
    s = s.lower()
    s = re.sub(r"\b(university|college|institute|of|the|at|state|community|technical|and|a|&)\b", "", s)
    s = re.sub(r"[^a-z0-9]+", "", s)
    return s

REGION_MAP = {
    "1":"New England","2":"Mid East","3":"Great Lakes","4":"Plains",
    "5":"Southeast","6":"Southwest","7":"Rocky Mountains","8":"Far West","9":"Outlying Areas"
}

STATE_REGION = {
    "CT":"New England","ME":"New England","MA":"New England","NH":"New England","RI":"New England","VT":"New England",
    "DE":"Mid East","MD":"Mid East","NJ":"Mid East","NY":"Mid East","PA":"Mid East",
    "IL":"Great Lakes","IN":"Great Lakes","MI":"Great Lakes","OH":"Great Lakes","WI":"Great Lakes",
    "IA":"Plains","KS":"Plains","MN":"Plains","MO":"Plains","NE":"Plains","ND":"Plains","SD":"Plains",
    "AL":"Southeast","AR":"Southeast","FL":"Southeast","GA":"Southeast","KY":"Southeast","LA":"Southeast",
    "MS":"Southeast","NC":"Southeast","SC":"Southeast","TN":"Southeast","VA":"Southeast","WV":"Southeast",
    "AZ":"Southwest","NM":"Southwest","OK":"Southwest","TX":"Southwest",
    "CO":"Rocky Mountains","ID":"Rocky Mountains","MT":"Rocky Mountains","UT":"Rocky Mountains","WY":"Rocky Mountains","NV":"Rocky Mountains",
    "AK":"Far West","CA":"Far West","HI":"Far West","OR":"Far West","WA":"Far West",
    "DC":"Mid East","PR":"Outlying Areas","GU":"Outlying Areas","VI":"Outlying Areas",
}

def download_ipeds():
    """Download and cache the IPEDS HD CSV."""
    os.makedirs("tmp", exist_ok=True)
    if not os.path.exists(CACHE_CSV):
        if not os.path.exists(CACHE_ZIP):
            print(f"Downloading IPEDS HD2023 from NCES...", flush=True)
            urllib.request.urlretrieve(IPEDS_HD_URL, CACHE_ZIP)
            print(f"  Downloaded {os.path.getsize(CACHE_ZIP)//1024}KB", flush=True)
        print("Extracting CSV...", flush=True)
        with zipfile.ZipFile(CACHE_ZIP) as z:
            with z.open(IPEDS_CSV_NAME) as src, open(CACHE_CSV, "wb") as dst:
                dst.write(src.read())
        print(f"  Extracted to {CACHE_CSV}", flush=True)
    else:
        print(f"Using cached {CACHE_CSV}", flush=True)

def load_ipeds():
    """Parse IPEDS HD CSV and return list of institution dicts."""
    schools = []
    with open(CACHE_CSV, encoding="latin-1") as f:
        reader = csv.DictReader(f)
        for row in reader:
            iclevel = row.get("ICLEVEL", "").strip()
            sector   = row.get("SECTOR",  "").strip()
            closedat = row.get("CLOSEDAT","").strip()

            # Keep only operating 4-year institutions
            if iclevel not in KEEP_ICLEVEL:
                continue
            if sector not in KEEP_SECTOR:
                continue
            # CLOSEDAT -2 = open; anything else = closed/unknown
            if closedat not in ("-2", ""):
                continue

            name  = row.get("INSTNM", "").strip()
            city  = row.get("CITY",   "").strip()
            state = row.get("STABBR", "").strip()
            url   = row.get("WEBADDR","").strip()
            enroll_str = row.get("EFYTOTLT","0").strip()
            try:
                enrollment = int(enroll_str)
            except ValueError:
                enrollment = 0

            if not name:
                continue

            schools.append({
                "name": name,
                "city": city,
                "state": state,
                "url": url,
                "enrollment": enrollment,
                "sector": sector,
            })

    return schools

def load_ncaa_colors():
    """Load color + mascot data from glidej.json."""
    glidej_path = "tmp/glidej.json"
    if not os.path.exists(glidej_path):
        print("  WARNING: tmp/glidej.json not found, skipping colors", file=sys.stderr)
        return {}

    with open(glidej_path, encoding="utf-8") as f:
        teams = json.load(f)

    color_map = {}
    for t in teams:
        full = t.get("name", "")
        words = full.split()
        if len(words) < 2:
            continue

        # Try splitting off 1–3 word mascots
        for n in (3, 2, 1):
            if len(words) > n:
                mascot = " ".join(words[-n:])
                school = " ".join(words[:-n])
                key = normalize(school)
                if key and key not in color_map:
                    colors = [c for c in t.get("colors", [])
                              if c.lower() not in ("#ffffff","#fff","#000000","#000")]
                    if not colors:
                        colors = t.get("colors", [])
                    primary   = colors[0] if colors else "#1e293b"
                    secondary = colors[1] if len(colors) > 1 else "#64748b"
                    color_map[key] = (primary, secondary, mascot)
                    break

    return color_map

def build():
    download_ipeds()

    print("Parsing IPEDS...", flush=True)
    raw = load_ipeds()
    print(f"  {len(raw)} operating 4-year institutions", flush=True)

    print("Loading NCAA colors...", flush=True)
    color_map = load_ncaa_colors()
    print(f"  {len(color_map)} color entries", flush=True)

    schools = []
    seen_slugs: dict[str, int] = {}
    matched = 0

    for r in raw:
        name  = r["name"]
        state = r["state"]
        city  = r["city"]

        # Deduplicate slugs
        base_slug = slugify(name)
        if base_slug in seen_slugs:
            seen_slugs[base_slug] += 1
            slug = f"{base_slug}-{state.lower()}"
        else:
            seen_slugs[base_slug] = 1
            slug = base_slug

        # Match colors
        key = normalize(name)
        primary, secondary, nickname = "#1e293b", "#64748b", ""
        if key in color_map:
            primary, secondary, nickname = color_map[key]
            matched += 1
        else:
            # Fuzzy: substring match
            for ck, cv in color_map.items():
                if ck and len(ck) > 5 and (ck in key or key in ck):
                    primary, secondary, nickname = cv
                    matched += 1
                    break

        # Build short name
        short = name
        for prefix in ("University of ", "The "):
            if short.startswith(prefix):
                short = short[len(prefix):]
                break
        short = re.sub(r" University$| College$| Institute of Technology$| Institute$", "", short)

        region = STATE_REGION.get(state, "")

        schools.append({
            "slug":          slug,
            "name":          name,
            "shortName":     short,
            "nickname":      nickname,
            "city":          city,
            "state":         state,
            "region":        region,
            "primaryColor":  primary,
            "secondaryColor":secondary,
            "enrollment":    r["enrollment"],
            "url":           r["url"],
        })

    # Sort by name
    schools.sort(key=lambda x: x["name"].lower())

    os.makedirs("src/data", exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(schools, f, indent=2)

    print(f"\nWrote {len(schools)} schools to {OUT_FILE}")
    print(f"Color matches: {matched}/{len(schools)} ({matched*100//len(schools)}%)")
    print("\nSamples:")
    for i in (0, len(schools)//2, len(schools)-1):
        print(json.dumps(schools[i], indent=2))

if __name__ == "__main__":
    os.chdir(os.path.join(os.path.dirname(__file__), ".."))
    build()
