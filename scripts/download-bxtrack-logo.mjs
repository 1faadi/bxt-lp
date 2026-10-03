import { mkdir, writeFile } from "node:fs/promises";

const source =
  "https://bxtrack-landingpage.vercel.app/_next/static/immutable/media/bxtrack%20solution%20software%20developer.354b327uy4l34.png";
const destination =
  "public/sites/cogentlabs-co-edeb5c95/shared/bxtrack-logo.png";

const response = await fetch(source);
if (!response.ok) {
  throw new Error(`Logo download failed: ${response.status} ${response.statusText}`);
}

await mkdir("public/sites/cogentlabs-co-edeb5c95/shared", { recursive: true });
await writeFile(destination, Buffer.from(await response.arrayBuffer()));
console.log(`Saved ${destination}`);
