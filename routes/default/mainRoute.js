import { eta } from "../../functions/initialize.js"
import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"

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

		const templatePath = `themes/${settings.currentTheme}/layouts/base.html`

		const response = eta.render(templatePath, {
			// Passing Route data
			mainRoute: true,
			firstPage: true,
			// Passing document data
			data: data,
			posts: newestPosts,
			lastPage: lastPage,
			paginated: postsLength > settings.postsPerPage ? true : false, // To display or not the pagination component on the main route.
			// Passing document image data
			postPreviewFallbackImage: settings.postPreviewFallbackImage,
			// Passing needed settings for the template
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})
		res.html(response)
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

			const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				// Passing Route data
				mainRoute: true,
				firstPage: false,
				data: data,
				// Passing document data
				posts: paginatedPostsList.data,
				paginatedPostsList: paginatedPostsList,
				lastPage: lastPage,
				paginated: true, // To display the pagination component on each blog page route
				// Passing document image data
				postPreviewFallbackImage: settings.postPreviewFallbackImage,
				// Passing needed settings for the template
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})
			res.html(response)
		})
}