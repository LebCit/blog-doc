const siteConfigForm = document.getElementById("site-config-form")
const required = siteConfigForm.querySelectorAll("*[required]")
const siteURL = siteConfigForm.querySelector("#site-url")
const postsPerPage = siteConfigForm.querySelector("#posts-per-page")
const submitConfigButton = document.getElementById("submit-config-button")

submitConfigButton.addEventListener("click", () => {
	let arr = []
	required.forEach((el) => {
		arr.push(el.value)
	})

	if (arr.includes("")) {
		required.forEach((el) => {
			if (el.validity.valueMissing) {
				el.nextElementSibling.style.display = "block"
			}
			el.addEventListener("input", () => {
				if (el.validity.valueMissing) {
					el.nextElementSibling.style.display = "block"
				} else {
					el.nextElementSibling.style.display = "none"
				}
			})
		})
	} else if (!siteURL.value.startsWith("https")) {
		siteURL.previousElementSibling.style.display = "block"
		siteURL.addEventListener("input", (e) => {
			if (!e.target.value.startsWith("https")) {
				siteURL.previousElementSibling.style.display = "block"
			} else {
				siteURL.previousElementSibling.style.display = "none"
			}
		})
	} else if (postsPerPage.valueAsNumber < 1 || postsPerPage.valueAsNumber > 10) {
		postsPerPage.previousElementSibling.style.display = "block"
		postsPerPage.addEventListener("input", (e) => {
			if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 10) {
				postsPerPage.previousElementSibling.style.display = "block"
			} else {
				postsPerPage.previousElementSibling.style.display = "none"
			}
		})
	} else {
		Swal.fire({
			title: "Modify The Configuration ?!",
			html: `By clicking on <b>Modify</b>,<br>the <b>Configuration</b> will be modified !<br>Double check the footer copyright<br>if you have used HTML in it,<br>otherwise your app will break !`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Modify",
			didOpen: () => {
				const b = Swal.getConfirmButton()
				b.type = "button"
				b.addEventListener("click", () => {
					siteConfigForm.submit()
				})
			},
		})
	}
})
