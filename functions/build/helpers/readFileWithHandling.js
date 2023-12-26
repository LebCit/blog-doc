import { readFile } from "node:fs/promises"

/**
 * Helper function to read file with error handling.
 * =================================================
 * Reads a file asynchronously and handles potential errors gracefully.
 *
 * @param {string} filePath - The path to the file to read.
 * @param {object} options - Optional options for the `readFile` function (e.g., encoding).
 * @returns {Promise<Buffer>} A Promise that resolves with the file contents as a Buffer, or rejects with an error if reading fails.
 */
export const readFileWithHandling = async (filePath, options = {}) => {
	try {
		// Attempt to read the file using the built-in `readFile` function
		const fileData = await readFile(filePath, options)
		return fileData
	} catch (error) {
		// Log the error to the console with a clear message
		console.error(`Error reading file ${filePath}: ${error.message}`)

		// Re-throw the error to allow for further handling by the caller
		throw error
	}
}
