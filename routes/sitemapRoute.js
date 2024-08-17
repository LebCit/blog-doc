/*
 * Important: Do Not Delete or Modify This File!
 *
 * This file is essential for generating your site's sitemap.
 * Deleting or changing this file will disrupt the sitemap generation process,
 * negatively affect search engine indexing, and will break the application!
 */

import { sitemap } from "../functions/helpers/sitemap.js"

// Global Sitemap Route
export const sitemapRoute = (app, settings) => {
	app.get("/sitemap", async (req, res) => {
		const urls = await sitemap(app, settings)

		const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
		.filter((url) => url.urlLocation && url.urlLastMod && !isNaN(new Date(url.urlLastMod).getTime())) // Filter out invalid entries
		.map(
			(url) => `
    <url>
      <loc>${url.urlLocation}</loc>
      <lastmod>${new Date(url.urlLastMod).toISOString()}</lastmod> 
    </url>`
		)
		.join("")}
</urlset>`

		res.xml(xmlContent)
	})
}
