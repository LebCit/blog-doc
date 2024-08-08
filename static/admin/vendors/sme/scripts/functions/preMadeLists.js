// Define the pre-made lists buttons handler
export const preMadeLists = (editor, handleInput, listType) => {
	const selectionStart = editor.selectionStart
	const selectionEnd = editor.selectionEnd
	const selectedText = editor.value.substring(selectionStart, selectionEnd)

	//
	let newText
	if (listType === "bullet") {
		// Insert a bulleted list
		newText = `\n+ item 1\n+ item 2\n+ item 3  \n`
	} else if (listType === "number") {
		// Insert a numbered list
		newText = `\n1. item 1\n2. item 2\n3. item 3  \n`
	} else if (listType === "bulletMultiLevel") {
		// Insert a multi level bulleted list
		newText = `\n+ item 1\n+ item 2\n  + level 1\n+ item 3\n  + level 1  \n    + level 2  \n`
	} else if (listType === "numberMultiLevel") {
		// Insert a multi level numbered list
		newText = `\n1. item 1\n2. item 2\n    1. level 1\n3. item 3\n    1. level 1  \n        2. level 2  \n`
	} else if (listType === "todo") {
		// Insert a todo list
		newText = `\n* [ ] item 1\n* [x] item 2  \n`
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
