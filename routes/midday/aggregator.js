import { settings } from "../../config/settings.js"
import { app } from "../../functions/initialize.js"

// default theme routes
import { mainRoute } from "./mainRoute.js"
import { archiveRoute } from "./archiveRoute.js"
import { markdownRoute } from "./markdownRoute.js"
import { tagsRoute } from "./tagsRoute.js"
import { rssRoute } from "../rssRoute.js"
import { sitemapRoute } from "../sitemapRoute.js"
import { searchRoute } from "./searchRoute.js"

const routes = [mainRoute, archiveRoute, markdownRoute, tagsRoute, rssRoute, sitemapRoute, searchRoute]

routes.forEach((route) => route(app, settings))
