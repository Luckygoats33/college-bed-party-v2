// Fetch Amazon product hero image + current ASIN by search query.
// Some of our ASINs are dead — we search by query and take the top result.
// Usage: node scripts/fetch-amazon-image.mjs --in <products.json> --out <results.json> --profile <dir>
// products.json: [{ id, asin, searchQuery }, ...]
// results.json:  { id: { asin, image, title } }
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import os from "os";

const args = process.argv.slice(2);
const getArg = (flag, dflt) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : dflt;
};
const inPath = getArg("--in", "products-in.json");
const outPath = getArg("--out", "amazon-images.json");
const profileDir = getArg("--profile", path.join(os.tmpdir(), "cbp-amazon-scrape"));

const products = JSON.parse(fs.readFileSync(inPath, "utf8"));

fs.mkdirSync(profileDir, { recursive: true });
const ctx = await chromium.launchPersistentContext(profileDir, {
  channel: "chrome",
  headless: true,
  viewport: { width: 1280, height: 900 },
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
});

const results = {};
const page = await ctx.newPage();

for (const p of products) {
  try {
    const q = encodeURIComponent(p.searchQuery);
    const url = `https://www.amazon.com/s?k=${q}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1500);
    // Scroll to trigger lazy-loaded images
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));

    const data = await page.evaluate(() => {
      // Accept any item with a valid-looking ASIN and an image — search results OR sponsored
      const items = document.querySelectorAll('[data-asin]');
      for (const item of items) {
        const asin = item.getAttribute("data-asin");
        if (!asin || !asin.match(/^B[0-9A-Z]{9}$/)) continue;
        const img = item.querySelector("img.s-image, img[data-image-latency], img[data-a-image-name]");
        const titleEl = item.querySelector("h2 span, h2 a span");
        if (img && img.src && !img.src.includes("transparent-pixel")) {
          return {
            asin,
            image: img.src,
            title: titleEl ? titleEl.innerText.trim() : "",
          };
        }
      }
      return null;
    });

    if (data && data.image) {
      // Upgrade image to larger size (_SL500_ -> _SL1000_)
      const hiRes = data.image.replace(/\._[A-Z0-9_,]+_\./, "._SL1000_.");
      results[p.id] = { asin: data.asin, image: hiRes, title: data.title };
      console.log(`OK ${p.id} [${data.asin}] -> ${hiRes.slice(0, 70)}...`);
    } else {
      results[p.id] = { asin: p.asin, image: null, title: null };
      const title = await page.title();
      console.log(`MISS ${p.id} | title="${title.slice(0, 60)}"`);
    }
  } catch (e) {
    console.log(`ERR ${p.id}: ${e.message}`);
    results[p.id] = { asin: p.asin, image: null, title: null };
  }
}

fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`Wrote ${outPath} (${Object.keys(results).length} items)`);
await ctx.close();
