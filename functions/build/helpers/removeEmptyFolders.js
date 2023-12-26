import { lstat, readdir, rmdir } from "node:fs/promises"
import { join } from "node:path"

/**
 * Helper function to recursively remove empty folders within a given root folder.
 * ===============================================================================
 * Asynchronously removes empty folders recursively.
 *
 * @param {string} rootFolder - The path to the root folder from which to start removing empty folders.
 */
export const removeEmptyFolders = async (rootFolder) => {
	try {
		// Read the contents of the root folder
		const entries = await readdir(rootFolder)

		// Iterate through each entry in the folder
		for (const entry of entries) {
			// Construct the full path to the entry
			const fullPath = join(rootFolder, entry)

			// Get the file/folder stats to check if it's a directory
			const stats = await lstat(fullPath)

			// If the entry is a directory:
			if (stats.isDirectory()) {
				// Recursively remove empty folders within this folder
				await removeEmptyFolders(fullPath)

				// Check if the folder is empty after removing its contents
				const isEmpty = (await readdir(fullPath)).length === 0
				if (isEmpty) {
					// If empty, remove the folder itself
					await rmdir(fullPath)
				}
			}
		}
	} catch (error) {
		// Handle any errors that occur during the process
		console.error(`Error removing empty folders: ${error.message}`)
	}
}
