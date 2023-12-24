import { isExternalLink } from "./is-external-link.js"

// Function to insert an external link icon before the end of an external link
function insertExternalLinkIcon(link) {
	const icon = `<svg xmlns="http://www.w3.org/2000/svg"
	class="icon icon-tabler icon-tabler-external-link"
	width="24" height="24"
	viewBox="0 0 24 24" stroke-width="2"
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	style="vertical-align: bottom">
	<title>External link</title>
	<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
	<path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
	<path d="M11 13l9 -9" />
	<path d="M15 4h5v5" /></svg>`

	link.insertAdjacentHTML("beforeend", icon)
}

// Function to handle external links
function handleExternalLinks() {
	// Specific selector to reduce the number of links to iterate through
	const potentialExternalLinks = document.querySelectorAll(
		"a[href^='http']:not([href*='" + window.location.host + "'])"
	)

	// Update attributes for each external link
	potentialExternalLinks.forEach((link) => {
		if (isExternalLink(link.href)) {
			link.setAttribute("target", "_blank")
			link.setAttribute("rel", "external noopener noreferrer")
			insertExternalLinkIcon(link)
		}
	})
}

// Attach the handleExternalLinks function to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", handleExternalLinks)
