// Function to close other dropdowns when one is opened
export const handleDropdownToggle = (ancestor, checkboxes) => {
	// Ensure ancestor is a reference to the document element
	//ancestor = document

	// Find all dropdown checkboxes within the ancestor element
	checkboxes = ancestor.querySelectorAll(checkboxes)

	// Add a click event listener to the ancestor element
	ancestor.addEventListener("click", (e) => {
		// If the clicked element is a checkbox within a dropdown
		if (e.target.type === "checkbox") {
			// Close all other dropdowns by unchecking their checkboxes
			checkboxes.forEach((checkbox) => {
				if (checkbox !== e.target) {
					checkbox.checked = false
				}
			})
		}
	})
}
