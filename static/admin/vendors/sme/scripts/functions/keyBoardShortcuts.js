import { setupButtonHandlers } from "./setupButtonHandlers.js"

export const keyBoardShortcuts = (editor, handleInput) => {
	// This object maps keyboard shortcuts to their corresponding formatting types.
	const keyboardShortcuts = {
		b: "bold", // Applies bold formatting.
		i: "italic", // Applies italic formatting.
		u: "underline", // Applies underline formatting.
		s: "strikethrough", // Applies strikethrough formatting.
		h: "horizontalRule", // Inserts a horizontal rule.
		q: "blockquote", // Applies blockquote formatting.
		d: "inlineCode", // Applies inline code formatting.
		k: "blocOfCode", // Applies bloc of code formatting.
		l: "link", // Adds a link.
		I: "image", // Adds an image.
		T: "table", // Inserts a table.
		X: "clear", // Clears the editor's content.
	}

	const handlers = setupButtonHandlers(editor, handleInput)

	return (event) => {
		// Check if the Ctrl key is pressed and a mapped shortcut key was pressed.
		if (event.ctrlKey && keyboardShortcuts[event.key] && editor === document.activeElement) {
			try {
				// Get the formatting type for the pressed key.
				const formattingType = keyboardShortcuts[event.key]

				// Retrieve the appropriate formatting handler from the setupButtonHandlers function.
				// This function is expected to return a map of formatting types to their handlers.
				const handler = handlers.get(formattingType)

				// If a handler is found for the formatting type, execute it.
				if (handler) {
					handler()
					// Prevent the default browser behavior for the key event.
					event.preventDefault()
				} else {
					console.warn(`No handler found for formatting type: ${formattingType}`)
				}
			} catch (error) {
				console.error("Error occurred while handling keyboard shortcut:", error)
				// Optionally, provide user feedback or attempt recovery actions here
			}
		}
	}
}
