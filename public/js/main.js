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
			'<i class="gg-external" role ="img" aria-label=" (opens in a new tab)"></i>'
		)
	}
})
