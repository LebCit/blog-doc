import { readFile } from "node:fs/promises"
import { URL } from "node:url"

/**
 * Asynchronously reads and parses a JSON file.
 * @async
 * @function getSettings
 * @returns {Promise<Object>} The parsed JSON object from the settings file.
 * @throws Will throw an error if the file cannot be read or parsed.
 */
async function getSettings() {
	try {
		// Create a URL object for the settings.json file relative to the current module
		const filePath = new URL("./settings.json", import.meta.url)

		// Read the file as a string with UTF-8 encoding
		const data = await readFile(filePath, "utf-8")

		// Parse the JSON string into an object
		const settings = JSON.parse(data)

		return settings // Return the parsed object
	} catch (error) {
		// Log the error if reading or parsing fails
		console.error("Error reading or parsing settings.json:", error)

		// Re-throw the error to be handled by the caller
		throw error
	}
}

// Await the settings and export them
const settings = await getSettings()
export { settings }
