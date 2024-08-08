// Define the text format handler
export const handleTextFormat = (editor, handleInput, wrapSyntax, insertText) => {
	const selectionStart = editor.selectionStart
	const selectionEnd = editor.selectionEnd
	const selectedText = editor.value.substring(selectionStart, selectionEnd)

	let newText
	if (selectedText) {
		// Wrap selected text with text format syntax
		newText = `${wrapSyntax(selectedText)}`
	} else {
		// Insert formatted text
		newText = `${insertText}`
	}

	// Update editor value
	editor.value = editor.value.substring(0, selectionStart) + newText + editor.value.substring(selectionEnd)

	// Set cursor position after insertion
	editor.selectionStart = editor.selectionEnd = selectionStart + newText.length

	// Focus in the editor at the current position
	editor.focus()

	// Update preview after modification
	handleInput()
}
