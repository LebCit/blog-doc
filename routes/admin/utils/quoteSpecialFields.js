/**
 * Utility function to wrap certain frontmatter fields in double quotes
 * @param {object} frontmatter - The frontmatter object
 * @returns {object} - The frontmatter object with specific fields wrapped in double quotes
 */
export function quoteSpecialFields(frontmatter) {
	const fieldsToQuote = ["title", "description", "featuredImage", "href"]
	for (const field of fieldsToQuote) {
		if (frontmatter[field]) {
			frontmatter[field] = `"${frontmatter[field].replace(/"/g, '\\"')}"`
		}
	}
	return frontmatter
}
