// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../helpers/writeFileWithHandling.js"

// Internal functions
import { postsByTagCount } from "../../blog-doc.js"
import { initializeApp } from "../../initialize.js"
const { eta } = initializeApp()

// Settings
import { settings } from "../../../config/settings.js"

/**
 * Function to create the tags list page
 * =====================================
 */
export const tagsRoute = async () => {
	try {
		const data = {
			title: "Tags",
			description: "A list of all the tags",
			featuredImage: settings.tagsImage,
			favicon: settings.favicon,
		}

		const tagsHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			tagsRoute: true,
			data: data,
			posts: await postsByTagCount(),
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})

		await ensureFoldersExist(["_site", "_site/tags"])

		// Create HTML file for the tags list page
		await writeFileWithHandling(`_site/tags/index.html`, tagsHTML, "utf8")
	} catch (error) {
		console.error("Error in tagsRoute:", error)
		throw error
	}
}
