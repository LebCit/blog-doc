window.addEventListener("DOMContentLoaded", () => {
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
				` <i class="fa-solid fa-arrow-up-right-from-square" title="External link"></i>`
			)
		}
	})
})
