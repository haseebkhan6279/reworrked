/**
 * Normalize product/category slugs (spaces → hyphens) in the DB pointed at by MONGODB_URI.
 * Usage: MONGODB_URI='...' node scripts/normalize-slugs.js
 */
const mongoose = require("mongoose");

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  await mongoose.connect(uri, { family: 4, serverSelectionTimeoutMS: 30000 });
  const db = mongoose.connection.db;
  console.log("DB:", db.databaseName);

  for (const name of ["products", "categories"]) {
    const col = db.collection(name);
    const docs = await col.find({}).toArray();
    let fixed = 0;
    for (const doc of docs) {
      const next = slugify(doc.slug || doc.name);
      if (!next || next === doc.slug) continue;
      const clash = await col.findOne({ slug: next, _id: { $ne: doc._id } });
      if (clash) {
        console.warn(`skip ${name} ${doc._id}: target slug "${next}" already used`);
        continue;
      }
      await col.updateOne({ _id: doc._id }, { $set: { slug: next } });
      console.log(`${name}: "${doc.slug}" → "${next}"`);
      fixed += 1;
    }
    console.log(`${name}: fixed ${fixed}`);
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
