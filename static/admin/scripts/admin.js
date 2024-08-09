import { openModal } from "./openModal.js"
import { buildAndZip } from "./buildAndZip.js"
import { applySelectedImage } from "./applySelectedImage.js"
import { openCloseMobileMenu } from "./openCloseMobileMenu.js"
import { updateExternalLinks } from "../../scripts/updateExternalLinks.js"
import { highlightCurrentMenuItem } from "../../scripts/highlightCurrentMenuItem.js"

document.addEventListener("DOMContentLoaded", () => {
	// Adds an indicator to the current menu item in aside
	highlightCurrentMenuItem("aside")

	// Open and close the mobile menu
	openCloseMobileMenu()

	// Update external links
	updateExternalLinks()

	// Prevent closing summary elements
	document.addEventListener("click", function (event) {
		if (event.target.tagName.toLowerCase() === "summary") {
			event.preventDefault()
		}
	})

	const documentationModalButton = document.getElementById("documentation-modal-button")
	if (documentationModalButton) {
		// Open documentation modal
		documentationModalButton.addEventListener("click", () => {
			openModal("documentation-modal")
		})
	}

	function openImagesModal(button) {
		if (button) {
			// Open images modal
			button.addEventListener("click", () => {
				openModal("images-modal")

				// Get the hidden input image
				const imageInput = button.nextElementSibling
				// Apply the selected image from the images modal
				applySelectedImage(imageInput)
			})
		}
	}

	const imagesModalButton = document.getElementById("file-image")
	openImagesModal(imagesModalButton)

	const routesImagesModalButtons = document.querySelectorAll("button[id$='-route-image']")
	routesImagesModalButtons.forEach((button) => {
		openImagesModal(button)
	})

	const siteSettingsImagesModalButton = document.querySelectorAll(".site-settings-button")
	siteSettingsImagesModalButton.forEach((button) => {
		openImagesModal(button)
	})

	// Triggers a build and provides a ZIP archive to download
	buildAndZip("build-and-zip-button")
})
