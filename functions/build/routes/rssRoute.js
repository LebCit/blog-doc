// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../helpers/writeFileWithHandling.js"

// Internal functions
import { getPosts } from "../../blog-doc.js"
import { initializeApp } from "../../initialize.js"
const { eta } = initializeApp()

// Settings
import { settings } from "../../../config/settings.js"

/**
 * Function to create the RSS feed
 * ===============================
 */
export const rssRoute = async () => {
	try {
		const posts = await getPosts()

		const rssXML = eta.render(`themes/${settings.currentTheme}/layouts/rss.html`, {
			siteTitle: settings.siteTitle,
			siteDescription: settings.siteDescription,
			siteURL: settings.siteURL,
			rssSiteLanguage: settings.rssSiteLanguage,
			rssCopyright: settings.rssCopyright,
			posts: posts,
		})

		await ensureFoldersExist(["_site"])

		// Create XML file for the RSS feed
		await writeFileWithHandling(`_site/rss.xml`, rssXML, "utf8")
	} catch (error) {
		console.error("Error in rssRoute:", error)
		throw error
	}
}
