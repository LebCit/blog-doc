// Internal Functions
import { getPosts } from "../functions/blog-doc.js"
import { initializeApp } from "../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../config/settings.js"

// RSS Route
export const rssRoute = app.get("/rss", async (c) => {
	const posts = (await getPosts()).filter((post) => post[1].frontmatter.published == "true")
	c.header("Content-Type", "text/xml")
	const res = eta.render(`themes/${settings.currentTheme}/layouts/rss.html`, {
		// Passing needed settings for the template
		siteTitle: settings.siteTitle,
		siteDescription: settings.siteDescription,
		siteURL: settings.siteURL,
		rssSiteLanguage: settings.rssSiteLanguage,
		rssCopyright: settings.rssCopyright,
		posts: posts,
	})
	return c.body(res)
})
