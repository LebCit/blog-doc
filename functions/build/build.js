// Internal modules
import { cp, rm } from "node:fs/promises"

// Helper functions
import { renameKey } from "./helpers/renameKey.js"
import { ensureFoldersExist } from "./helpers/ensureFoldersExist.js"
import { removeEmptyFolders } from "./helpers/removeEmptyFolders.js"
import { copyStaticFolderWithFilters } from "./helpers/copyStaticFolderWithFilters.js"

// Settings
import { settings } from "../../config/settings.js"

// Routes
import { loadThemeBuildRoutes } from "../loadRoutes.js"

/**
 * Function to generate a static site
 * ==================================
 */
async function build() {
	try {
		// Extract menuLinks from settings
		let menuLinks = settings.menuLinks
		// Remove admin link from menu
		delete menuLinks["bd-admin"]
		// Rename 'rss' to 'rss.xml' in the menuLinks object
		menuLinks = renameKey(menuLinks, "rss", "rss.xml")
		// Rename 'sitemap' to 'sitemap.xml' in the menuLinks object
		menuLinks = renameKey(menuLinks, "sitemap", "sitemap.xml")
		// Reassign menuLinks to settings
		settings.menuLinks = menuLinks

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
		loadThemeBuildRoutes()

		// Remove empty folders at the end of a build
		await removeEmptyFolders("_site")
	} catch (error) {
		console.error("Build error:", error)
	}
}

// Run the build function
build()
