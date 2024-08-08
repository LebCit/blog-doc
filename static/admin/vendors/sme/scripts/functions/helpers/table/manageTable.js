export const manageTable = (tableElement) => {
	// Get references to table elements
	const table = document.getElementById(tableElement)
	const thead = table.querySelector("thead")
	const tbody = table.querySelector("tbody")

	// Track selected column and row indices (initially none selected)
	let selectedColumnIndex = -1
	let selectedRowIndex = -1

	// Event listeners for column and row manipulation

	// Add column button
	document.getElementById("add-column").addEventListener("click", () => {
		// Create new header cell and append to table header
		const newHeader = document.createElement("th")
		newHeader.textContent = "Col"
		thead.querySelector("tr").appendChild(newHeader)

		// Create new cells for each row in the table body and append
		const newCells = tbody.querySelectorAll("tr")
		newCells.forEach((row) => {
			const newCell = document.createElement("td")
			row.appendChild(newCell)
		})

		// Make newly added cells editable
		makeCellsEditable()
	})

	// Add row button
	document.getElementById("add-row").addEventListener("click", () => {
		// Create new row and cells for each header
		const newRow = document.createElement("tr")
		const headerCells = thead.querySelectorAll("th")
		headerCells.forEach((cell) => {
			const newCell = document.createElement("td")
			newCell.textContent = "Cell"
			newRow.appendChild(newCell)
		})

		// Append new row to table body
		tbody.appendChild(newRow)

		// Make newly added cells editable
		makeCellsEditable()
	})

	// Table click handler to handle column/row selection
	table.addEventListener("click", (event) => {
		const cell = event.target.closest("th") || event.target.closest("td")
		if (cell) {
			// Get clicked cell's index within its row/column
			const cellIndex = Array.from(cell.parentNode.children).indexOf(cell)
			const rowIndex = Array.from(table.rows).indexOf(cell.parentNode)

			// Set selected column or row index based on cell type
			if (cell.tagName === "TH") {
				setSelectedColumn(cellIndex)
				setSelectedRow(-1) // Deselect any row
			} else {
				setSelectedRow(rowIndex)
				setSelectedColumn(-1) // Deselect any column
			}
		}
	})

	// Functions to manage selection highlighting (placeholders)
	const setSelectedColumn = (index) => {
		selectedColumnIndex = index
		// TODO: Update visual indicator for selected column (e.g., highlight)
		if (index !== -1) {
			// Update visual indicator for selected column (e.g., highlight)
		} else {
			// Remove visual indicator for any previously selected column
		}
	}

	const setSelectedRow = (index) => {
		selectedRowIndex = index
		// TODO: Update visual indicator for selected row (e.g., highlight)
		if (index !== -1) {
			// Update visual indicator for selected row (e.g., highlight)
		} else {
			// Remove visual indicator for any previously selected row
		}
	}

	// Remove column button
	document.getElementById("remove-column").addEventListener("click", () => {
		if (selectedColumnIndex !== -1) {
			removeColumn(selectedColumnIndex)
			setSelectedColumn(-1) // Deselect after removal
		} else {
			alert("No column selected.")
		}
	})

	// Remove row button
	document.getElementById("remove-row").addEventListener("click", () => {
		if (selectedRowIndex !== -1) {
			removeRow(selectedRowIndex)
			setSelectedRow(-1) // Deselect after removal
		} else {
			alert("No row selected.")
		}
	})

	// Helper functions for column/row removal
	const removeColumn = (index) => {
		const headerCell = thead.querySelector(`tr th:nth-child(${index + 1})`)
		const cells = tbody.querySelectorAll(`tr td:nth-child(${index + 1})`)

		headerCell.remove()
		cells.forEach((cell) => cell.remove())
	}

	const removeRow = (index) => {
		const row = tbody.querySelector(`tr:nth-child(${index})`)
		row.remove()
	}

	// Make cells editable
	const makeCellsEditable = () => {
		const cells = table.querySelectorAll("th, td")
		cells.forEach((cell) => {
			cell.contentEditable = true // Enable editing
		})
	}
}
