/**
 * This function extracts internal links (same domain) from the returned html by a post, page or template,
 * and add at the end of each one the `.html` extension then returns the html with the replacement(s).
 */
module.exports = (str) => {
	// Regex to get href from a string
	const hrefRegex = /href="(.*?)"/g
	// Return all href from a string as an array with match()
	let hrefArray = str.match(hrefRegex)

	if (hrefArray) {
		hrefArray.forEach((href) => {
			/**
			 * 1- Get each href starting with `href="/` (it's an internal link)
			 * 2- The href length should be greater than 8 (it's not `href="/"`)
			 * 3- The href should not already includes `.html` (avoid adding `.html` to components and already generated links)
			 */
			if (href.startsWith(`href="/`) && href.length > 8 && !href.includes(".html")) {
				// Regex to get the href value
				const hrefValueRegex = /(?<name>href)\s*=\s*((?:"(?<Value>[^">]+)))/i
				// Get the value of the href
				const hrefValue = href.match(hrefValueRegex).groups.Value
				// Generate the new href
				const newHref = `href="${hrefValue + ".html"}"`
				// Regenerate the string by replacing the href by the new one
				str = str.replace(href, newHref)
			}
		})
	}
	// Return the regenerated string
	return str
}
