// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { eta } from "../../../initialize.js"
import { processMarkdownPosts } from "../../../helpers/processMarkdownPosts.js"

/**
 * Function to create the blog
 * ===========================
 */
export const mainRoute = async (app, settings) => {
	try {
		const posts = await processMarkdownPosts(app)
		const paginatedPosts = await app.paginateMarkdownFiles(posts, 1, settings.postsPerPage)
		const newestPosts = paginatedPosts.data
		const lastPage = paginatedPosts.total_pages - 1
		const postsLength = paginatedPosts.total_items

		const data = {
			title: "Home",
			description: settings.siteDescription,
			featuredImage: settings.blogImage,
			favicon: settings.favicon,
		}

		const indexHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			mainRoute: true,
			firstPage: true,
			data: data,
			posts: newestPosts,
			lastPage: lastPage,
			paginated: postsLength > settings.postsPerPage,
			postPreviewFallbackImage: settings.postPreviewFallbackImage,
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})

		await ensureFoldersExist(["_site"])

		// Create HTML file for the main route of the blog
		await writeFileWithHandling(`_site/index.html`, indexHTML, "utf8")

		// Loop to create the pages of the blog after its main route
		for (let i = 1; i <= lastPage; i++) {
			// Create a folder for each page of the blog
			await ensureFoldersExist([`_site/page/${i}`])

			// Paginated array from the list of posts without the newest X posts
			const paginatedPostsList = await app.paginateMarkdownFiles(
				posts.slice(settings.postsPerPage),
				i,
				settings.postsPerPage
			)

			const dynamicIndexHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				mainRoute: true,
				firstPage: false,
				data: data,
				posts: paginatedPostsList.data,
				paginatedPostsList: paginatedPostsList,
				lastPage: lastPage,
				paginated: true,
				postPreviewFallbackImage: settings.postPreviewFallbackImage,
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})

			// Create HTML file for each page after the main route of the blog
			await writeFileWithHandling(`_site/page/${i}/index.html`, dynamicIndexHTML, "utf8")
		}
	} catch (error) {
		console.error("Error in mainRoute:", error)
		throw error
	}
}
