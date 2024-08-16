import { updateExternalLinks } from "../../updateExternalLinks.js"

/** Skip link focus fix for IE */
;(function () {
	const isIe = /(trident|msie)/i.test(navigator.userAgent)

	if (isIe && document.getElementById && window.addEventListener) {
		window.addEventListener("hashchange", () => {
			const id = location.hash.substring(1)
			if (/^[A-z0-9_-]+$/.test(id)) {
				const element = document.getElementById(id)
				if (element && !/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
					element.tabIndex = -1
				}
				element?.focus()
			}
		})
	}
})()

/** Navigation Menu Handling */
const openCloseMenu = (() => {
	const navButton = document.getElementById("menu-button")
	const navMenu = document.getElementById("main-nav")
	const navLinks = navMenu.querySelectorAll("a")
	const closeButton = document.getElementById("close-button")
	const mql = window.matchMedia("(min-width: 1024px)")

	const [lastNavLink, beforeLastNavLink] = (() => {
		const lastLink = navMenu.lastElementChild.lastElementChild
		return [lastLink, lastLink.previousElementSibling]
	})()

	const toggleMenu = (isActive) => {
		document.body.classList.toggle("active", isActive)
		navMenu.style.width = isActive ? (mql.matches ? "60%" : "100%") : "0%"
		isActive ? enableNavLinks() : disableNavLinks()
	}

	const handleKeydown = (event, action) => {
		if ([" ", "Enter", "Spacebar", "Escape"].includes(event.key)) {
			event.preventDefault()
			toggleMenu(action === "open")
			if (action === "close") navButton.focus()
		}
	}

	const handleKeydownOnLastLink = (event) => {
		if (event.shiftKey && event.key === "Tab") {
			event.preventDefault()
			beforeLastNavLink.focus()
		} else if (event.key === "Tab") {
			event.preventDefault()
			closeButton.focus()
		}
	}

	const enableNavLinks = () => {
		setTimeout(() => closeButton.focus(), 100)
		navButton.setAttribute("aria-label", "Menu expanded")
		navMenu.removeAttribute("aria-hidden")
		navMenu.classList.remove("invisible")
		navLinks.forEach((link) => link.removeAttribute("tabIndex"))
	}

	const disableNavLinks = () => {
		navButton.setAttribute("aria-label", "Menu collapsed")
		navMenu.setAttribute("aria-hidden", "true")
		navMenu.classList.add("invisible")
		navLinks.forEach((link) => link.setAttribute("tabIndex", "-1"))
	}

	navButton.addEventListener("click", (event) => {
		event.preventDefault()
		toggleMenu(!document.body.classList.contains("active"))
	})

	navButton.addEventListener("keydown", (event) => {
		handleKeydown(event, document.body.classList.contains("active") ? "close" : "open")
	})

	closeButton.addEventListener("click", (event) => {
		event.preventDefault()
		toggleMenu(false)
	})

	closeButton.addEventListener("keydown", (event) => {
		handleKeydown(event, "close")
		if (event.shiftKey && event.key === "Tab") {
			event.preventDefault()
			lastNavLink.focus()
		}
	})

	lastNavLink.addEventListener("keydown", handleKeydownOnLastLink)
})()

window.addEventListener("DOMContentLoaded", () => {
	openCloseMenu
	document.querySelectorAll("img").forEach((img) => img.classList.add("img-responsive"))
})

/** Move Navigation Based on Window Width */
const handleNavMove = () => {
	const insertedNode = document.getElementById("nav")
	const originalParent = document.querySelector("div.sidebar")
	const parentNode = document.getElementById("page")
	const originalReference = document.querySelector("div.site-branding")
	const referenceNode = document.getElementById("masthead")

	const moveNav = () => {
		const isMobile = window.matchMedia("(max-width: 1023.5px)").matches
		const targetParent = isMobile ? parentNode : originalParent
		const reference = isMobile ? referenceNode : originalReference.nextSibling
		targetParent.insertBefore(insertedNode, reference)
	}

	moveNav()
	window.matchMedia("(min-width: 1024px)").addEventListener("change", moveNav)
}

handleNavMove()

updateExternalLinks()
