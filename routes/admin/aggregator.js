import { join } from "path"
import { marked } from "marked"
import { app } from "../../functions/initialize.js"
import { settings } from "../../config/settings.js"

// default theme routes
import { adminMainRoute } from "./adminMainRoute.js"
import { adminTableRoute } from "./adminTableRoute.js"
import { adminCreateRoute } from "./adminCreateRoute.js"
import { adminEditRoute } from "./adminEditRoute.js"
import { adminGalleryRoute } from "./adminGalleryRoute.js"
import { adminSetRoutesImages } from "./adminSetRoutesImages.js"
import { adminSetTheme } from "./adminSetTheme.js"
import { adminSetMenu } from "./adminSetMenu.js"
import { adminSetSiteSettings } from "./adminSetSiteSettings.js"
import { adminPreviewRoute } from "./adminPreviewRoute.js"
import { adminBuildStaticSite } from "./adminBuildStaticSite.js"

const routes = [
	adminMainRoute,
	adminTableRoute,
	adminCreateRoute,
	adminEditRoute,
	adminGalleryRoute,
	adminSetRoutesImages,
	adminSetTheme,
	adminSetMenu,
	adminSetSiteSettings,
	adminPreviewRoute,
	adminBuildStaticSite,
]

routes.forEach((route) => route(app, settings, marked, join))
