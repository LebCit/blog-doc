// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"

// Internal functions
import { processMarkdownPosts } from "../../../helpers/processMarkdownPosts.js"
import { transformLinksToObjects } from "../../../helpers/transformLinksToObjects.js"

/**
 * Function to create the archive page
 * ===================================
 */
export const archiveRoute = async (app, settings) => {
	try {
		const posts = await processMarkdownPosts(app)

		const data = {
			title: "Archive",
			description: "A list of all the posts",
			featuredImage: settings.archiveImage,
			favicon: settings.favicon,
		}

		await ensureFoldersExist(["_site", "_site/posts"])

		await app.renderToFile(
			`themes/${settings.currentTheme}/layouts/base.html`,
			{
				archiveRoute: true,
				data: data,
				posts: posts,
				paginated: false,
				siteTitle: settings.siteTitle,
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
			},
			"_site/posts/index.html" // Create HTML file for the archive page
		)
	} catch (error) {
		console.error("Error in archiveRoute:", error)
		throw error
	}
}
