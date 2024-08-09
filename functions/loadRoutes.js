import { join } from "path"
import { pathToFileURL } from "url"
import { app } from "./initialize.js"
import { settings } from "../config/settings.js"

/**
 * Asynchronously loads the routes for the current theme.
 *
 * This function determines the current theme from the settings,
 * and then dynamically imports the appropriate route aggregator
 * file for that theme. It supports shared route logic for specific themes.
 *
 * @async
 * @function loadThemeRoutes
 * @returns {Promise<void>} A promise that resolves when the routes are successfully loaded.
 */
async function loadThemeRoutes() {
	const { currentTheme } = settings

	// Define themes that share the same routes logic
	const sharedThemes = ["default", "clean-blog"]
	const routesFolder = sharedThemes.includes(currentTheme) ? "default" : currentTheme
	const routesDir = join(process.cwd(), "routes", routesFolder)
	const routesPath = pathToFileURL(join(routesDir, "aggregator.js")).href

	try {
		// Dynamically import the routes module
		const routesModule = await import(routesPath)
		const initializeRoutes = routesModule.default

		// If the imported module is a function, call it to initialize routes
		if (typeof initializeRoutes === "function") {
			initializeRoutes(app, settings)
		}

		console.log(`Routes for theme "${currentTheme}" loaded successfully from "${routesFolder}" folder.`)
	} catch (error) {
		console.error(`Failed to load routes for theme "${currentTheme}":`, error)
	}
}

/**
 * Asynchronously loads the admin routes.
 *
 * This function dynamically imports the admin route aggregator file
 * and initializes the admin routes.
 *
 * @async
 * @function loadAdminRoutes
 * @returns {Promise<void>} A promise that resolves when the admin routes are successfully loaded.
 */
async function loadAdminRoutes() {
	const adminRoutesDir = join(process.cwd(), "routes", "admin")
	const adminRoutesPath = pathToFileURL(join(adminRoutesDir, "aggregator.js")).href

	try {
		// Dynamically import the admin routes module
		const adminRoutesModule = await import(adminRoutesPath)
		const initializeAdminRoutes = adminRoutesModule.default

		// If the imported module is a function, call it to initialize routes
		if (typeof initializeAdminRoutes === "function") {
			initializeAdminRoutes(app, settings)
		}

		console.log(`Admin routes loaded successfully from "admin" folder.`)
	} catch (error) {
		console.error(`Failed to load admin routes:`, error)
	}
}

/**
 * Asynchronously loads the build routes for the current theme.
 *
 * This function determines the current theme from the settings,
 * and then dynamically imports the appropriate route aggregator
 * file for that theme. It supports shared route logic for specific themes.
 *
 * @async
 * @function loadThemeBuildRoutes
 * @returns {Promise<void>} A promise that resolves when the routes are successfully loaded.
 */
async function loadThemeBuildRoutes() {
	const { currentTheme } = settings

	// Define themes that share the same routes logic
	const sharedThemes = ["default", "clean-blog"]
	const routesFolder = sharedThemes.includes(currentTheme) ? "default" : currentTheme
	const routesDir = join(process.cwd(), "functions", "build", "routes", routesFolder)
	const routesPath = pathToFileURL(join(routesDir, "aggregator.js")).href

	try {
		// Dynamically import the routes module
		const routesModule = await import(routesPath)
		const initializeRoutes = routesModule.default

		// If the imported module is a function, call it to initialize routes
		if (typeof initializeRoutes === "function") {
			initializeRoutes(app, settings)
		}

		console.log(`Routes for building theme "${currentTheme}" loaded successfully from "${routesFolder}" folder.`)
	} catch (error) {
		console.error(`Failed to load routes for theme "${currentTheme}":`, error)
	}
}

export { loadThemeRoutes, loadAdminRoutes, loadThemeBuildRoutes }
