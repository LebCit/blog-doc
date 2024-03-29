// Internal Functions
import { sitemap } from "../functions/sitemap.js"
import { initializeApp } from "../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../config/settings.js"

// Sitemap Route
export const sitemapRoute = app.get("/sitemap", (c) => {
	c.header("Content-Type", "text/xml")
	const res = eta.render(`themes/${settings.currentTheme}/layouts/sitemap.html`, {
		urls: sitemap(),
	})
	return c.body(res)
})
