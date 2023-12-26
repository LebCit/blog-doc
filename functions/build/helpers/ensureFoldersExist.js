import { access, mkdir } from "node:fs/promises"

/**
 * Helper function to ensure folders exist.
 * ========================================
 * Asynchronously ensures that the specified folders exist on the file system.
 *
 * @param {string[]} folders An array of folder paths to check and create if needed.
 * @returns {Promise<void>} A promise that resolves when all folders have been created.
 */
export const ensureFoldersExist = async (folders) => {
	for (const folder of folders) {
		try {
			// Attempt to access the folder to see if it already exists.
			await access(folder)
		} catch (error) {
			// If the folder doesn't exist, create it recursively.
			await mkdir(folder, { recursive: true })
		}
	}
}
