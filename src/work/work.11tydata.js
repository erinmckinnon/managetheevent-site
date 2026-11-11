export default {
  layout: "case-study.njk",
  tags: ["work"],
  // Keep the same web addresses the old site used.
  permalink: (data) => (data.draft ? false : `/${data.page.fileSlug}/`),
};
