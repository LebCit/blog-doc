import { openModal } from "./openModal.js"

export function sortAndSearchTable(tableId, searchInputId) {
	const searchInput = document.getElementById(searchInputId)
	const table = document.getElementById(tableId)
	const headers = table.querySelectorAll("th")
	const paginationControls = document.getElementById("paginationControls")

	const rowsPerPage = 5
	let currentPage = 1
	let allRows = Array.from(table.querySelectorAll("tbody tr"))
	let filteredRows = [...allRows]

	headers.forEach((header, index) => {
		if (!header.classList.contains("no-sort")) {
			const sortButtons = header.querySelectorAll(".sort-button")
			sortButtons[0].addEventListener("click", () =>
				sortTable(index, header.getAttribute("data-sort-type"), "asc")
			)
			sortButtons[1].addEventListener("click", () =>
				sortTable(index, header.getAttribute("data-sort-type"), "desc")
			)
		}
	})

	function sortTable(columnIndex, sortType, direction) {
		const isAscending = direction === "asc"

		filteredRows.sort((rowA, rowB) => {
			const cellA = rowA.cells[columnIndex].innerText.trim()
			const cellB = rowB.cells[columnIndex].innerText.trim()

			if (sortType === "date") {
				const dateA = new Date(cellA)
				const dateB = new Date(cellB)
				return isAscending ? dateA - dateB : dateB - dateA
			} else {
				return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA)
			}
		})

		filteredRows.forEach((row) => table.tBodies[0].appendChild(row))
		displayPage(currentPage)
	}

	function searchTable() {
		searchInput.addEventListener("keyup", () => {
			const filter = searchInput.value.toLowerCase()
			filteredRows = allRows.filter((row) => {
				const cells = Array.from(row.cells).filter((cell) => !cell.classList.contains("no-sort"))
				return cells.some((cell) => cell.innerText.toLowerCase().includes(filter))
			})

			currentPage = 1 // Reset to the first page after searching
			if (filteredRows.length > rowsPerPage) {
				paginate(filteredRows)
			} else {
				paginationControls.innerHTML = "" // Clear pagination controls if not needed
				displayPage(currentPage)
			}
		})
	}

	function displayPage(page) {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		allRows.forEach((row) => (row.style.display = "none"))
		filteredRows.slice(start, end).forEach((row) => (row.style.display = ""))
	}

	function paginate(rows) {
		const totalPages = Math.ceil(rows.length / rowsPerPage)

		function updatePaginationControls() {
			paginationControls.innerHTML = ""

			for (let i = 1; i <= totalPages; i++) {
				const pageButton = document.createElement("button")
				pageButton.textContent = i
				pageButton.classList.add("page-button")
				if (i === currentPage) pageButton.classList.add("active")
				pageButton.addEventListener("click", () => {
					currentPage = i
					displayPage(currentPage)
					updatePaginationControls()
				})
				paginationControls.appendChild(pageButton)
			}
		}

		displayPage(currentPage)
		updatePaginationControls()
	}

	searchTable()

	// Initialize pagination with all rows
	paginate(allRows)

	document.querySelectorAll(".delete-button").forEach((button) => {
		button.addEventListener("click", function () {
			const row = this.closest("tr")
			const titleCell = row.cells[0]
			const anchor = titleCell.querySelector("a")
			const anchorText = anchor.innerText
			const filePath = anchor.dataset.path

			const deleteModal = document.getElementById("delete-file-modal")
			const fileTitle = deleteModal.querySelector("h3")
			const deleteFileFormInput = deleteModal.querySelector("form > input")

			fileTitle.innerText = anchorText
			deleteFileFormInput.setAttribute("value", filePath)

			openModal("delete-file-modal")
		})
	})
}
