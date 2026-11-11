// One-time helper: copies the photos from the old Duda site into this repository
// (src/uploads) through Git Gateway, so the site keeps them after DueTo is cancelled.
// Visit /.netlify/functions/save-old-photos once after Identity + Git Gateway are on.
// Safe to run again: it skips photos already saved. Delete this file once it has run.
const list = require("../../src/_data/imageSources.json");

exports.handler = async (event, context) => {
  const id = context.clientContext && context.clientContext.identity;
  if (!id) return { statusCode: 500, body: "Turn on Identity and Git Gateway first." };
  const gw = id.url.replace(/\/identity$/, "/git/github");
  const auth = { Authorization: "Bearer " + id.token };
  const done = [];
  for (const [local, url] of Object.entries(list)) {
    if (local.startsWith("_")) continue;
    const path = "src/" + local;
    const head = await fetch(`${gw}/contents/${path}?ref=main`, { headers: auth });
    if (head.status === 200) { done.push("already saved: " + local); continue; }
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const content = Buffer.from(await r.arrayBuffer()).toString("base64");
      const up = await fetch(`${gw}/contents/${path}`, {
        method: "PUT",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Save photo ${local} from the old site [skip ci]`, content, branch: "main" }),
      });
      done.push((up.ok ? "saved: " : `failed (${up.status}): `) + local);
    } catch (e) { done.push(`failed (${e.message}): ${local}`); }
  }
  return { statusCode: 200, headers: { "Content-Type": "text/plain" }, body: done.join("\n") };
};
