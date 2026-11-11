// Downloads any photo listed in src/_data/imageSources.json that isn't in src/uploads yet.
// Runs before every build on Netlify. A failed download never breaks the build.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname } from "node:path";

const list = JSON.parse(await readFile("src/_data/imageSources.json", "utf8"));
for (const [local, url] of Object.entries(list)) {
  if (local.startsWith("_")) continue;
  const path = "src/" + local;
  try { await access(path); continue; } catch {}
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error("HTTP " + r.status);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, Buffer.from(await r.arrayBuffer()));
    console.log("Fetched", local);
  } catch (e) {
    console.warn("Could not fetch", local, "-", e.message);
  }
}
