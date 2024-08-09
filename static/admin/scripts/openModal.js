let isModalOpen = false

export function openModal(modalId) {
	if (isModalOpen) return

	const modalOverlay = document.getElementById(modalId)
	const modal = modalOverlay.querySelector(".modal")
	const closeButton = modal.querySelector(".close")
	const cancelButton = modal.querySelector(".cancel")
	const confirmButton = modal.querySelector(".confirm")
	const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]
	const focusableContent = modal.querySelectorAll(focusableElements)
	const lastFocusableElement = focusableContent[focusableContent.length - 1]

	modalOverlay.style.display = "flex"
	document.body.classList.add("modal-open")
	firstFocusableElement.focus()
	isModalOpen = true

	function closeModal() {
		modalOverlay.style.display = "none"
		document.body.classList.remove("modal-open")
		document.removeEventListener("keydown", trapFocus)
		document.removeEventListener("keydown", handleEscape)
		modalOverlay.removeEventListener("click", handleClickOutside)
		closeButton.removeEventListener("click", closeModal)
		cancelButton.removeEventListener("click", closeModal)
		if (confirmButton) {
			confirmButton.removeEventListener("click", handleConfirm)
		}

		isModalOpen = false
	}

	function trapFocus(e) {
		const isTabPressed = e.key === "Tab" || e.keyCode === 9
		if (!isTabPressed) return

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus()
				e.preventDefault()
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus()
				e.preventDefault()
			}
		}
	}

	function handleEscape(e) {
		if (e.key === "Escape") {
			closeModal()
		}
	}

	function handleClickOutside(e) {
		if (e.target === modalOverlay) {
			closeModal()
		}
	}

	function handleConfirm(e) {
		e.preventDefault() // Prevent form submission if needed

		// Handle the confirm action
		if (this.getAttribute("form") !== null) {
			// If the confirm button has a form attribute,
			// submit the related form to the confirm button.
			this.form.submit()
		}

		closeModal()
	}

	closeButton.addEventListener("click", closeModal)
	cancelButton.addEventListener("click", closeModal)
	if (confirmButton) {
		confirmButton.addEventListener("click", handleConfirm)
	}

	document.addEventListener("keydown", handleEscape)
	document.addEventListener("keydown", trapFocus)
	modalOverlay.addEventListener("click", handleClickOutside)
}
