/**
 * Updates all external links on the current page by adding `target="_blank"` and
 * `rel="external noopener noreferrer"` attributes to them.
 */
export function updateExternalLinks() {
	// Select all anchor (`<a>`) elements whose `href` attribute starts with 'http' and does not contain the current host
	const potentialExternalLinks = document.querySelectorAll(
		"a[href^='http']:not([href*='" + window.location.host + "'])"
	)

	/**
	 * Checks if a given URL is external by comparing its host to the current window's host.
	 *
	 * @param {string} url - The URL to check.
	 * @returns {boolean} `true` if the URL is external, `false` otherwise.
	 */
	const isExternalLink = (url) => {
		const tmp = document.createElement("a")
		tmp.href = url
		return tmp.host !== window.location.host
	}

	// Iterate through each potential external link found
	potentialExternalLinks.forEach((link) => {
		// Check if the link is external
		if (isExternalLink(link.href)) {
			// If external, set attributes to open link in a new tab and improve security
			link.setAttribute("target", "_blank")
			link.setAttribute("rel", "external noopener noreferrer")
			link.setAttribute("title", `External link to ${link.textContent}. Opens in a new tab.`)
		}
	})
}
