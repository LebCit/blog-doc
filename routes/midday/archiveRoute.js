import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"
import { transformLinksToObjects } from "../../functions/helpers/transformLinksToObjects.js"

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

		res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			archiveRoute: true,
			data: data,
			posts: posts,
			paginated: false, // To hide the pagination component on the archive route.
			siteTitle: settings.siteTitle,
			siteDescription: settings.siteDescription,
			menuLinks: transformLinksToObjects(settings.menuLinks, 'linkTarget', 'linkTitle'),
			html_footerCopyright: settings.footerCopyright,
			currentYear: new Date().getFullYear(),
		})
	})
}
