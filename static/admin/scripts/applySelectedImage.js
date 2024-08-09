export function applySelectedImage(imageInput) {
	const imagesModal = document.getElementById("images-modal")
	const applyImage = imagesModal.querySelector(".modal-footer .confirm")
	//const imageInput = document.getElementById("file-image-hidden-input")
	const urlInput = document.getElementById("image-url-input")
	const urlRadio = document.getElementById("radio-url")
	const radios = document.querySelectorAll(".image-card__radio")
	const images = document.querySelectorAll(".image-card__img")

	function updateBlur() {
		if (urlRadio.checked) {
			images.forEach((img) => img.classList.add("blurred"))
		} else {
			images.forEach((img) => img.classList.add("blurred"))
			const selectedRadio = document.querySelector(".image-card__radio:checked")
			if (selectedRadio) {
				const imgWrapper = selectedRadio.closest(".image-card__img-wrapper")
				if (imgWrapper) {
					imgWrapper.querySelector(".image-card__img").classList.remove("blurred")
				}
			}
		}
	}

	// Initialize the radio selection based on the hidden input value
	function initializeSelection() {
		const imageValue = imageInput.value.trim()
		if (imageValue) {
			let isUrlSelected = true
			radios.forEach((radio) => {
				const imgWrapper = radio.closest(".image-card__img-wrapper")
				if (imgWrapper) {
					const img = imgWrapper.querySelector(".image-card__img")
					if (img.getAttribute("src") === imageValue) {
						radio.checked = true
						isUrlSelected = false
					}
				}
			})
			if (isUrlSelected) {
				urlRadio.checked = true
				urlInput.value = imageValue
			}
		}
		updateBlur() // Ensure blur state is correctly set on initialization
	}

	// Apply selected image and close modal
	applyImage.addEventListener("click", () => {
		// Get the checked radio
		const selectedRadio = document.querySelector(".image-card__radio:checked")

		// If the URL radio is checked
		if (urlRadio.checked) {
			const imageUrl = urlInput.value.trim()
			if (imageUrl) {
				// Update the value of the hidden input with the URL
				imageInput.value = imageUrl
			}
		} else if (selectedRadio) {
			// Get the selected image of the checked radio
			const selectedImage = selectedRadio.closest(".image-card__img-wrapper").querySelector(".image-card__img")

			// Update the value of the hidden input
			// Get the selected image source attribute
			const selectedImageSource = selectedImage.getAttribute("src")
			// If the source isn't the photo-off-icon set the selected image
			imageInput.value = selectedImageSource.startsWith("https") ? "" : selectedImageSource
		}

		// Modal gets closed by handleConfirm in openModal
	})

	// Add event listener to all radio buttons to update blur effect
	radios.forEach((radio) => {
		radio.addEventListener("change", updateBlur)
	})

	// Add event listener to the URL radio button to update blur effect
	urlRadio.addEventListener("change", updateBlur)

	// Initialize the selection when the function is called
	initializeSelection()
}
