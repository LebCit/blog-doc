import { readdir } from "fs/promises"

/**
 * Recursively gets all files from a directory.
 * @param {string} dirName - The directory name to read files from.
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
 */
async function getFiles(dirName) {
	let files = []

	try {
		const items = await readdir(dirName, { withFileTypes: true })

		const promises = items.map(async (item) => {
			const path = `${dirName}/${item.name}`
			if (item.isDirectory()) {
				const nestedFiles = await getFiles(path)
				files = [...files, ...nestedFiles]
			} else {
				files.push(path)
			}
		})

		await Promise.all(promises)
	} catch (error) {
		console.error(`Error reading directory ${dirName}:`, error)
	}

	return files
}

export { getFiles }
