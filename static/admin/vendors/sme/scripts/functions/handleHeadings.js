// Define the heading button handler
export const handleHeadings = (editor, handleInput, level) => {
	const selectionStart = editor.selectionStart
	const selectionEnd = editor.selectionEnd
	const selectedText = editor.value.substring(selectionStart, selectionEnd)

	// Determine the heading syntax based on the specified level
	const headingSyntax = `${"#".repeat(level)}`

	let newText

	if (selectedText) {
		// Wrap selected text with heading syntax
		newText = `\n${headingSyntax} ${selectedText}  \n`
	} else {
		// Insert a heading with the new text at cursor position
		newText = `\n${headingSyntax} Heading${level} text here!  \n`
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
