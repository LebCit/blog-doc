import { updateExternalLinks } from "../../updateExternalLinks.js"
import { highlightCurrentMenuItem } from "../../highlightCurrentMenuItem.js"

window.addEventListener("DOMContentLoaded", () => {
	highlightCurrentMenuItem("ul.pure-menu-list")

	updateExternalLinks()

	// RESPONSIVE IMAGES IN PAGES AND POSTS
	const main = document.getElementById("main")
	const images = main.querySelectorAll("img")
	images.forEach((image) => {
		image.classList.add("pure-img-responsive")
	})

	// Function to toggle the sidebar menu
	function toggleSidebar() {
		const elements = document.querySelectorAll("html, #menu, #layout, .footer")
		elements.forEach((element) => {
			element.classList.toggle("active")
		})
	}

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

	// Add class to posts cards
	const postsCards = document.querySelectorAll('div[id^="post-card-"]')
	postsCards.forEach((postCard, index) => {
		// Even post, add 'blog-card' class | Odd post, add 'blog-card alt' classes
		index % 2 === 0 ? postCard.classList.add("blog-card") : postCard.classList.add("blog-card", "alt")
	})
})
