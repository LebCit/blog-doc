if (!window.location.pathname.startsWith("/admin")) {
	// Toggle sidebar menu
	let elements = document.querySelectorAll("html, #menu, #layout, .footer")
	const menuToggle = document.getElementById("menuLink")

	elements.forEach((element) => {
		menuToggle.addEventListener("click", () => {
			element.classList.toggle("active")
		})
	})

	// Selected menu link style
	let links = document.querySelectorAll("#menu a")
	links.forEach((link) => {
		window.location.pathname === link.getAttribute("href") && !link.classList.contains("pure-menu-heading")
			? link.parentElement.classList.add("pure-menu-selected")
			: link.parentElement.classList.remove("pure-menu-selected")
	})
}

// Detect external links
const isExternalLink = (url) => {
	const tmp = document.createElement("a")
	tmp.href = url
	return tmp.host !== window.location.host
}
// Select all links
const allLinks = document.querySelectorAll("a")
// Add attributes and icon to each external link
allLinks.forEach((link) => {
	if (isExternalLink(link)) {
		link.setAttribute("target", "_blank")
		link.setAttribute("rel", "external noopener noreferrer")
		link.insertAdjacentHTML(
			"beforeend",
			`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-external-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: bottom;">
<title>External link</title>
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
<path d="M11 13l9 -9"></path>
<path d="M15 4h5v5"></path>
</svg>`
		)
	}
})
