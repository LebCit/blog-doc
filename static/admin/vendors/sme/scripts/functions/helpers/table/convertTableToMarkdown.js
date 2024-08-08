export const convertTableToMarkdown = (tableElement) => {
	// Get references to table elements
	const table = document.getElementById(tableElement)

	// Extract headers from the table's thead element
	const headers = Array.from(table.querySelectorAll("thead th")).map((th) => th.textContent)

	// Extract rows and their cells from the table's tbody element
	const rows = Array.from(table.querySelectorAll("tbody tr")).map((tr) =>
		Array.from(tr.querySelectorAll("td")).map((td) => td.textContent)
	)

	// Construct the Markdown table string

	// Create the header row in Markdown format
	let markdownTable = `\n| ${headers.join(" | ")} |\n`

	// Create rows in Markdown format and join them with newline characters
	markdownTable += rows.map((row) => `| ${row.join(" | ")} |`).join("\n")

	// Return the generated Markdown table string
	return markdownTable
}
