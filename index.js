import { app, eta } from "./functions/initialize.js"
import { settings } from "./config/settings.js"

// 404 Route
app.notFound((req, res) => {
	const data = {
		title: "Page Not Found",
		description: "The server cannot find the requested resource",
		subTitle: "Nothing to land on here !",
	}
	const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
		// Passing Route data
		errorRoute: true,
		// Passing document data
		data: data,
		// Passing document image data
		imageSrc: "/static/images/404-not-found-error.png",
		imageAlt: "Sailor on a 404 mast looking out to sea",
		// Passing needed settings for the template
		siteTitle: settings.siteTitle,
		menuLinks: settings.menuLinks,
		footerCopyright: settings.footerCopyright,
	})
	res.html(response, 404)
})

// 500 Route
app.onError((err, req, res) => {
	console.error(`${err}`)
	const data = {
		title: "Internal Server Error",
		description: "The server encountered an unexpected condition that prevented it from fulfilling the request",
		subTitle: "Server is on a break here !",
	}
	const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
		// Passing Route data
		errorRoute: true,
		// Passing document data
		data: data,
		// Passing document image data
		imageSrc: "/static/images/500-internal-server-error.png",
		imageAlt: "Sad robot in front of empty box",
		// Passing needed settings for the template
		siteTitle: settings.siteTitle,
		menuLinks: settings.menuLinks,
		footerCopyright: settings.footerCopyright,
	})
	res.html(response, 500)
})

// Routes
import { loadAdminRoutes, loadThemeRoutes } from "./functions/loadRoutes.js"

loadAdminRoutes()
loadThemeRoutes()

app.startServer()
