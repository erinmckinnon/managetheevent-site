# Manage the Event website

managetheevent.com, rebuilt off DueTo/Duda. Static site on Netlify, built with Eleventy. Same setup as tarynformayor-site and tampa-heights-site.

## Editing (no code)

Go to **/admin**, log in, and pick:
- **📁 Case Studies**: add or edit case studies (title, photo, story, optional PDF link, homepage "Featured" switch).
- **📄 Pages**: Homepage text, services, numbers strip; About page.
- **⚙️ Site Settings**: public email, phone, LinkedIn, logo.

Click **Publish**. The live site updates in about a minute.

## Notes

- Case studies keep the old Duda web addresses (e.g. `/case-study-proximo-rtd-margarita-sampling-program-september-2025/`) so existing links still work.
- Contact form uses Netlify Forms (`contact`). Turn on email notifications in Netlify → Forms.
- Photos from the old site are listed in `src/_data/imageSources.json`. `scripts/fetch-images.mjs` downloads any that are missing at build time. To save them into the repo permanently (needed before DueTo is cancelled), turn on Identity + Git Gateway, visit `/.netlify/functions/save-old-photos` once, then delete that function.
- Local preview: `npm install && npm start`.
