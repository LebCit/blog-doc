import { marked } from "https://cdn.jsdelivr.net/npm/marked@11.1.1/+esm"
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.0.8/+esm"

const isMarkdownTable = (text) => {
	// Regular expression to match Markdown table syntax
	const tableRegex = /((\r?\n){2}|^)([^\r\n]*\|[^\r\n]*(\r?\n)?)+(?=(\r?\n){2}|$)/gm
	return tableRegex.test(text)
}

export const tableHTML = (selectedText, html) => {
	if (isMarkdownTable(selectedText)) {
		let table = DOMPurify.sanitize(marked.parse(selectedText))
		table = table.replace("<table>", `<table id="sme-table-element" tabindex=0 role="grid">`)

		html = `
			<sme-table data-sm="1column gap">
				<sme-table-actions data-sm="4column">
					<button data-sm="center" id="add-column" class="sme-md-btn" title="Add Column"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-column-insert-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Add Column</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z" /><path d="M15 12l4 0" /><path d="M17 10l0 4" /></svg></button>
					<button data-sm="center" id="remove-column" class="sme-md-btn" title="Remove Column"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-column-remove" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Remove Column</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z" /><path d="M16 10l4 4" /><path d="M16 14l4 -4" /></svg></button>
					<button data-sm="center" id="add-row" class="sme-md-btn" title="Add Row"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-row-insert-bottom" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Add Row</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z" /><path d="M12 15l0 4" /><path d="M14 17l-4 0" /></svg></button>
					<button data-sm="center" id="remove-row" class="sme-md-btn" title="Remove Row"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-row-remove" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Remove Row</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z" /><path d="M10 16l4 4" /><path d="M10 20l4 -4" /></svg></button>
				</sme-table-actions>

				<sme-table-container data-sm="center">
					${table}
				</sme-table-container>
			</sme-table>
		`
	} else {
		html = `
			<sme-table data-sm="1column gap">
				<sme-table-actions data-sm="4column">
					<button data-sm="center" id="add-column" class="sme-md-btn" title="Add Column"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-column-insert-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Add Column</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z" /><path d="M15 12l4 0" /><path d="M17 10l0 4" /></svg></button>
					<button data-sm="center" id="remove-column" class="sme-md-btn" title="Remove Column"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-column-remove" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Remove Column</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z" /><path d="M16 10l4 4" /><path d="M16 14l4 -4" /></svg></button>
					<button data-sm="center" id="add-row" class="sme-md-btn" title="Add Row"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-row-insert-bottom" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Add Row</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z" /><path d="M12 15l0 4" /><path d="M14 17l-4 0" /></svg></button>
					<button data-sm="center" id="remove-row" class="sme-md-btn" title="Remove Row"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-row-remove" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>Remove Row</title><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z" /><path d="M10 16l4 4" /><path d="M10 20l4 -4" /></svg></button>
				</sme-table-actions>

				<sme-table-container data-sm="center">
					<table id="sme-table-element" tabindex=0 role="grid">
						<thead>
							<tr></tr>
						</thead>
						<tbody></tbody>
					</table>
				</sme-table-container>
			</sme-table>
		`
	}

	return html
}
