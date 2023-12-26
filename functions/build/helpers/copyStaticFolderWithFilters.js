import { normalize } from "node:path"
import { settings } from "../../../config/settings.js"

/**
 * Helper function to filter the copy of "static" into "_site/static".
 * ===================================================================
 *
 * @param {string} src - The path to the source "static" folder.
 * @param {string} dest - The path to the destination "_site/static" folder.
 */
export const copyStaticFolderWithFilters = async (src, dest) => {
	try {
		const normalizedSrc = normalize(src)

		// Exclude paths ending with "admin" or "dump" and their contents
		if (normalizedSrc.endsWith("admin")) {
			return false // Exclude this path
		}

		// Include only the "currentTheme" folder within the "themes" folder
		if (normalizedSrc.includes("themes") && !normalizedSrc.endsWith("themes")) {
			if (normalizedSrc.includes(settings.currentTheme)) {
				return true // Include this path (the "currentTheme" folder)
			} else {
				return false // Exclude other paths within "themes"
			}
		}

		// Include all other files/folders
		return true
	} catch (error) {
		console.error(`Error in copyStaticFolderWithFilters: ${error.message}`)
		throw error
	}
}
