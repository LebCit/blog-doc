import { writeFile } from "node:fs/promises"

/**
 * Helper function to write file with error handling.
 * ==================================================
 *
 * @param {string} filePath - The path to the file to be written.
 * @param {string | Buffer} data - The data to be written to the file.
 * @param {Object} options - Optional options for the writeFile function (e.g., encoding, mode).
 */
export const writeFileWithHandling = async (filePath, data, options) => {
	try {
		// Attempt to write the file using the built-in writeFile function
		await writeFile(filePath, data, options)
	} catch (error) {
		// If an error occurs during writing, handle it gracefully:

		// Log the error to the console, including the file path and error message
		console.error(`Error writing file ${filePath}: ${error.message}`)

		// Re-throw the error to allow for further handling by the calling code
		throw error
	}
}
