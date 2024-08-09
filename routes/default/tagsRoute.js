import { eta } from "../../functions/initialize.js"
import { countPostsByTag, getPostsByTag } from "../../functions/helpers/processPostsTags.js"

// TAGS ROUTE
export const tagsRoute = (app, settings) => {
	app.get("/tags", async (req, res) => {
		// Tags Route data
		const data = {
			title: "Tags",
			description: "A list of all the tags",
			featuredImage: settings.tagsImage,
			favicon: settings.favicon,
		}
		const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			// Passing Route data
			tagsRoute: true,
			// Passing document data
			data: data,
			posts: await countPostsByTag(app),
			// Passing needed settings for the template
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})
		res.html(response)
	})

		// SINGLE TAG ROUTE
		.get("/tags/:tag", async (req, res) => {
			const tag = req.params.tag
			// List of posts matching the `:tag` request parameter
			const postsByTag = await getPostsByTag(app, tag)

			if (postsByTag.length) {
				// Tag Route data
				const data = {
					title: postsByTag.length > 1 ? `Posts Tagged "${tag}"` : `Post Tagged "${tag}"`,
					description: `List of posts tagged ${tag}`,
					featuredImage: settings.tagImage,
					favicon: settings.favicon,
					subTitle:
						postsByTag.length > 1 ? `${postsByTag.length} posts with this tag` : `1 post with this tag`,
				}
				const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					// Passing Route data
					tagRoute: true,
					// Passing document data
					data: data,
					posts: postsByTag,
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
				// Proceed to the 404 route if no tag is found
				res.redirect("/404")
			}
		})
}
