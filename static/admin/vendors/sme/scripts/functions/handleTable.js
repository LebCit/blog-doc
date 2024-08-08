import { tableHTML } from "./helpers/table/tableHTML.js"
import { manageTable } from "./helpers/table/manageTable.js"
import { prettyPrint } from "./helpers/table/prettyPrintMarkdownTable.js"
import { convertTableToMarkdown } from "./helpers/table/convertTableToMarkdown.js"

export const handleTable = async (editor, handleInput) => {
	const selectionStart = editor.selectionStart
	const selectionEnd = editor.selectionEnd
	const selectedText = editor.value.substring(selectionStart, selectionEnd)

	const { value: tableValues } = await Swal.fire({
		title: selectedText ? "Update table" : "Create a table",
		html: tableHTML(selectedText),
		grow: "row", // popup should grow to fill the available width.
		allowOutsideClick: false, // user can't dismiss the popup by clicking outside it.
		showCloseButton: true,
		focusConfirm: false, // focus the first element in tab order instead of "Confirm"-button by default.
		returnFocus: false, // don't return the focus to the element that invoked the modal after the modal is closed.
		didOpen: () => {
			if (selectedText) {
				const table = document.getElementById("sme-table-element")
				const cells = table.querySelectorAll("th, td")
				cells.forEach((cell) => {
					cell.contentEditable = true // Enable editing
				})
			}
			// Call the function to initialize event listeners
			manageTable("sme-table-element")
		},
		preConfirm: () => {
			return convertTableToMarkdown("sme-table-element")
		},
		confirmButtonColor: "var(--sme-gray-9)",
		confirmButtonText: selectedText ? "Update table" : "Insert table",
	})

	if (tableValues) {
		const markdownTableSeparator = "\n***\n" // <hr />

		// Update editor value
		editor.value =
			editor.value.substring(0, selectionStart) +
			prettyPrint(tableValues) +
			markdownTableSeparator +
			editor.value.substring(selectionEnd)

		// Calculate the new cursor position
		const newCursorPosition = selectionStart + prettyPrint(tableValues).length + markdownTableSeparator.length

		// Set cursor position after insertion
		editor.setSelectionRange(newCursorPosition, newCursorPosition)

		// Focus in the editor at the current position
		editor.focus()

		// Update preview after modification
		handleInput()
	}
}
