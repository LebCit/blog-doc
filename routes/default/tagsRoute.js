import { countPostsByTag, getPostsByTag } from "../../functions/helpers/processPostsTags.js"
import { transformLinksToObjects } from "../../functions/helpers/transformLinksToObjects.js"

// TAGS ROUTE
export const tagsRoute = (app, settings) => {
	app.get("/tags", async (req, res) => {
		const postsByTag = await countPostsByTag(app)
		const tagsCount = Object.entries(postsByTag).map(([key, value]) => ({
			tagName: key,
			tagCount: `${key} (${value} post${value > 1 ? "s" : ""})`,
		}))

		// Tags Route data
		const data = {
			title: "Tags",
			description: "A list of all the tags",
			featuredImage: settings.tagsImage,
			favicon: settings.favicon,
		}

		res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			tagsRoute: true,
			data: data,
			posts: tagsCount,
			siteTitle: settings.siteTitle,
			menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
			html_footerCopyright: settings.footerCopyright,
		})
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

				res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					tagRoute: true,
					data: data,
					posts: postsByTag,
					paginated: false,
					siteTitle: settings.siteTitle,
					menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
					html_footerCopyright: settings.footerCopyright,
				})
			} else {
				// Proceed to the 404 route if no tag is found
				res.redirect("/404")
			}
		})
}
