// Function to clear the editor from its content
export const handleClearEditor = (editor, handleInput) => {
	// Update editor value
	editor.value = ""

	// Focus in the editor at the current position
	editor.focus()

	// Update preview after modification
	handleInput()
}
