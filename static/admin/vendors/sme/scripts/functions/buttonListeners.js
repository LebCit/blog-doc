import { setupButtonHandlers } from "./setupButtonHandlers.js"

export function setupButtonListeners(buttons, editor, handleInput) {
	// Iterate through each button in the provided buttons collection
	buttons.forEach((button) => {
		// Retrieve the button's type from its data attribute
		const buttonType = button.dataset.syntax

		// Attach a click event listener to the button
		button.addEventListener("click", () => {
			// Get the specific button type handler from setupButtonHandlers
			const handler = setupButtonHandlers(editor, handleInput).get(buttonType)

			// If a handler is found for the button type
			if (handler) {
				// Check if the button is within a dropdown menu
				const buttonInput = button.parentElement.previousElementSibling.previousElementSibling
				if (buttonInput && buttonInput.type === "checkbox") {
					// Close the dropdown by unchecking the checkbox
					buttonInput.checked = false
				}

				// Call the specific button handler to execute its action
				handler()
			}
		})
	})
}
