/**
 * Utility function to filter out undefined, null, or empty values from the frontmatter
 * @param {object} frontmatter - The frontmatter object
 * @returns {object} - The filtered frontmatter object
 */
export function filterFrontmatter(frontmatter) {
	return Object.fromEntries(
		Object.entries(frontmatter).filter(([key, value]) => value !== undefined && value !== null && value !== "")
	)
}
