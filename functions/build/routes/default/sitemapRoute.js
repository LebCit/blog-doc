// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { eta } from "../../../initialize.js"
import { sitemap } from "../../../sitemap.js"

/**
 * Function to create the sitemap
 * ==============================
 */
export const sitemapRoute = async (app, settings) => {
	try {
		const sitemapXML = eta.render(`themes/${settings.currentTheme}/layouts/sitemap.html`, {
			urls: await sitemap(app),
		})

		await ensureFoldersExist(["_site"])

		// Create XML file for the sitemap
		await writeFileWithHandling(`_site/sitemap.xml`, sitemapXML, "utf8")
	} catch (error) {
		console.error("Error in sitemapRoute:", error)
		throw error
	}
}
