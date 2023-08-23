// Internal Functions
import { initializeApp } from "./functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "./config/settings.js"

// External modules
import { serveStatic } from "@hono/node-server/serve-static"
import { serve } from "@hono/node-server"
import { env } from "hono/adapter"

// Serve Static files
app.use("/static/*", serveStatic({ root: "./" }))

// Set the port value
const port = env.PORT || 3000

app.use("*", async (c, next) => {
	console.log(c.req.param())
	await next()
})

// Administration Routes
import { adminRoutes, adminUpdateDelete } from "./routes/admin/adminRoute.js"
import { adminCreateRoute } from "./routes/admin/adminCreateRoute.js"
import { adminConfigRoute } from "./routes/admin/adminConfigRoute.js"
import { adminGalleryRoute } from "./routes/admin/adminGalleryRoute.js"
import { adminBuildRoute } from "./routes/admin/adminBuildRoute.js"

app.route("/", adminRoutes)
app.route("/", adminUpdateDelete)
app.route("/", adminCreateRoute)
app.route("/", adminConfigRoute)
app.route("/", adminGalleryRoute)
app.route("/", adminBuildRoute)

// Routes
import { mainRoute } from "./routes/mainRoute.js"
import { markdownRoute } from "./routes/markdownRoute.js"
import { tagsRoute } from "./routes/tagsRoute.js"
import { archiveRoute } from "./routes/archiveRoute.js"
import { searchRoute } from "./routes/searchRoute.js"
import { rssRoute } from "./routes/rssRoute.js"
import { sitemapRoute } from "./routes/sitemapRoute.js"

app.route("/", mainRoute)
app.route("/", markdownRoute)
app.route("/", tagsRoute)
app.route("/", archiveRoute)
app.route("/", searchRoute)
app.route("/", rssRoute)
app.route("/", sitemapRoute)

// 404 Route
app.notFound((c) => {
	const data = {
		title: "Page Not Found",
		description: "The server cannot find the requested resource",
		subTitle: "Nothing to land on here !",
	}
	const res = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
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
	return c.html(res, 404)
})

// 500 Route
app.onError((err, c) => {
	console.error(`${err}`)
	const data = {
		title: "Internal Server Error",
		description: "The server encountered an unexpected condition that prevented it from fulfilling the request",
		subTitle: "Server is on a break here !",
	}
	const res = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
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
	return c.html(res, 500)
})

serve(
	{
		fetch: app.fetch,
		port: port,
	},
	({ port }) => {
		console.log(`App @ http://localhost:${port}`)
	}
)
