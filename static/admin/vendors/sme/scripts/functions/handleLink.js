// Define the link and image buttons handler
export const handleLink = async (editor, handleInput, linkType) => {
	const selectionStart = editor.selectionStart
	const selectionEnd = editor.selectionEnd
	const selectedText = editor.value.substring(selectionStart, selectionEnd)

	const { value: formValues } = await Swal.fire({
		title: linkType === "link" ? "Add a link" : "Add an image",
		html: `
			<label for="sme-link-text">
				${linkType === "link" ? "Enter the link TEXT" : "Enter the image Alt Text"}
				<input
					id="sme-link-text"
					class="swal2-input"
					placeholder="${linkType === "link" ? "The link's TEXT goes here" : "Image Alt Text goes here"}"
					value="${selectedText ? selectedText : ""}"
				/>
			</label>
			<br />
			<label for="sme-link-url">
				${linkType === "link" ? "Enter the link URL" : "Enter the image URL"}
				<input
					id="sme-link-url"
					class="swal2-input"
					placeholder="${linkType === "link" ? "The link's URL goes here" : "Image's URL goes here"}"
				/>
			</label>
			<br />
			<label for="sme-link-title">
				${linkType === "link" ? "Optional link's title" : "Optional image's title"}
				<input id="sme-link-title" class="swal2-input" placeholder="Optional title goes here" />
			</label>
		`,
		showCloseButton: true,
		focusConfirm: false, // focus the first element in tab order instead of "Confirm"-button by default.
		returnFocus: false, // don't return the focus to the element that invoked the modal after the modal is closed.
		preConfirm: () => {
			return [
				document.getElementById("sme-link-text").value,
				document.getElementById("sme-link-url").value,
				document.getElementById("sme-link-title").value,
			]
		},
		confirmButtonColor: "var(--sme-gray-9)",
		confirmButtonText: linkType === "link" ? "Add link" : "Add image",
	})

	if (formValues) {
		const textForLink = formValues[0].trim()
		const urlForLink = formValues[1].trim()
		const titleForLink = formValues[2].trim()

		let newText
		if (textForLink && urlForLink && titleForLink) {
			newText =
				linkType === "link"
					? `[${textForLink}](${urlForLink} "${titleForLink}")`
					: `![${textForLink}](${urlForLink} "${titleForLink}")`
		} else if (textForLink && urlForLink) {
			newText = linkType === "link" ? `[${textForLink}](${urlForLink})` : `![${textForLink}](${urlForLink})`
		} else if (textForLink) {
			newText = `${textForLink}`
		} else {
			newText = ""
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
}
