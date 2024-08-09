import { updateExternalLinks } from "../../updateExternalLinks.js"

window.addEventListener("DOMContentLoaded", () => {
	updateExternalLinks()

	// Hide and show the main menu when scrolling on large screens
	let scrollPos = 0
	const mainNav = document.getElementById("mainNav")
	const headerHeight = mainNav.clientHeight
	window.addEventListener("scroll", function () {
		const currentTop = document.body.getBoundingClientRect().top * -1
		if (currentTop < scrollPos) {
			// Scrolling Up
			if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
				mainNav.classList.add("is-visible")
			} else {
				mainNav.classList.remove("is-visible", "is-fixed")
			}
		} else {
			// Scrolling Down
			mainNav.classList.remove(["is-visible"])
			if (currentTop > headerHeight && !mainNav.classList.contains("is-fixed")) {
				mainNav.classList.add("is-fixed")
			}
		}
		scrollPos = currentTop
	})

	// RESPONSIVE IMAGES IN PAGES AND POSTS
	const main = document.getElementById("main")
	// Ensure that a page or a post is displayed
	if (main) {
		const images = main.querySelectorAll("img")
		images.forEach((image) => {
			image.classList.add("img-fluid")
		})
	}
})
