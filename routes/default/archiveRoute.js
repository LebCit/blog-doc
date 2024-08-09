import { eta } from "../../functions/initialize.js"
import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"

// Render all the posts from the list of posts on the Archive Route.
export const archiveRoute = (app, settings) => {
	app.get("/posts", async (req, res) => {
		const posts = await processMarkdownPosts(app)

		const data = {
			title: "Archive",
			description: "A list of all the posts",
			featuredImage: settings.archiveImage,
			favicon: settings.favicon,
		}
		const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			// Passing Route data
			archiveRoute: true,
			data: data,
			// Passing document data
			posts: posts,
			paginated: false, // To hide the pagination component on the archive route.
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
