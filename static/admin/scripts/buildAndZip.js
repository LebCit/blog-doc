import { openModal } from "./openModal.js"

/**
 * Adds an event listener to all elements with the given class that triggers a file download
 * from the server when clicked. Uses a fixed URL for fetching the file.
 *
 * @param {string} className - The class name of the elements to attach the event listener to.
 */
export function buildAndZip(className) {
	document.querySelectorAll(`.${className}`).forEach((button) => {
		button.addEventListener("click", async () => {
			openModal("build-await-modal")

			try {
				const response = await fetch("/build")
				if (!response.ok) {
					throw new Error(response.statusText)
				}

				// Read the *Content-Disposition* header to get the original filename given by the server
				const header = response.headers.get("Content-Disposition")
				if (!header) {
					throw new Error("Content-Disposition header is missing")
				}

				const parts = header.split(";")
				const filenamePart = parts.find((part) => part.trim().startsWith("filename="))
				if (!filenamePart) {
					throw new Error("Filename is missing in Content-Disposition header")
				}

				const filename = filenamePart.split("=")[1].replace(/"/g, "")
				if (!filename) {
					throw new Error("Filename is empty in Content-Disposition header")
				}

				// Get the blob from the server response
				const blob = await response.blob()
				if (blob) {
					const url = window.URL.createObjectURL(blob)
					const a = document.createElement("a")
					a.href = url
					a.download = filename
					document.body.appendChild(a)
					a.click()

					const buildAwaitModal = document.getElementById("build-await-modal")
					const cancelButton = buildAwaitModal.querySelector(".cancel")
					cancelButton.click()

					window.URL.revokeObjectURL(url) // Clean up the URL object
					a.remove()
				}
			} catch (error) {
				console.error(`Error: ${error.message}`)
			}
		})
	})
}
