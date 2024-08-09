import { openModal } from "./openModal.js"

document.addEventListener("DOMContentLoaded", () => {
	const menu = document.getElementById("menu")
	const saveOrderButton = document.getElementById("saveOrder")
	const addItemButton = document.getElementById("addItem")
	let draggedItem = null
	let itemToRemove = null // Track the item to be removed

	function addDragAndDropHandlers() {
		const items = menu.querySelectorAll(".menu-item")

		items.forEach((item) => {
			const dragHandle = item.querySelector(".drag-handle")
			dragHandle.addEventListener("dragstart", handleDragStart)
			item.addEventListener("dragover", handleDragOver)
			item.addEventListener("dragleave", handleDragLeave)
			item.addEventListener("drop", handleDrop)
			dragHandle.addEventListener("dragend", handleDragEnd)
			item.querySelector(".expandable-summary").addEventListener("click", toggleExpandableContent)
		})
	}

	function handleDragStart(e) {
		draggedItem = this.parentElement.parentElement
		setTimeout(() => {
			draggedItem.classList.add("dragging")
		}, 0)
	}

	function handleDragOver(e) {
		e.preventDefault()
		const afterElement = getDragAfterElement(menu, e.clientY)
		if (afterElement == null) {
			menu.appendChild(draggedItem)
		} else {
			menu.insertBefore(draggedItem, afterElement)
		}
	}

	function handleDragLeave(e) {
		e.preventDefault()
		this.classList.remove("dragging")
	}

	function handleDrop(e) {
		e.preventDefault()
		this.classList.remove("dragging")
	}

	function handleDragEnd() {
		this.parentElement.parentElement.classList.remove("dragging")
		draggedItem = null
	}

	function getDragAfterElement(container, y) {
		const draggableElements = [...container.querySelectorAll(".menu-item:not(.dragging)")]

		return draggableElements.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect()
				const offset = y - box.top - box.height / 2
				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child }
				} else {
					return closest
				}
			},
			{ offset: Number.NEGATIVE_INFINITY }
		).element
	}

	function toggleExpandableContent(e) {
		const content = this.parentElement.nextElementSibling
		const expanded = this.getAttribute("aria-expanded") === "true"
		this.setAttribute("aria-expanded", !expanded)
		content.classList.toggle("active")
	}

	function removeItem(event) {
		itemToRemove = event.target.closest(".menu-item") // Track the item to be removed
		openModal("delete-menu-item-modal") // Open the modal

		const deleteMenuItemModalH3 = document.querySelector("h3")
		itemToRemove.dataset.value == ""
			? (deleteMenuItemModalH3.innerText = "Menu item title")
			: (deleteMenuItemModalH3.innerText = itemToRemove.dataset.value)
	}

	function addItem() {
		const li = document.createElement("li")
		li.classList.add("menu-item")
		li.dataset.key = ""
		li.dataset.value = ""
		li.innerHTML = `
            <div class="menu-item-header">
                <span class="drag-handle" draggable="true">☰</span>
                <button class="expandable-summary" aria-expanded="false">New Item</button>
            </div>
            <div class="expandable-content form-group">
                <label>Link Title: <input type="text" class="link-title"></label>
                <label>Link Target: <input type="text" class="link-target"></label>
                <button class="remove-item bd-button-red">Remove</button>
            </div>
        `
		menu.appendChild(li)
		addDragAndDropHandlers()
		li.querySelector(".remove-item").addEventListener("click", removeItem)
		li.querySelector(".expandable-summary").addEventListener("click", toggleExpandableContent)
	}

	saveOrderButton.addEventListener("click", async () => {
		const newOrder = {}
		let isValid = true // Flag to check if the menu is valid

		menu.querySelectorAll(".menu-item").forEach((item) => {
			const key = item.querySelector(".link-target").value.trim()
			const value = item.querySelector(".link-title").value.trim()

			if (!key || !value) {
				isValid = false
				return // Break out of the loop if any key or value is empty
			}

			newOrder[key] = value
		})

		// Check if the menu is valid
		if (!isValid) {
			openModal("validation-error-modal") // Open the validation error modal
			return // Prevent the save operation if the menu is not valid
		}

		console.log("New Order:", newOrder)

		// Send the new order to the backend
		try {
			const response = await fetch("/bd-admin/update/menu", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newOrder),
			})

			// Check if the response is OK (status code 200-299)
			if (response.ok) {
				const data = await response.json()
				console.log("Menu order saved:", data)

				// Redirect to the desired page
				window.location.href = "/bd-admin/set/menu"
			} else {
				console.error("Failed to save menu order. Status:", response.status)
			}
		} catch (error) {
			console.error("Error saving menu order:", error)
		}
	})

	menu.querySelectorAll(".remove-item").forEach((button) => {
		button.addEventListener("click", removeItem)
	})

	addItemButton.addEventListener("click", addItem)

	addDragAndDropHandlers()

	// Modal confirmation logic
	const deleteModal = document.getElementById("delete-menu-item-modal")
	const confirmButton = deleteModal.querySelector(".confirm")
	const cancelButton = deleteModal.querySelector(".cancel")

	confirmButton.addEventListener("click", () => {
		if (itemToRemove) {
			itemToRemove.remove() // Remove the item if confirmed
			itemToRemove = null // Reset the itemToRemove
		}
		/* deleteModal.style.display = "none" // Close the modal
		document.body.classList.remove("modal-open") */
	})

	cancelButton.addEventListener("click", () => {
		/* deleteModal.style.display = "none" // Close the modal
		document.body.classList.remove("modal-open") */
		itemToRemove = null // Reset the itemToRemove
	})
})
