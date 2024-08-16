import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"
import { transformLinksToObjects } from "../../functions/helpers/transformLinksToObjects.js"

// Render, at most, the newest X posts from the list of posts on the Main Route.
export const mainRoute = (app, settings) => {
	app.get("/", async (req, res) => {
		const posts = await processMarkdownPosts(app)
		const paginatedPosts = await app.paginateMarkdownFiles(posts, 1, settings.postsPerPage) // Paginate all the posts. Set the first page to 1 and X posts per page.
		const newestPosts = paginatedPosts.data // Get the first X posts.
		const lastPage = paginatedPosts.total_pages - 1 // Get the last page number by removing 1 from the total number of pages.
		const postsLength = paginatedPosts.total_items // Get the total number of posts.

		// Main Route data
		const data = {
			title: "Home",
			description: settings.siteDescription,
			featuredImage: settings.blogImage,
			favicon: settings.favicon,
		}

		res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			mainRoute: true,
			firstPage: true,
			data: data,
			posts: newestPosts,
			lastPage: lastPage,
			paginated: postsLength > settings.postsPerPage ? true : false, // To display or not the pagination component on the main route.
			siteTitle: settings.siteTitle,
			siteDescription: settings.siteDescription,
			menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
			html_footerCopyright: settings.footerCopyright,
			currentYear: new Date().getFullYear(),
		})
	})

		// Dynamic route to display the list of posts without the newest X posts
		.get("/page/:actualBlogPage", async (req, res) => {
			const posts = await processMarkdownPosts(app)
			const paginatedPosts = await app.paginateMarkdownFiles(posts, 1, settings.postsPerPage) // Paginate all the posts. Set the first page to 1 and X posts per page.
			const lastPage = paginatedPosts.total_pages - 1 // Get the last page number by removing 1 from the total number of pages.

			// Main Route data
			const data = {
				title: "Home",
				description: settings.siteDescription,
				featuredImage: settings.blogImage,
				favicon: settings.favicon,
			}

			// Dynamic page number
			const actualBlogPage = req.params.actualBlogPage
			// Paginated array from the list of posts without the newest X posts
			const paginatedPostsList = await app.paginateMarkdownFiles(
				posts.slice(settings.postsPerPage),
				actualBlogPage,
				settings.postsPerPage
			)

			res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				mainRoute: true,
				firstPage: false,
				data: data,
				posts: paginatedPostsList.data,
				paginatedPostsList: paginatedPostsList,
				lastPage: lastPage,
				paginated: true, // To display the pagination component on each blog page route
				siteTitle: settings.siteTitle,
				siteDescription: settings.siteDescription,
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
				currentYear: new Date().getFullYear(),
			})
		})
}
