// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { eta } from "../../../initialize.js"
import { processMarkdownPosts } from "../../../helpers/processMarkdownPosts.js"

/**
 * Function to create the RSS feed
 * ===============================
 */
export const rssRoute = async (app, settings) => {
	try {
		const posts = await processMarkdownPosts(app)

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
