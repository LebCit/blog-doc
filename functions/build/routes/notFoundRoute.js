// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"

// Internal functions
import { transformLinksToObjects } from "../../helpers/transformLinksToObjects.js"

/**
 * Function to create the 404 page
 * ===============================
 */
export const notFoundRoute = async (app, settings) => {
	try {
		const data = {
			title: "Page Not Found",
			description: "The server cannot find the requested resource",
			subTitle: "Nothing to land on here !",
			favicon: settings.favicon,
		}

		await ensureFoldersExist(["_site"])

		await app.renderToFile(
			`themes/${settings.currentTheme}/layouts/base.html`,
			{
				errorRoute: true,
				data: data,
				imageSrc: "/static/images/404-not-found-error.png",
				imageAlt: "Sailor on a 404 mast looking out to sea",
				siteTitle: settings.siteTitle,
				siteDescription: settings.siteDescription, // For Midday
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
				currentYear: new Date().getFullYear(), // For Midday
			},
			"_site/404.html" // Create HTML file for the not found route of the site
		)
	} catch (error) {
		console.error("Error in notFoundRoute:", error)
		throw error
	}
}
