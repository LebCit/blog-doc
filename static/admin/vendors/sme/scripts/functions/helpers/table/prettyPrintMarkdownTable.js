// Default formatting options
const defaultOptions = {
	padding: 1, // Padding between cell content and cell borders
	minimumColumnWidth: 5, // Minimum width for each column
}

/**
 * Pretty prints a Markdown table with customizable options.
 * @param {string} markDownTable - The input Markdown table.
 * @param {Object} options - Formatting options (padding, minimumColumnWidth).
 * @returns {string} - The formatted Markdown table.
 */
const prettyPrint = (markDownTable, options) => {
	// Formatting options and regular expression for separator line detection.
	let padding
	let minimumColumnWidth
	const separatorLineRegex = /^[\- :]*$/

	// Variables to store the intermediate and final results during table formatting.
	let originalText = markDownTable // The original Markdown table content.
	let itemArray // 2D array representing the parsed Markdown table.
	let dividerRow = [] // Array representing the alignment indicators in the divider row.
	let maxItemsInRow // Maximum number of items in a row.
	let columnMaxLength = [] // Array to store the maximum length for each column.
	let formattedLines = [] // Array to store the formatted lines of the Markdown table.

	// Set formatting options based on user input or defaults.
	const setOptions = (options) => {
		// Set padding to user-provided value or use default.
		padding = options?.padding || defaultOptions.padding
		// Set minimum column width to user-provided value or use default.
		minimumColumnWidth = options?.minimumColumnWidth || defaultOptions.minimumColumnWidth
	}

	// Parse the input Markdown table and prepare it for formatting.
	const setItemArray = () => {
		itemArray = originalText
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0) // remove empty lines
			.map(
				(line) =>
					line
						.replace(/^\|/, "") // remove leading pipe
						.replace(/\|$/, "") // remove trailing pipe
						.split("|") // split into columns
						.map((item) => item.trim()) // trim each column
			)
	}

	// Checks if the second line is a divider row; if so, separates it from the itemArray.
	const isLineADividerRow = (lineNumber) => {
		return itemArray[lineNumber]?.every((element) => separatorLineRegex.test(element)) ?? false
	}

	// Determines the maximum number of items in a row.
	const setMaxItemsInRow = () => {
		maxItemsInRow = Math.max(...itemArray.map((line) => line.length))
	}

	// Determines the maximum length for each column.
	const setColumnMaxLength = () => {
		itemArray.forEach((line) => {
			line.forEach((item, i) => {
				if (item.length > (columnMaxLength[i] ?? 0)) {
					columnMaxLength[i] = item.length
				}
			})
		})
	}

	// Generates the array of formatted lines for the Markdown table.
	const setFormattedLines = () => {
		formattedLines = itemArray.map(prettyPrintLine)
	}

	// Formats a line for the Markdown table.
	const prettyPrintLine = (line) => {
		let formattedLine = "|"
		for (let i = 0; i < maxItemsInRow; i++) {
			const item = line[i] ?? ""
			// Calculate the width of the column, considering padding and minimum width.
			const widthOfColumn = Math.max(columnMaxLength[i] + padding, minimumColumnWidth)
			// Pad the item and concatenate it to the formatted line.
			formattedLine += item.padEnd(widthOfColumn, " ") + "|"
		}
		return formattedLine
	}

	// Generates a separator line for the Markdown table.
	const generateSeparatorLine = () => {
		let getPrefixPostfix = (char) => (char === ":" ? ":" : " ")

		let line = "|"
		for (let i = 0; i < maxItemsInRow; i++) {
			let divider = dividerRow[i] ?? ""
			let formattedDivider = ""
			// Determine the alignment indicators for the divider.
			formattedDivider += getPrefixPostfix(divider[0] ?? "")
			// Calculate the width of the column, considering padding and minimum width.
			let widthOfColumn = Math.max(columnMaxLength[i] + padding, minimumColumnWidth) - 1
			// Pad the divider and concatenate it to the formatted line.
			formattedDivider = formattedDivider.padEnd(widthOfColumn, "-")
			// Add alignment indicators to the end of the formatted divider.
			formattedDivider += getPrefixPostfix(divider[divider.length - 1] ?? "")
			line += formattedDivider + "|"
		}
		return line
	}

	// Set formatting options based on user input or defaults.
	setOptions(options)

	// Parse the input Markdown table and prepare it for formatting.
	setItemArray()

	// Check if the second line is a divider row; if so, separate it from the itemArray.
	if (isLineADividerRow(1)) {
		dividerRow = itemArray.splice(1, 1)[0]
	}

	// Determine the maximum number of items in a row.
	setMaxItemsInRow()

	// Determine the maximum length for each column.
	setColumnMaxLength()

	// Generate the array of formatted lines for the Markdown table.
	setFormattedLines()

	// If there is more than one line in the formatted table, insert a separator line.
	if (formattedLines.length > 1) {
		formattedLines.splice(1, 0, generateSeparatorLine())
	}

	// Join the formatted lines into a single string and return the result.
	return formattedLines.join("\n")
}

export { prettyPrint }
