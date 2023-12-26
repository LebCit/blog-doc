// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../helpers/writeFileWithHandling.js"

// Internal functions
import { sitemap } from "../../sitemap.js"
import { initializeApp } from "../../initialize.js"
const { eta } = initializeApp()

// Settings
import { settings } from "../../../config/settings.js"

/**
 * Function to create the sitemap
 * ==============================
 */
export const sitemapRoute = async () => {
	try {
		const sitemapXML = eta.render(`themes/${settings.currentTheme}/layouts/sitemap.html`, {
			urls: sitemap(),
		})

		await ensureFoldersExist(["_site"])

		// Create XML file for the sitemap
		await writeFileWithHandling(`_site/sitemap.xml`, sitemapXML, "utf8")
	} catch (error) {
		console.error("Error in sitemapRoute:", error)
		throw error
	}
}
