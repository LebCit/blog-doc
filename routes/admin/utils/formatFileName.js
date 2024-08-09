/**
 * Utility function to sanitize and format the file title into a valid file name.
 * @param {string} title - The original file title.
 * @param {boolean} keepDot - Optional flag to keep dots in the file name. Defaults to false.
 * @returns {string} - The sanitized and formatted file name.
 */
export function formatFileName(title, keepDot = false) {
	// Define regex to include dots if keepDot is true, otherwise exclude them
	const specialCharPattern = keepDot ? /[^a-zA-Z0-9-_./ ]/g : /[^a-zA-Z0-9-_ ]/g

	return title
		.trim()
		.toLowerCase()
		.replace(specialCharPattern, "") // Remove special characters based on keepDot flag
		.replace(/_+/g, "-") // Replace any number of underscores by one hyphen
		.replace(/\s+/g, "-") // Replace any number of spaces by one hyphen
		.replace(/^-+/, "") // Remove any number of hyphens at the beginning
		.replace(/-+$/, "") // Remove any number of hyphens at the end
		.replace(/-+/g, "-") // Replace any number of hyphens by one hyphen only
}
