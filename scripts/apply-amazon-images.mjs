// Merge tmp/out-{1..5}.json and patch src/lib/products.ts with new ASINs + imageUrl.
import fs from "fs";
import path from "path";

const merged = {};
const sources = ["tmp/out-1.json","tmp/out-2.json","tmp/out-3.json","tmp/out-4.json","tmp/out-5.json","tmp/out-retry.json","tmp/out-retry2.json"];
for (const p of sources) {
  if (!fs.existsSync(p)) { console.log(`skip ${p}`); continue; }
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  // Only overwrite if new value has an image (don't overwrite OK with MISS)
  for (const [id, v] of Object.entries(data)) {
    if (!merged[id] || (v.image && !merged[id].image)) merged[id] = v;
  }
}
fs.writeFileSync("src/data/amazon-images.json", JSON.stringify(merged, null, 2));
console.log(`Wrote src/data/amazon-images.json with ${Object.keys(merged).length} items`);

const summary = Object.entries(merged).map(([id, v]) => `  ${id}: ${v.image ? "OK" : "MISS"} [${v.asin}]`);
console.log(summary.join("\n"));
