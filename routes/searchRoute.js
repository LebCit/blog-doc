// Internal Functions
import { getPosts } from "../functions/blog-doc.js"
const posts = (await getPosts()).filter((post) => post[1].frontmatter.published == "true")
import { initializeApp } from "../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../config/settings.js"

// Render the search form on the search route
export const searchRoute = app
	.get("/search", async (c, next) => {
		if (settings.searchFeature) {
			// Search Route data
			const data = {
				title: "Search",
				description: "Make a research in the site's posts",
				featuredImage: settings.searchImage,
				favicon: settings.favicon,
			}

			const res = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				// Passing Route data
				searchRoute: true,
				// Passing document data
				data: data,
				// Passing needed settings for the template
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})
			return c.html(res)
		} else {
			await next()
		}
	})

	// Render the search result(s) of a query
	.get("/search/:query", async (c, next) => {
		if (settings.searchFeature) {
			// Search Route data
			const data = {
				title: "Search",
				description: "Make a research in the site's posts",
				featuredImage: settings.searchImage,
				favicon: settings.favicon,
			}

			const query = c.req.param("query")
			const reg = new RegExp(query, "gi")

			const titleSearch = posts.filter((post) => post[1].frontmatter.title.match(reg))
			const contentSearch = posts.filter((post) => post[1].content.match(reg))

			// Concatenate the results of titleSearch and contentSearch
			const concat = titleSearch.concat(contentSearch)

			// Get the unique result(s) by removing duplicates from concat array
			const uniqueProps = []
			const result = concat.filter((post) => {
				const isDuplicate = uniqueProps.includes(post[1].frontmatter.title)

				if (!isDuplicate) {
					uniqueProps.push(post[1].frontmatter.title)

					return true
				}

				return false
			})

			// If the result array is not empty
			if (result.length > 0) {
				const resultLength = result.length
				// Render the search page with the resultant post(s)
				const res = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					// Passing Route data
					searchRoute: true,
					// Passing document data
					data: data,
					posts: result,
					resultLength: resultLength,
					results: true,
					paginated: false,
					// Passing document image data
					postPreviewFallbackImage: settings.postPreviewFallbackImage,
					// Passing needed settings for the template
					siteTitle: settings.siteTitle,
					menuLinks: settings.menuLinks,
					footerCopyright: settings.footerCopyright,
				})
				return c.html(res)
			} else {
				/**
				 * If the result array is empty,
				 * render the search page,
				 * with a message.
				 */
				const res = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					// Passing Route data
					searchRoute: true,
					// Passing document data
					data: data,
					noResults: true,
					// Passing needed settings for the template
					siteTitle: settings.siteTitle,
					menuLinks: settings.menuLinks,
					footerCopyright: settings.footerCopyright,
				})
				return c.html(res)
			}
		} else {
			await next()
		}
	})

	// Redirect a search to the result(s) of a query
	.post("/search", async (c) => {
		const { searchString } = await c.req.parseBody()
		return c.redirect(`/search/${searchString}`)
	})
