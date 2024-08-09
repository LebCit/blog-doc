/**
 * Toggles the mobile menu's open and close state.
 *
 * This function sets up event listeners to open and close the mobile menu when the
 * respective trigger elements are clicked. When the mobile menu is opened, it
 * expands to full width and disables vertical scrolling on the body. When closed,
 * it shrinks to zero width and restores vertical scrolling.
 *
 * @function
 */
export const openCloseMobileMenu = () => {
	// Select the main sidebar element for the menu
	const mainMenuSidebar = document.querySelector("aside")
	// Select the trigger element for opening the mobile menu
	const mobileMenuTrigger = document.querySelector("mobile-menu-trigger")
	// Select the trigger element for closing the mobile menu
	const mobileMenuCloser = document.querySelector("mobile-menu-header").lastElementChild

	// Add click event listener to the mobile menu trigger to open the menu
	mobileMenuTrigger.firstElementChild.addEventListener("click", () => {
		// Disable vertical scrolling on the body
		document.body.style.overflowY = "hidden"
		// Expand the sidebar to full width
		mainMenuSidebar.style.width = "95%"
		// Set the sidebar's left position to 0
		mainMenuSidebar.style.left = "0"
	})

	// Add click event listener to the mobile menu closer to close the menu
	mobileMenuCloser.addEventListener("click", () => {
		// Enable vertical scrolling on the body
		document.body.style.overflowY = "initial"
		// Shrink the sidebar to zero width
		mainMenuSidebar.style.width = "0"
		// Set the sidebar's left position to -96%
		mainMenuSidebar.style.left = "-96%"
	})
}
