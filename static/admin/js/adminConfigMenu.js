const menuLinks = document.getElementById("menuLinks")
const menuLinksObject = JSON.parse(menuLinks.textContent)
delete menuLinksObject.admin // Remove admin link `from menu configuration`
menuLinks.remove()

const container = document.getElementById("menu-links-accordion-container")
const template = document.getElementById("template")

// Remove a clone when it's removeLinkButton is clicked
function removeClone() {
	let clones = container.childNodes
	clones.forEach((clone) => {
		const removeLinkButton = clone.querySelector('[id^="remove-link_"]')

		removeLinkButton.addEventListener("click", () => {
			// Get the number of available clones
			let clonesCount = container.childElementCount
			// If the clones number is greater than 1 we can remove
			if (clonesCount > 1) {
				clone.remove()
			} else {
				removeLinkButton.classList.add("pure-button-disabled")
			}
		})
	})
}

let count = 0
// Display available menu links in the container
for (const link in menuLinksObject) {
	if (Object.hasOwn(menuLinksObject, link)) {
		count++

		// Create a clone from the firstElementChild of the template
		const clone = template.content.firstElementChild.cloneNode(true)
		// Add an id to each clone
		clone.id = `menuLink_${count}`
		// Add a data-id to each clone
		clone.dataset.id = `${count}`
		// Modify data-bs-target of each accordion button
		let accordionButton = clone.querySelector("button")
		accordionButton.dataset.bsTarget = `${accordionButton.dataset.bsTarget}_${count}`
		// Add link title before the end of each accordion button
		accordionButton.insertAdjacentHTML("beforeend", `<span class="ms-2">${menuLinksObject[link]}</span>`)

		// Select each element in the clone that has an id
		let cloneElWithId = clone.querySelectorAll("[id]")
		// Modify the id of each element in the clone
		cloneElWithId.forEach((el) => {
			el.id = `${el.id}_${count}`
		})

		// Select each element in the clone that has a for attribute
		let cloneElWithFor = clone.querySelectorAll("[for]")
		// Modify the for attribute of each element in the clone
		cloneElWithFor.forEach((el) => {
			el.htmlFor = `${el.htmlFor}_${count}`
		})

		// Get each input in the clone
		const linkTargetInput = clone.querySelector(`#link-target_${count}`)
		const linkTitleInput = clone.querySelector(`#link-title_${count}`)
		// Get each link value (key: value. The value is the title)
		const linkTitle = menuLinksObject[link]
		// Assign into the inputs the link and the linkTitle
		linkTargetInput.value = link
		linkTitleInput.value = linkTitle
		// Modify the name attribute of each input
		linkTargetInput.name = `menuLinks[${count}][${linkTargetInput.name}]`
		linkTitleInput.name = `menuLinks[${count}][${linkTitleInput.name}]`

		// Append the clone as a child to the container
		container.appendChild(clone)

		// Remove a clone when it's removeLinkButton is clicked
		removeClone()
	}
}

// Add a new clone at the end of the container when the add-new-menu-item button is clicked
const addNewMenuItem = document.getElementById("add-new-menu-item")
addNewMenuItem.addEventListener("click", () => {
	// Get the number of clones
	let clonesCount = container.childElementCount + 1
	// Get all remove link buttons
	let removeLinksButtons = container.querySelectorAll('[id^="remove-link_"]')
	// Enable the remove link button only if we have more than one clone
	if (clonesCount > 1) {
		removeLinksButtons.forEach((button) => {
			button.classList.remove("pure-button-disabled")
		})
	}

	// Get the highest id number of available clones
	function highestIdNumber() {
		let clonesChildren = container.childNodes
		let arr = []
		clonesChildren.forEach((clone) => {
			let idNumber = Number(clone.id.split("_").pop())
			arr.push(idNumber)
		})
		let highestIdNumber = Math.max(...arr)
		return highestIdNumber + 1
	}

	// Create a clone from the firstElementChild of the template
	const clone = template.content.firstElementChild.cloneNode(true)
	// Add an id to the new clone
	clone.id = `menu-link_${highestIdNumber()}`
	// Add a data-id to each clone
	clone.dataset.id = `${highestIdNumber()}`
	// Modify data-bs-target of each accordion button
	let accordionButton = clone.querySelector("button")
	accordionButton.dataset.bsTarget = `${accordionButton.dataset.bsTarget}_${highestIdNumber()}`
	// Add `New Menu Item` before the end of each new accordion button
	accordionButton.insertAdjacentHTML("beforeend", `<span class="ms-2">New Menu Item</span>`)

	// Select each element in the clone that has an id
	let cloneElWithId = clone.querySelectorAll("[id]")
	// Modify the id of each element in the clone
	cloneElWithId.forEach((el) => {
		el.id = `${el.id}_${highestIdNumber()}`
	})

	// Select each element in the clone that has a for attribute
	let cloneElWithFor = clone.querySelectorAll("[for]")
	// Modify the for attribute of each element in the clone
	cloneElWithFor.forEach((el) => {
		el.htmlFor = `${el.htmlFor}_${highestIdNumber()}`
	})

	// Get each input in the clone
	const linkTargetInput = clone.querySelector(`#link-target_${highestIdNumber()}`)
	const linkTitleInput = clone.querySelector(`#link-title_${highestIdNumber()}`)
	// Modify the name attribute of each input
	linkTargetInput.name = `menuLinks[${highestIdNumber()}][${linkTargetInput.name}]`
	linkTitleInput.name = `menuLinks[${highestIdNumber()}][${linkTitleInput.name}]`

	// Append the clone as a child to the container
	container.appendChild(clone)

	// Remove a clone when it's removeLinkButton is clicked
	removeClone()
})

const submitConfigButton = document.getElementById("submit-config-button")

submitConfigButton.addEventListener("click", () => {
	const menuConfigForm = document.getElementById("menu-config-form")
	const required = menuConfigForm.querySelectorAll("*[required]")

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
					menuConfigForm.submit()
				})
			},
		})
	}
})

Sortable.create(container, {
	animation: 150,
	ghostClass: "bg-primary-subtle",
	store: {
		/**
		 * Save the order of elements. Called onEnd (when the item is dropped).
		 * @param {Sortable}  sortable
		 */
		set: function (sortable) {
			let links = container.childNodes
			links.forEach((link, index) => {
				let inputs = link.querySelectorAll("input")
				inputs.forEach((input) => {
					let inputNumber = input.name.replace(/\D/g, "")
					input.name = input.name.replace(inputNumber, index + 1)
				})
			})
		},
	},
})
