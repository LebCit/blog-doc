export function imagesModal(modal) {
	const modalEl = document.getElementById(modal)
	const modalBody = modalEl.querySelector(".modal-body")
	const applyImage = modalEl.querySelector(".modal-footer").lastElementChild

	let modalTriggerButton
	modalEl.addEventListener("show.bs.modal", async (event) => {
		// Button that triggered the modal
		modalTriggerButton = event.relatedTarget

		const hiddenInput = modalTriggerButton.nextElementSibling

		// Modal title based on hidden input name
		const modalTitle = modalEl.querySelector(".modal-title")
		modalTitle.firstChild.data = `Select ${hiddenInput.name}`

		// Get all the check inputs
		const allCheckInputs = Array.from(modalEl.querySelectorAll(".form-imagecheck-input"))

		// Check/Mark the current image in the gallery
		const currentImage = allCheckInputs.filter((el) => el.value == hiddenInput.value)
		if (currentImage.length) {
			currentImage[0].checked = true
		} else {
			const urlRadio = modalBody.querySelector(".input-group-text").firstElementChild
			urlRadio.checked = true
			const urlInput = modalBody.querySelector(".input-group").lastElementChild
			urlInput.value = hiddenInput.value
		}
	})

	let selectedImage
	modalBody.addEventListener("change", (event) => {
		if (event.target.classList.contains("form-imagecheck-input")) {
			selectedImage = event.target.value
		} else {
			const urlInput = modalBody.querySelector(".input-group").lastElementChild
			selectedImage = urlInput.value
		}
	})

	applyImage.addEventListener("click", () => {
		// Update the value of the hidden input
		modalTriggerButton.nextElementSibling.value = selectedImage

		// Close the modal
		applyImage.previousElementSibling.click()
	})
}
