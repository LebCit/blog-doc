import { app } from "./functions/initialize.js"
import { settings } from "./config/settings.js"
import { transformLinksToObjects } from "./functions/helpers/transformLinksToObjects.js"

// 404 Route
app.notFound((req, res) => {
	const data = {
		title: "Page Not Found",
		description: "The server cannot find the requested resource",
		subTitle: "Nothing to land on here !",
		favicon: settings.favicon,
	}
	res.status(404).render(`themes/${settings.currentTheme}/layouts/base.html`, {
		errorRoute: true,
		data: data,
		imageSrc: "/static/images/404-not-found-error.png",
		imageAlt: "Sailor on a 404 mast looking out to sea",
		siteTitle: settings.siteTitle,
		siteDescription: settings.siteDescription, // For Midday
		menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
		html_footerCopyright: settings.footerCopyright,
		currentYear: new Date().getFullYear(), // For Midday
	})
})

// 500 Route
app.onError((err, req, res) => {
	console.error(`${err}`)
	const data = {
		title: "Internal Server Error",
		description: "The server encountered an unexpected condition that prevented it from fulfilling the request",
		subTitle: "Server is on a break here !",
		favicon: settings.favicon,
	}
	res.status(500).render(`themes/${settings.currentTheme}/layouts/base.html`, {
		errorRoute: true,
		data: data,
		imageSrc: "/static/images/500-internal-server-error.png",
		imageAlt: "Sad robot in front of empty box",
		siteTitle: settings.siteTitle,
		siteDescription: settings.siteDescription, // For Midday
		menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
		html_footerCopyright: settings.footerCopyright,
		currentYear: new Date().getFullYear(), // For Midday
	})
})

// Routes
import { loadAdminRoutes, loadThemeRoutes } from "./functions/loadRoutes.js"

loadAdminRoutes()
loadThemeRoutes()

app.startServer()
