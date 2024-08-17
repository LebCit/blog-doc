// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../helpers/writeFileWithHandling.js"

// Internal functions
import { sitemap } from "../../helpers/sitemap.js"

/**
 * Function to create the sitemap
 * ==============================
 */
export const sitemapRoute = async (app, settings) => {
	try {
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

		await ensureFoldersExist(["_site"])

		// Create XML file for the sitemap
		await writeFileWithHandling(`_site/sitemap.xml`, xmlContent, "utf8")
	} catch (error) {
		console.error("Error in sitemapRoute:", error)
		throw error
	}
}
