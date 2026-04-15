export type Product = {
  id: string;
  asin: string;         // Amazon image CDN only
  searchQuery: string;  // Used for the clickable Amazon search link (never 404s)
  title: string;
  description: string;
  price: string;
  category: ProductCategory;
  colors?: string[];
  tags: string[];
};

export type ProductCategory =
  | "bedding"
  | "storage"
  | "decor"
  | "tech"
  | "bath"
  | "desk"
  | "laundry"
  | "snacks"
  | "safety";

export const CATEGORIES: { id: ProductCategory; label: string; emoji: string; hue: string }[] = [
  { id: "bedding", label: "Bedding & Pillows", emoji: "🛏️", hue: "#ff3d6e" },
  { id: "storage", label: "Storage & Organization", emoji: "📦", hue: "#7c3aed" },
  { id: "decor", label: "Wall Decor & Lights", emoji: "🪩", hue: "#f59e0b" },
  { id: "tech", label: "Tech & Charging", emoji: "🔌", hue: "#06b6d4" },
  { id: "bath", label: "Bath Caddy & Shower", emoji: "🚿", hue: "#10b981" },
  { id: "desk", label: "Desk Essentials", emoji: "✏️", hue: "#6366f1" },
  { id: "laundry", label: "Laundry & Cleaning", emoji: "🧺", hue: "#ec4899" },
  { id: "snacks", label: "Snacks & Fridge", emoji: "🍿", hue: "#f97316" },
  { id: "safety", label: "Safety & Health", emoji: "🩹", hue: "#ef4444" },
];

export const PRODUCTS: Product[] = [
  // ── BEDDING ──────────────────────────────────────────────────────────────────
  {
    id: "mattress-topper",
    asin: "B00BDNQR40",
    searchQuery: "LUCID 3 inch memory foam mattress topper twin XL dorm",
    title: "3-Inch Memory Foam Mattress Topper (Twin XL)",
    description: "Dorm mattresses are brutal. This one fixes it.",
    price: "$49",
    category: "bedding",
    tags: ["must-have", "freshman"],
  },
  {
    id: "sheets-set",
    asin: "B07CWMHTBL",
    searchQuery: "twin XL microfiber sheet set dorm college soft",
    title: "Twin XL Microfiber Sheet Set",
    description: "Soft, breathable, machine-washable. Fits dorm lofts.",
    price: "$32",
    category: "bedding",
    tags: ["must-have"],
  },
  {
    id: "comforter",
    asin: "B084NNB4X9",
    searchQuery: "twin XL all season down alternative comforter dorm college",
    title: "All-Season Down Alternative Comforter (Twin XL)",
    description: "Hypoallergenic. Ships compressed. Machine washable.",
    price: "$45",
    category: "bedding",
    tags: ["must-have"],
  },
  {
    id: "pillow-pair",
    asin: "B07KKD2YBC",
    searchQuery: "bed pillows 2 pack hotel quality college dorm",
    title: "Luxury Bed Pillows (2 Pack)",
    description: "Stays cool. Doesn't flatten after a week.",
    price: "$38",
    category: "bedding",
    tags: ["must-have"],
  },
  {
    id: "mattress-pad",
    asin: "B07DFTN7ZY",
    searchQuery: "waterproof mattress pad twin XL college dorm protector",
    title: "Waterproof Mattress Pad (Twin XL)",
    description: "Because roommates have wine.",
    price: "$28",
    category: "bedding",
    tags: ["essential"],
  },
  {
    id: "bedrest-pillow",
    asin: "B0015WLBAW",
    searchQuery: "backrest reading pillow dorm bed desk support",
    title: "Backrest Reading Pillow",
    description: "Bed becomes a couch. Great for studying.",
    price: "$35",
    category: "bedding",
    tags: ["comfort"],
  },
  // ── STORAGE ──────────────────────────────────────────────────────────────────
  {
    id: "underbed-bins",
    asin: "B07YX5V7DP",
    searchQuery: "under bed storage bins set dorm lofted bed college",
    title: "Under-Bed Storage Bins (Set of 3)",
    description: "Fits under lofted dorm beds. Keeps floors clear.",
    price: "$34",
    category: "storage",
    tags: ["must-have"],
  },
  {
    id: "closet-organizer",
    asin: "B07HT4FW1G",
    searchQuery: "hanging closet organizer 6 shelf dorm college storage",
    title: "Hanging Closet Organizer (6-Shelf)",
    description: "Six shelves. Saves three cubic feet.",
    price: "$22",
    category: "storage",
    tags: ["must-have"],
  },
  {
    id: "bedside-caddy",
    asin: "B01K1EPQNG",
    searchQuery: "bedside caddy organizer dorm bed phone holder",
    title: "Bedside Caddy",
    description: "Phone, wallet, water. Always within reach.",
    price: "$15",
    category: "storage",
    tags: ["clever"],
  },
  {
    id: "rolling-cart",
    asin: "B07CN4J95P",
    searchQuery: "3 tier rolling utility cart dorm room organizer",
    title: "3-Tier Rolling Utility Cart",
    description: "Becomes whatever you need. Rolls anywhere.",
    price: "$40",
    category: "storage",
    tags: ["clever"],
  },
  {
    id: "shoe-rack",
    asin: "B08LQKSSH3",
    searchQuery: "over door shoe organizer dorm room storage pockets",
    title: "Over-the-Door Shoe Organizer",
    description: "Shoes, snacks, toiletries — fits everything.",
    price: "$14",
    category: "storage",
    tags: ["clever"],
  },
  // ── DECOR ─────────────────────────────────────────────────────────────────────
  {
    id: "string-lights",
    asin: "B01LPSXBEY",
    searchQuery: "warm white fairy string lights dorm room 33ft",
    title: "Warm White Fairy Lights (33ft)",
    description: "The one thing every dorm room has.",
    price: "$13",
    category: "decor",
    tags: ["aesthetic"],
  },
  {
    id: "led-strips",
    asin: "B08LVT17ZH",
    searchQuery: "RGB LED strip lights app controlled music sync dorm 16ft",
    title: "RGB LED Strip Lights (16ft)",
    description: "App-controlled. Music reactive. Govee or similar.",
    price: "$19",
    category: "decor",
    tags: ["aesthetic"],
  },
  {
    id: "tapestry",
    asin: "B07GKQ92BF",
    searchQuery: "large wall tapestry dorm room decor college bohemian",
    title: "Large Wall Tapestry",
    description: "Covers the cinderblock. Doesn't damage walls.",
    price: "$16",
    category: "decor",
    tags: ["aesthetic"],
  },
  {
    id: "command-strips",
    asin: "B073XF1FLN",
    searchQuery: "Command strips damage free hanging picture hanging dorm",
    title: "Command Strips Variety Pack",
    description: "Hang anything. Lose no deposit.",
    price: "$18",
    category: "decor",
    tags: ["essential"],
  },
  // ── DESK ──────────────────────────────────────────────────────────────────────
  {
    id: "desk-lamp",
    asin: "B07B9VYYQT",
    searchQuery: "LED desk lamp USB charging port dimmable college study",
    title: "LED Desk Lamp with USB Port",
    description: "Dimmable. Charges phone. Fits tight desks.",
    price: "$29",
    category: "desk",
    tags: ["must-have"],
  },
  // ── TECH ──────────────────────────────────────────────────────────────────────
  {
    id: "power-strip",
    asin: "B014QQKZQM",
    searchQuery: "surge protector power strip 8 outlets USB ports dorm college",
    title: "Surge Protector (8 Outlets + USB)",
    description: "Dorms only give you two outlets. This fixes that.",
    price: "$22",
    category: "tech",
    tags: ["must-have"],
  },
  {
    id: "extension-cord",
    asin: "B00PZX78IE",
    searchQuery: "15ft extension cord 3 outlet heavy duty dorm college",
    title: "15ft Extension Cord (3-Outlet)",
    description: "The outlet is never where you want it.",
    price: "$11",
    category: "tech",
    tags: ["essential"],
  },
  {
    id: "fan-clip",
    asin: "B07Q3QNXMN",
    searchQuery: "USB clip on fan bed frame dorm room desk personal",
    title: "USB Clip-On Fan",
    description: "Dorms run hot. Clips to the bed frame.",
    price: "$22",
    category: "tech",
    tags: ["essential"],
  },
  // ── SNACKS ────────────────────────────────────────────────────────────────────
  {
    id: "mini-fridge",
    asin: "B07Y8MYC9B",
    searchQuery: "mini fridge freezer 3.2 cu ft dorm room college compact",
    title: "3.2 cu ft Mini Fridge with Freezer",
    description: "Cold drinks, frozen pizzas. Done.",
    price: "$159",
    category: "snacks",
    tags: ["must-have"],
  },
  {
    id: "keurig-mini",
    asin: "B07GV2S1GS",
    searchQuery: "Keurig K-Mini single serve coffee maker small dorm compact",
    title: "Keurig K-Mini Coffee Maker",
    description: "Fits the smallest desk. Makes real coffee.",
    price: "$79",
    category: "snacks",
    tags: ["must-have"],
  },
  // ── BATH ──────────────────────────────────────────────────────────────────────
  {
    id: "shower-caddy",
    asin: "B07DMWD6B1",
    searchQuery: "mesh shower caddy dorm bathroom portable college",
    title: "Mesh Shower Caddy",
    description: "Holds everything. Drains fast. No mildew.",
    price: "$17",
    category: "bath",
    tags: ["must-have"],
  },
  {
    id: "shower-shoes",
    asin: "B06ZZ8YRM3",
    searchQuery: "shower sandals flip flops quick dry college dorm communal",
    title: "Shower Shoes (Quick-Dry)",
    description: "You will thank us. Communal showers are real.",
    price: "$13",
    category: "bath",
    tags: ["must-have"],
  },
  {
    id: "bath-towels",
    asin: "B00IKQQNY2",
    searchQuery: "quick dry bath towel set 6 piece college dorm bathroom",
    title: "Quick-Dry Towel Set (6 Piece)",
    description: "Two bath, two hand, two washcloth.",
    price: "$28",
    category: "bath",
    tags: ["essential"],
  },
  // ── LAUNDRY ───────────────────────────────────────────────────────────────────
  {
    id: "laundry-bag",
    asin: "B07NGC99JY",
    searchQuery: "collapsible laundry hamper backpack straps dorm college",
    title: "Collapsible Laundry Hamper with Straps",
    description: "Worn like a backpack. Holds two loads.",
    price: "$18",
    category: "laundry",
    tags: ["must-have"],
  },
  {
    id: "detergent-pods",
    asin: "B00BR22QKY",
    searchQuery: "laundry detergent pods 100 count college bulk semester",
    title: "Laundry Detergent Pods (100 ct)",
    description: "Lasts a full semester.",
    price: "$26",
    category: "laundry",
    tags: ["essential"],
  },
  {
    id: "stain-remover",
    asin: "B003E4NT54",
    searchQuery: "Tide To Go instant stain remover pen 3 pack college",
    title: "Tide To Go Stain Remover (3-Pack)",
    description: "Before a date. After a party.",
    price: "$8",
    category: "laundry",
    tags: ["clever"],
  },
  // ── SAFETY ────────────────────────────────────────────────────────────────────
  {
    id: "first-aid",
    asin: "B01G81D7PI",
    searchQuery: "compact first aid kit 200 piece college dorm emergency",
    title: "Compact First Aid Kit (200 pc)",
    description: "Band-aids, meds, the works.",
    price: "$24",
    category: "safety",
    tags: ["must-have"],
  },
  {
    id: "noise-cancel",
    asin: "B0B7YTL6JT",
    searchQuery: "foam earplugs 50 pairs sleep mask college dorm noise",
    title: "Foam Earplugs (50 pair) + Sleep Mask",
    description: "Roommates snore. Hallways are loud.",
    price: "$14",
    category: "safety",
    tags: ["sanity-saver"],
  },
  {
    id: "door-lock",
    asin: "B07SH3D4NQ",
    searchQuery: "portable door lock travel security dorm room college",
    title: "Portable Door Lock",
    description: "Peace of mind for any dorm door.",
    price: "$13",
    category: "safety",
    tags: ["essential"],
  },
];

export function productsByCategory(cat: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function mustHaves(): Product[] {
  return PRODUCTS.filter((p) => p.tags.includes("must-have"));
}
