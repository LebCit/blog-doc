import { eta } from "../../functions/initialize.js"
import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"

// RSS Route
export const rssRoute = (app, settings) => {
	app.get("/rss", async (req, res) => {
		const posts = await processMarkdownPosts(app)
		const response = eta.render(`themes/${settings.currentTheme}/layouts/rss.html`, {
			// Passing needed settings for the template
			siteTitle: settings.siteTitle,
			siteDescription: settings.siteDescription,
			siteURL: settings.siteURL,
			rssSiteLanguage: settings.rssSiteLanguage,
			rssCopyright: settings.rssCopyright,
			posts: posts,
		})
		res.xml(response)
	})
}
