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
 * Function to create the archive page
 * ===================================
 */
export const archiveRoute = async () => {
	try {
		const posts = await getPosts()

		const data = {
			title: "Archive",
			description: "A list of all the posts",
			featuredImage: settings.archiveImage,
			favicon: settings.favicon,
		}

		const archiveHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			archiveRoute: true,
			data: data,
			posts: posts,
			paginated: false,
			postPreviewFallbackImage: settings.postPreviewFallbackImage,
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})

		await ensureFoldersExist(["_site", "_site/posts"])

		// Create HTML file for the archive page
		await writeFileWithHandling(`_site/posts/index.html`, archiveHTML, "utf8")
	} catch (error) {
		console.error("Error in archiveRoute:", error)
		throw error
	}
}
