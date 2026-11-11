const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads", "src/css": "css", "src/js": "js", "src/admin": "admin", "src/_redirects": "_redirects", "src/robots.txt": "robots.txt" });
  eleventyConfig.addWatchTarget("src/css");

  eleventyConfig.addCollection("work", (api) =>
    api.getFilteredByGlob("src/work/*.md").filter((p) => !p.data.draft)
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99) || b.date - a.date)
  );
  eleventyConfig.addFilter("longDate", (d) => { const x = new Date(d); return `${MONTHS[x.getUTCMonth()]} ${x.getUTCDate()}, ${x.getUTCFullYear()}`; });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("featuredFirst", (arr) => [...(arr || [])].sort((a, b) => (b.data.featured ? 1 : 0) - (a.data.featured ? 1 : 0)));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("paras", (t) => String(t || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join(""));
  eleventyConfig.addFilter("tel", (s) => String(s || "").replace(/[^0-9+]/g, ""));

  return { dir: { input: "src", output: "_site", includes: "_includes", data: "_data" }, markdownTemplateEngine: false, htmlTemplateEngine: "njk" };
}
