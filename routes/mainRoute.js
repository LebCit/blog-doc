// Internal Functions
import { getPosts } from "../functions/blog-doc.js"
import { paginator } from "../functions/helpers.js"
const posts = await getPosts()
import { initializeApp } from "../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../config/settings.js"

// Render, at most, the newest X posts from the list of posts on the Main Route.
export const mainRoute = app
	.get("/", (c) => {
		const paginatedPosts = paginator(posts, 1, settings.postsPerPage) // Paginate all the posts. Set the first page to 1 and X posts per page.
		const newestPosts = paginatedPosts.data // Get the first X posts.
		const lastPage = paginatedPosts.total_pages - 1 // Get the last page number by removing 1 from the total number of pages.
		const postsLength = paginatedPosts.total // Get the total number of posts.

		// Main Route data
		const data = {
			title: "Home",
			description: settings.siteDescription,
			featuredImage: settings.blogImage,
		}

		const res = eta.render("layouts/base.html", {
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
		return c.html(res)
	})

	// Dynamic route to display the list of posts without the newest X posts
	.get("/page/:actualBlogPage", (c) => {
		const paginatedPosts = paginator(posts, 1, settings.postsPerPage) // Paginate all the posts. Set the first page to 1 and X posts per page.
		const lastPage = paginatedPosts.total_pages - 1 // Get the last page number by removing 1 from the total number of pages.

		// Main Route data
		const data = {
			title: "Home",
			description: settings.siteDescription,
			featuredImage: settings.blogImage,
		}

		// Dynamic page number
		const actualBlogPage = c.req.param("actualBlogPage")
		// Paginated array from the list of posts without the newest X posts
		const paginatedPostsList = paginator(posts.slice(settings.postsPerPage), actualBlogPage, settings.postsPerPage)

		const res = eta.render("layouts/base.html", {
			// Passing Route data
			mainRoute: true,
			firstPage: false,
			// Passing document data
			data: data,
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
		return c.html(res)
	})
