// Internal Functions
import { postsByTagCount, postsByTagList } from "../functions/blog-doc.js"
import { initializeApp } from "../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../config/settings.js"

// TAGS ROUTE
export const tagsRoute = app
	.get("/tags", async (c) => {
		// Tags Route data
		const data = {
			title: "Tags",
			description: "A list of all the tags",
			featuredImage: settings.tagsImage,
		}
		const res = eta.render("layouts/base.html", {
			// Passing Route data
			tagsRoute: true,
			// Passing document data
			data: data,
			posts: await postsByTagCount(),
			// Passing needed settings for the template
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})
		return c.html(res)
	})
	.get("/tags/:tag", async (c, next) => {
		const tag = c.req.param("tag")
		// List of posts matching the `:tag` request parameter
		const postsByTag = await postsByTagList(tag)

		if (postsByTag.length) {
			// Tag Route data
			const data = {
				title: postsByTag.length > 1 ? `Posts Tagged "${tag}"` : `Post Tagged "${tag}"`,
				description: `List of posts tagged ${tag}`,
				featuredImage: settings.tagImage,
				subTitle: postsByTag.length > 1 ? `${postsByTag.length} posts with this tag` : `1 post with this tag`,
			}
			const res = eta.render("layouts/base.html", {
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
			return c.html(res)
		} else {
			// Proceed to the 404 route if no tag is found
			await next()
		}
	})
