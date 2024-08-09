import { openModal } from "./openModal.js"

// Function to check if all files are images
function areFilesImages(files) {
	return Array.from(files).every((file) => file.type.startsWith("image/"))
}

// Handle form submission for image uploads
document.addEventListener("submit", function (event) {
	const form = event.target
	if (form.id === "images-upload-form") {
		const fileInput = form.querySelector('input[type="file"]')
		const files = fileInput.files

		// Check if no files are selected or if any file is not an image
		if (files.length === 0 || !areFilesImages(files)) {
			event.preventDefault()
			openModal("images-upload-alert-modal")
		}
	}
})

// Handle delete button click on image cards
document.addEventListener("click", function (event) {
	const target = event.target
	if (target.tagName === "BUTTON" && target.classList.contains("image-card__delete-btn")) {
		const imageCard = target.closest(".image-card")
		const image = imageCard.querySelector("img")
		const imagePath = image.getAttribute("src")
		const imageTitle = image.getAttribute("alt")

		const deleteImageModal = document.getElementById("delete-image-modal")
		const deleteImageModalH3 = deleteImageModal.querySelector("h3")
		const deleteImageModalInput = deleteImageModal.querySelector("input")

		deleteImageModalH3.innerText = imageTitle
		deleteImageModalInput.setAttribute("value", imagePath)

		openModal("delete-image-modal")
	}
})
