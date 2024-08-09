/**
 * Highlights the current menu item in the navigation based on the current path.
 *
 * This function selects all anchor elements within the specified main navigation menu, checks
 * the current path of the URL, and adds the 'active' class to the anchor that matches
 * the current path. It also sets up event listeners to update the 'active' class when
 * different menu items are clicked.
 *
 * @param {string} [mainNavMenu=null] - A CSS selector string to specify the main navigation menu container.
 *   If `null` or not provided, the function will not apply any highlighting.
 */
export const highlightCurrentMenuItem = (mainNavMenu = null) => {
	// Select all anchor elements within the main navigation menu
	const anchors = document.querySelectorAll(`${mainNavMenu} a`)
	// Get the current path from the URL
	let currentPath = window.location.pathname
	// Normalize the current path (remove trailing slash if exists)
	if (currentPath.endsWith("/")) {
		currentPath = currentPath.slice(0, -1)
	}

	/**
	 * Sets the 'active' class on the menu item that matches the current path.
	 */
	function setActiveClass() {
		// Iterate through each anchor element
		anchors.forEach((anchor) => {
			// Get and normalize the anchor's href
			let anchorPath = anchor.getAttribute("href")
			if (anchorPath.endsWith("/")) {
				anchorPath = anchorPath.slice(0, -1)
			}

			// Check if the anchor's href matches the current path
			if (anchorPath === currentPath) {
				// Add the 'active' class to the matching anchor
				anchor.classList.add("active")

				// Update mobile menu trigger text
				const mobileMenuTrigger = document.querySelector("mobile-menu-trigger")
				if (mobileMenuTrigger) {
					mobileMenuTrigger.lastElementChild.innerText = `➤ ${anchor.innerText}`
				}
			} else {
				// Remove the 'active' class from non-matching anchors
				anchor.classList.remove("active")
			}
		})
	}

	// Set the active class on the appropriate menu item when the page loads
	setActiveClass()

	// Add click event listeners to all anchor elements
	anchors.forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			// Remove the 'active' class from all anchor elements
			anchors.forEach((a) => a.classList.remove("active"))

			// Add the 'active' class to the clicked anchor
			this.classList.add("active")
		})
	})
}
