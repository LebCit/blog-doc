import { settings } from "../../../../config/settings.js"
import { app } from "../../../initialize.js"

// default theme routes for build
import { mainRoute } from "./mainRoute.js"
import { archiveRoute } from "./archiveRoute.js"
import { markdownRoute } from "./markdownRoute.js"
import { tagRoute } from "./tagRoute.js"
import { tagsRoute } from "./tagsRoute.js"
import { rssRoute } from "../rssRoute.js"
import { sitemapRoute } from "../sitemapRoute.js"
import { notFoundRoute } from "../notFoundRoute.js"
//import { searchRoute } from "./searchRoute.js"

const routes = [mainRoute, archiveRoute, markdownRoute, tagRoute, tagsRoute, rssRoute, sitemapRoute, notFoundRoute]

routes.forEach((route) => route(app, settings))
