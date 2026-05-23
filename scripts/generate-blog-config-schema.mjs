import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { blogConfigJsonSchema } from "../src/lib/blog-schema.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "src/content/blog-config.schema.json");

writeFileSync(outPath, `${JSON.stringify(blogConfigJsonSchema, null, 2)}\n`, "utf-8");
console.log(`Wrote ${outPath}`);
