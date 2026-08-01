/**
 * Seed all REWORRKED caps into Mongo (published, stock 1, PKR 1000–1500).
 * Run from api/: node scripts/seed-catalog-products.js
 */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadEnv() {
  const raw = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const CAPS = [
  "/media/WhatsApp_Image_2026-07-29_at_3.30.03_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.04_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.04_202607301426_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.04_202607301426_3.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426_3.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426_4.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.06_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.06_202607301426_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.06_202607301426_3.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426_3.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426_4.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.08_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.08_202607301426_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.09_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.09_202607301426_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.10_202607301426.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.10_202607301430.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.10_202607301430_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.11_202607301430.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.11_202607301430_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.11_202607301430_3.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.12_202607301430.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.12_202607301430_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.12_202607301430_3.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.13_202607301430.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.13_202607301430_2.jpeg",
  "/media/WhatsApp_Image_2026-07-29_at_3.30.14_202607301430.jpeg",
];

const MODELS = {
  dadsClub: "/latest/model-1.jpeg",
  dnaIntact: "/latest/model-2.jpeg",
  adventureAwaits: "/latest/model-5.jpeg",
  wifeOfTheParty: "/latest/model-7.jpeg",
};

/** Unique embroidered caps from media (names match embroidery). */
const CATALOG = [
  {
    name: "Gig Harbor Fly Shop",
    slug: "gig-harbor-fly-shop",
    category: "Dad Cap",
    price: 1450,
    images: [CAPS[0], CAPS[12]],
    description:
      "Navy dad cap with white script embroidery and fly detail. Soft crown, collector finish.",
    highlights: ["Navy twill", "Script embroidery", "Fly graphic"],
    tags: ["dad-cap", "navy"],
  },
  {
    name: "Far From Alive",
    slug: "far-from-alive",
    category: "Dad Cap",
    price: 1350,
    images: [CAPS[1]],
    description:
      "Black dad with jagged silver mark and stick-figure graphic. Night energy.",
    highlights: ["Jagged embroidery", "Graphic detail"],
    tags: ["dad-cap", "new"],
  },
  {
    name: "DNA Intact",
    slug: "dna-intact",
    category: "Dad Cap",
    price: 1200,
    images: [CAPS[2], MODELS.dnaIntact, CAPS[26]],
    description: "White field, black DNA intact mark. Minimal and sharp.",
    highlights: ["White cotton", "Black sans embroidery"],
    tags: ["dad-cap"],
  },
  {
    name: "Yukon",
    slug: "yukon",
    category: "Dad Cap",
    price: 1300,
    images: [CAPS[3], CAPS[16]],
    description: "Bold white Yukon mark on black. Clean and heavy.",
    highlights: ["Raised white embroidery", "Soft crown"],
    tags: ["dad-cap"],
  },
  {
    name: "Lemon",
    slug: "lemon",
    category: "Dad Cap",
    price: 1100,
    images: [CAPS[4], CAPS[21]],
    description: "Blush pink field with a small embroidered lemon.",
    highlights: ["Pastel pink twill", "Lemon embroidery"],
    tags: ["dad-cap", "new"],
  },
  {
    name: "Las Vegas",
    slug: "las-vegas",
    category: "Limited Drops",
    price: 1500,
    images: [CAPS[5], CAPS[22]],
    description:
      "Neon green Las Vegas script on black with clover brim detail.",
    highlights: ["3D script", "Clover detail", "limited"],
    tags: ["limited", "new"],
  },
  {
    name: "Armed Citizens Legal Defense Network",
    slug: "armed-citizens",
    category: "Dad Cap",
    price: 1400,
    images: [CAPS[6], CAPS[29]],
    description:
      "Navy suede-feel with red script and gold Legal Defense Network mark.",
    highlights: ["Suede-feel fabric", "Multi-color embroidery"],
    tags: ["dad-cap"],
  },
  {
    name: "ripcity",
    slug: "ripcity",
    category: "Limited Drops",
    price: 1480,
    images: [CAPS[7], CAPS[23]],
    description: "Holographic ripcity patch on black. Iridescent finish.",
    highlights: ["Holo patch", "limited"],
    tags: ["limited"],
  },
  {
    name: "It Took Me 50 Years To Look This Good",
    slug: "fifty-years",
    category: "Dad Cap",
    price: 1450,
    images: [CAPS[8], CAPS[15]],
    description:
      "Black dad with raised multi-color embroidery. Soft crown, built to age in.",
    highlights: ["Raised embroidery", "Adjustable buckle"],
    tags: ["dad-cap", "limited"],
  },
  {
    name: "White Claw Hard Seltzer",
    slug: "white-claw",
    category: "Dad Cap",
    price: 1250,
    images: [CAPS[9], CAPS[13]],
    description: "White field with circular White Claw wave mark.",
    highlights: ["White cotton", "Circular logo"],
    tags: ["dad-cap"],
  },
  {
    name: "wife of the party",
    slug: "wife-of-the-party",
    category: "Dad Cap",
    price: 1280,
    images: [CAPS[10], MODELS.wifeOfTheParty, CAPS[28]],
    description: "Light blue dad with soft white script embroidery.",
    highlights: ["Sky blue twill", "White script"],
    tags: ["dad-cap", "new"],
  },
  {
    name: "INFORTMATURE",
    slug: "infortmature",
    category: "Dad Cap",
    price: 1320,
    images: [CAPS[11]],
    description:
      "Five-panel black with white motion mark and stick-figure graphic.",
    highlights: ["Five-panel crown", "White graphic"],
    tags: ["dad-cap", "new"],
  },
  {
    name: "gravely BREWING CO.",
    slug: "gravely-trucker",
    category: "Trucker",
    price: 1380,
    images: [CAPS[14], CAPS[25]],
    description: "Black foam front, white mesh back. Gravely Brewing Co. mark.",
    highlights: ["Mesh back", "Foam front"],
    tags: ["trucker", "new"],
  },
  {
    name: "ACTOR",
    slug: "actor",
    category: "Dad Cap",
    price: 1180,
    images: [CAPS[17], CAPS[27]],
    description: "Bold ACTOR mark on black. Clean field.",
    highlights: ["Bold sans mark", "Matte black"],
    tags: ["dad-cap"],
  },
  {
    name: "dutchie",
    slug: "dutchie",
    category: "Dad Cap",
    price: 1220,
    images: [CAPS[18], CAPS[20]],
    description: "Navy dad with cream dutchie mark. Minimal and sharp.",
    highlights: ["Navy twill", "Cream sans"],
    tags: ["dad-cap"],
  },
  {
    name: "Dad's Club EST. 2023",
    slug: "dads-club-est",
    category: "Dad Cap",
    price: 1150,
    images: [CAPS[19], MODELS.dadsClub, CAPS[24]],
    description: "Gold serif Dad's Club mark on black. Everyday club silhouette.",
    highlights: ["Gold embroidery", "Soft crown"],
    tags: ["dad-cap"],
  },
  {
    name: "FUCK TRUMP",
    slug: "fuck-trump",
    category: "Dad Cap",
    price: 1500,
    images: [CAPS[30]],
    description: "Navy dad with bold white block embroidery.",
    highlights: ["Navy twill", "Bold white block"],
    tags: ["dad-cap", "limited"],
  },
  {
    name: "Adventure Awaits",
    slug: "adventure-awaits",
    category: "Dad Cap",
    price: 1420,
    images: [MODELS.adventureAwaits],
    description: "Forest green with gold serif. Built for the road.",
    highlights: ["Forest twill", "Gold embroidery"],
    tags: ["dad-cap", "limited"],
  },
];

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    brand: { type: String, default: "REWORRKED" },
    category: String,
    price: Number,
    compareAtPrice: Number,
    stock: Number,
    status: String,
    tags: [String],
    description: String,
    highlights: [String],
    specifications: [{ key: String, value: String }],
    images: [String],
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

async function main() {
  const env = loadEnv();
  await mongoose.connect(env.MONGODB_URI, { family: 4 });
  const Product = mongoose.model("Product", productSchema);

  let upserted = 0;
  for (const p of CATALOG) {
    const compareAtPrice = Math.min(1500, p.price + 200);
    const seoTitle = `${p.name} Cap | REWORRKED`;
    const seoDescription = `${p.description} Buy online in Pakistan — Cash on Delivery. Limited stock.`;

    await Product.findOneAndUpdate(
      { slug: p.slug },
      {
        $set: {
          name: p.name,
          slug: p.slug,
          brand: "REWORRKED",
          category: p.category,
          price: p.price,
          compareAtPrice,
          stock: 1,
          status: "published",
          tags: p.tags,
          description: p.description,
          highlights: p.highlights,
          specifications: [
            { key: "Material", value: "Cotton twill" },
            { key: "Closure", value: "Adjustable" },
            { key: "Fit", value: "OSFA" },
            { key: "Origin", value: "REWORRKED" },
          ],
          images: p.images,
          seoTitle,
          seoDescription,
        },
      },
      { upsert: true, new: true }
    );
    upserted += 1;
    console.log("✓", p.name, `Rs ${p.price}`);
  }

  // Remove demo leftovers that aren't part of the real catalog
  const keep = CATALOG.map((p) => p.slug);
  const removed = await Product.deleteMany({ slug: { $nin: keep } });
  console.log(`\nSeeded ${upserted} products. Removed ${removed.deletedCount} extras.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
