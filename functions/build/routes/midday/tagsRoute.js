// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"

// Internal functions
import { countPostsByTag } from "../../../helpers/processPostsTags.js"
import { transformLinksToObjects } from "../../../helpers/transformLinksToObjects.js"

/**
 * Function to create the tags list page
 * =====================================
 */
export const tagsRoute = async (app, settings) => {
	try {
		const postsByTag = await countPostsByTag(app)
		const tagsCount = Object.entries(postsByTag).map(([key, value]) => ({
			tagName: key,
			tagCount: `${key} (${value} post${value > 1 ? "s" : ""})`,
		}))

		const data = {
			title: "Tags",
			description: "A list of all the tags",
			featuredImage: settings.tagsImage,
			favicon: settings.favicon,
		}

		await ensureFoldersExist(["_site", "_site/tags"])

		app.renderToFile(
			`themes/${settings.currentTheme}/layouts/base.html`,
			{
				tagsRoute: true,
				data: data,
				posts: tagsCount,
				siteTitle: settings.siteTitle,
				siteDescription: settings.siteDescription,
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
				currentYear: new Date().getFullYear(),
			},
			"_site/tags/index.html" // Create HTML file for the tags list page
		)
	} catch (error) {
		console.error("Error in tagsRoute:", error)
		throw error
	}
}
