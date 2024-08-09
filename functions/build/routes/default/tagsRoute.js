// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { eta } from "../../../initialize.js"
import { countPostsByTag } from "../../../helpers/processPostsTags.js"

/**
 * Function to create the tags list page
 * =====================================
 */
export const tagsRoute = async (app, settings) => {
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
			posts: await countPostsByTag(app),
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
