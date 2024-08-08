// Define the lists handler
const listsHandler = (editor, handleInput, prefix) => {
	const caretPosition = editor.selectionStart

	// Check for existing list context
	const existingLine = editor.value.substr(0, caretPosition).split("\n").pop()
	const existingPrefix = existingLine.match(/^(\s*)[*+-]|\d+\./)

	if (existingPrefix) {
		// Continue existing list
		prefix = `\n${prefix}`
		//const indentation = existingPrefix[1] // Extract indentation spaces
		//prefix = `\n${indentation + prefix}`
	} else {
		// Start a new list
		prefix = prefix
		//prefix = "  " + prefix // Add initial indentation
	}

	// Insert the prefix at the caret position
	editor.value = editor.value.substring(0, caretPosition) + prefix + editor.value.substring(caretPosition)

	// Move the caret to the end of the inserted text
	editor.selectionStart = caretPosition + prefix.length
	editor.selectionEnd = caretPosition + prefix.length

	// Focus in the editor at the current position
	editor.focus()

	// Update preview after modification
	handleInput()
}

// TO BE IMPROVED FOR MULTI-LEVEL LISTS!
export const handleLists = (editor, handleInput) => {
	editor.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const existingPrefix = editor.value
				.substr(0, editor.selectionStart)
				.split("\n")
				.pop()
				.match(/^(\s*)[*+-]|\d+\./)

			if (existingPrefix) {
				event.preventDefault() // Prevent the default Enter key behavior
				listsHandler(editor, handleInput, `${existingPrefix[0]} `)
			}
		}
	})
}
