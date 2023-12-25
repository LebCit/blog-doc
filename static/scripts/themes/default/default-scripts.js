import { isExternalLink } from "../../is-external-link.js"

// Utility function to ensure that the trailing slash is not considered when highlighting the menu item
function removeTrailingSlash(str) {
	return str.replace(/\/$/, "") // Regular expression to remove trailing slash
}

// Function to highlight main menu items depending on their href attribute
function highlightMenuItem(path) {
	// Remove the 'pure-menu-selected' class from all menu items
	const menuItems = document.querySelectorAll(".pure-menu-item")
	menuItems.forEach((menuItem) => menuItem.classList.remove("pure-menu-selected"))

	// Remove trailing slash from the current pathname
	const currentPathWithoutSlash = removeTrailingSlash(path)

	// Find the menu item that matches the current pathname without the trailing slash
	const selectedItem = document.querySelector(`.pure-menu-item a[href="${currentPathWithoutSlash}"]`)

	// Check if the selected item is not the "/admin" link and is an internal link
	if (selectedItem && !isExternalLink(selectedItem.href) && selectedItem.getAttribute("href") !== "/admin") {
		// Add the 'pure-menu-selected' class to the parent of the matched item
		selectedItem.parentElement.classList.add("pure-menu-selected")
	}
}

// Function to toggle the sidebar menu
function toggleSidebar() {
	const elements = document.querySelectorAll("html, #menu, #layout, .footer")
	elements.forEach((element) => {
		element.classList.toggle("active")
	})
}

// Function to handle actions after DOM has loaded
function handleDOMContentLoaded() {
	// Get the current pathname
	const currentPath = window.location.pathname

	// Highlight the corresponding menu item based on the pathname
	highlightMenuItem(currentPath)

	// RESPONSIVE IMAGES IN PAGES AND POSTS
	const main = document.getElementById("main")
	const images = main.querySelectorAll("img")
	images.forEach((image) => {
		image.classList.add("pure-img-responsive")
	})

	// Toggle sidebar menu
	const menuToggle = document.getElementById("menuLink")
	if (menuToggle) {
		const commonAncestor = document
		commonAncestor.addEventListener("click", (event) => {
			if (event.target === menuToggle) {
				toggleSidebar()
			}
		})
	}
}

// Attach the handleDOMContentLoaded function to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)
