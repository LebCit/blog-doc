import { LiteNode } from "litenode"
import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"
import { transformLinksToObjects } from "../../functions/helpers/transformLinksToObjects.js"

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

			res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				searchRoute: true,
				data: data,
				siteTitle: settings.siteTitle,
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
			})
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
					res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
						searchRoute: true,
						data: data,
						posts: result,
						resultLength: resultLength,
						results: true,
						paginated: false,
						siteTitle: settings.siteTitle,
						menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
						html_footerCopyright: settings.footerCopyright,
					})
				} else {
					/**
					 * If the result array is empty,
					 * render the search page,
					 * with a message.
					 */
					res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
						searchRoute: true,
						data: data,
						noResults: true,
						siteTitle: settings.siteTitle,
						menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
						html_footerCopyright: settings.footerCopyright,
					})
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
				res.status(400).json({ error: error.message })
			}
		})
}
