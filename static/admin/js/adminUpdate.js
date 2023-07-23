const fileString = document.getElementById("file")
const file = JSON.parse(fileString.textContent)
fileString.remove()

const editor = new toastui.Editor({
	autofocus: false,
	el: document.querySelector("#editor"),
	frontMatter: true,
	previewStyle: "tab",
	height: "500px",
	initialEditType: "markdown",
	hideModeSwitch: true,
})

// SET EDITOR CONTENT TO FILE CONTENT
editor.setMarkdown(file[1].content)

// MOVE CURSOR TO THE BEGINNING OF THE EDITOR
editor.moveCursorToStart()

const fileForm = document.getElementById("file-form")
const required = fileForm.querySelectorAll("input[required]")
const submitButton = document.getElementById("submit-button")

submitButton.addEventListener("click", () => {
	let arr = []
	required.forEach((el) => {
		arr.push(el.value)
	})

	if (arr.includes("")) {
		required.forEach((el) => {
			if (el.validity.valueMissing) {
				el.previousElementSibling.style.display = "block"
			}
			el.addEventListener("input", () => {
				if (el.validity.valueMissing) {
					el.previousElementSibling.style.display = "block"
				} else {
					el.previousElementSibling.style.display = "none"
				}
			})
		})
	} else {
		Swal.fire({
			title: `Update "${file[1].frontmatter.title}" ?!`,
			html: `By clicking on <b>Update</b>,<br><b>"${file[1].frontmatter.title}"</b> will be updated,<br>with the provided data.`,
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Update",
			didOpen: () => {
				const mdContent = editor.getMarkdown()
				const textArea = document.getElementById("file-contents")
				textArea.value += mdContent
				const b = Swal.getConfirmButton()
				b.type = "button"
				b.addEventListener("click", () => {
					fileForm.submit()
				})
			},
		})
	}
})
