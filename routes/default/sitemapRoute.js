import { eta } from "../../functions/initialize.js"
import { sitemap } from "../../functions/sitemap.js"

// Sitemap Route
export const sitemapRoute = (app, settings) => {
	app.get("/sitemap", async (req, res) => {
		const response = eta.render(`themes/${settings.currentTheme}/layouts/sitemap.html`, {
			urls: await sitemap(app),
		})
		res.xml(response)
	})
}
