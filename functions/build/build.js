// Internal modules
import { cp, rm } from "node:fs/promises"

// Helper functions
import { ensureFoldersExist } from "./helpers/ensureFoldersExist.js"
import { removeEmptyFolders } from "./helpers/removeEmptyFolders.js"
import { copyStaticFolderWithFilters } from "./helpers/copyStaticFolderWithFilters.js"

// Settings
import { settings } from "../../config/settings.js"

// Routes
import { archiveRoute } from "./routes/archiveRoute.js"
import { mainRoute } from "./routes/mainRoute.js"
import { markdownRoute } from "./routes/markdownRoute.js"
import { rssRoute } from "./routes/rssRoute.js"
import { searchRoute } from "./routes/searchRoute.js"
import { sitemapRoute } from "./routes/sitemapRoute.js"
import { tagRoute } from "./routes/tagRoute.js"
import { tagsRoute } from "./routes/tagsRoute.js"

/**
 * Function to generate a static site
 * ==================================
 */
async function build() {
	try {
		// Remove admin link from menu
		delete settings.menuLinks.admin

		// Remove existing "_site" directory if it exists
		await rm("_site", { recursive: true, force: true })

		// Ensure necessary folders exist
		await ensureFoldersExist([
			"_site/page",
			"_site/pages",
			"_site/posts",
			"_site/templates",
			"_site/tags",
			"_site/search",
			"_site/static",
		])

		// Copy "static" folder to "_site/static" with filter function
		await cp("static", "_site/static", { recursive: true, filter: copyStaticFolderWithFilters })

		// Execute the route creation functions
		markdownRoute()
		mainRoute()
		archiveRoute()
		tagsRoute()
		tagRoute()
		rssRoute()
		sitemapRoute()
		settings.searchFeature ? searchRoute() : delete settings.menuLinks.search

		// Remove empty folders at the end of a build
		await removeEmptyFolders("_site")
	} catch (error) {
		console.error("Build error:", error)
	}
}

// Run the build function
build()
