import { handleClearEditor } from "./handleClearEditor.js"
import { handleTextFormat } from "./handleTextFormat.js"
import { handleHeadings } from "./handleHeadings.js"
import { preMadeLists } from "./preMadeLists.js"
import { handleTable } from "./handleTable.js"
import { handleLink } from "./handleLink.js"

export const setupButtonHandlers = (editor, handleInput) => {
	// Creating an empty Map to store button handlers (button types and their associated functions)
	const buttonHandlers = new Map()

	// Define an array of button types and handlers
	const buttonTypeHandlerPairs = [
		["heading1", () => handleHeadings(editor, handleInput, 1)],
		["heading2", () => handleHeadings(editor, handleInput, 2)],
		["heading3", () => handleHeadings(editor, handleInput, 3)],
		["heading4", () => handleHeadings(editor, handleInput, 4)],
		["heading5", () => handleHeadings(editor, handleInput, 5)],
		["heading6", () => handleHeadings(editor, handleInput, 6)],
		["bold", () => handleTextFormat(editor, handleInput, (text) => `**${text.trim()}** `, "**Bold text here!** ")],
		[
			"italic",
			() => handleTextFormat(editor, handleInput, (text) => ` _${text.trim()}_ `, " _Italic text here!_ "),
		],
		[
			"underline",
			() =>
				handleTextFormat(
					editor,
					handleInput,
					(text) => `<ins>${text.trim()}</ins> `,
					"<ins>Underline text here!</ins> "
				),
		],
		[
			"strikethrough",
			() =>
				handleTextFormat(
					editor,
					handleInput,
					(text) => `<s>${text.trim()}</s> `,
					"<s>Strikethrough text here!</s> "
				),
		],
		[
			"blockquote",
			() => handleTextFormat(editor, handleInput, (text) => `\n> ${text}\n\n`, `\n> Quote text here!\n\n`),
		],
		["horizontalRule", () => handleTextFormat(editor, handleInput, (text) => `\n***\n${text.trim()} `, `\n***\n`)],
		["inlineCode", () => handleTextFormat(editor, handleInput, (text) => `\`${text}\` `, `\`Inline code here!\` `)],
		[
			"blocOfCode",
			() =>
				handleTextFormat(
					editor,
					handleInput,
					(text) => `\n\`\`\`\n${text}\n\`\`\`\n\n`,
					`\n\`\`\`\nBloc of code here!\n\`\`\`\n\n`
				),
		],
		["link", () => handleLink(editor, handleInput, "link")],
		["image", () => handleLink(editor, handleInput, "image")],
		["bulleted", () => preMadeLists(editor, handleInput, "bullet")],
		["numbered", () => preMadeLists(editor, handleInput, "number")],
		["bulletedMultiLevel", () => preMadeLists(editor, handleInput, "bulletMultiLevel")],
		["numberedMultiLevel", () => preMadeLists(editor, handleInput, "numberMultiLevel")],
		["todo", () => preMadeLists(editor, handleInput, "todo")],
		["table", () => handleTable(editor, handleInput)],
		["clear", () => handleClearEditor(editor, handleInput)],
	]

	// Populate the Map with button types and handlers (set entries using a loop)
	buttonTypeHandlerPairs.forEach(([type, handler]) => {
		buttonHandlers.set(type, handler)
	})

	return buttonHandlers
}
