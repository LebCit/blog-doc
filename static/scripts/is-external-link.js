// Function to check if a link is external
export function isExternalLink(href) {
	const currentDomain = window.location.host // .host includes the port number if present
	const link = document.createElement("a")
	link.href = href
	return link.host !== currentDomain
}
