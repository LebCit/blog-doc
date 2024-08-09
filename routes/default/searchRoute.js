import { LiteNode } from "litenode"
import { eta } from "../../functions/initialize.js"
import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"

// Render the search form on the search route
export const searchRoute = (app, settings) => {
	app.get("/search", async (req, res) => {
		if (settings.searchFeature) {
			// Search Route data
			const data = {
				title: "Search",
				description: "Make a research in the site's posts",
				featuredImage: settings.searchImage,
				favicon: settings.favicon,
			}

			const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				// Passing Route data
				searchRoute: true,
				// Passing document data
				data: data,
				// Passing needed settings for the template
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})
			res.html(response)
		} else {
			res.redirect("/404")
		}
	})

		// Render the search result(s) of a query
		.get("/search/:query", async (req, res) => {
			if (settings.searchFeature) {
				// Search Route data
				const data = {
					title: "Search",
					description: "Make a research in the site's posts",
					featuredImage: settings.searchImage,
					favicon: settings.favicon,
				}

				const { query } = req.params
				const reg = new RegExp(query, "gi")

				const posts = await processMarkdownPosts(app)
				const titleSearch = posts.filter((post) => post.frontmatter.title.match(reg))
				const contentSearch = posts.filter((post) => post.content.match(reg))

				// Concatenate the results of titleSearch and contentSearch
				const concat = titleSearch.concat(contentSearch)

				// Get the unique result(s) by removing duplicates from concat array
				const uniqueProps = []
				const result = concat.filter((post) => {
					const isDuplicate = uniqueProps.includes(post.frontmatter.title)

					if (!isDuplicate) {
						uniqueProps.push(post.frontmatter.title)

						return true
					}

					return false
				})

				// If the result array is not empty
				if (result.length > 0) {
					const resultLength = result.length
					// Render the search page with the resultant post(s)
					const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
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
					res.html(response)
				} else {
					/**
					 * If the result array is empty,
					 * render the search page,
					 * with a message.
					 */
					const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
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
					res.html(response)
				}
			} else {
				res.redirect("/404")
			}
		})

		// Redirect a search to the result(s) of a query
		.post("/search", async (req, res, data) => {
			try {
				let { query } = data // Directly use data to access the parsed JSON data

				if (!query) {
					// Redirect to the search page if no query is provided
					const redirectRouter = new LiteNode()
					redirectRouter.get("/", (req, res) => {
						res.redirect("/search")
					})
					app.nest("/search", redirectRouter)
				}

				query = query.trim()

				// Respond with the query as JSON
				res.json({ query })
			} catch (error) {
				console.error("Error:", error)
				res.writeHead(400, { "Content-Type": "application/json" })
				res.end(JSON.stringify({ error: error.message }))
			}
		})
}
