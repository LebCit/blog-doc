/**
 * Utility function to process tags into a properly formatted array string
 * @param {string} tags - The comma-separated tags string
 * @returns {string} - The formatted tags array string
 */
export function processTags(tags) {
	return tags
		.split(",")
		.map((tag) => tag.trim())
		.filter((tag) => tag.length > 0) // Filter out empty tags
		.join(", ")
}
