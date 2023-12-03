// Internal Modules
import { writeFile } from "node:fs/promises"

// Internal Functions
import { getIcons, getImages, getSubDirs } from "../../functions/blog-doc.js"
import { initializeApp } from "../../functions/initialize.js"
import { transformParsedBody } from "../../functions/helpers.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../../config/settings.js"

// ROUTES TO MODIFY THE APP SETTINGS.
export const adminConfigRoute = app
	.get("/admin-config-site", async (c) => {
		const data = {
			title: "Config Settings",
			description: `${settings.siteTitle} Site Settings`,
		}

		const res = eta.render("admin/layouts/adminConfigSite.html", {
			adminConfig: true,
			data: data,
			settings: settings,
			images: await getImages(),
			icons: await getIcons(),
			themes: await getSubDirs("views/themes"),
			siteTitle: settings.siteTitle,
			footerCopyright: settings.footerCopyright,
		})
		return c.html(res)
	})

	.get("/admin-config-menu", async (c) => {
		const data = {
			title: "Menu Settings",
			description: `${settings.siteTitle} Menu Settings`,
		}

		const res = eta.render("admin/layouts/adminConfigMenu.html", {
			adminConfig: true,
			data: data,
			settings: settings,
			images: await getImages(),
			siteTitle: settings.siteTitle,
			footerCopyright: settings.footerCopyright,
		})
		return c.html(res)
	})

	.post("/admin-config-site", async (c) => {
		let siteSettings = await c.req.parseBody()

		siteSettings.postsPerPage = JSON.parse(siteSettings.postsPerPage) // Get the value of postsPerPage as a number
		siteSettings.searchFeature = JSON.parse(siteSettings.searchFeature) // Get the value of searchFeature as a boolean
		siteSettings.addIdsToHeadings = JSON.parse(siteSettings.addIdsToHeadings) // Get the value of addIdsToHeadings as a boolean

		// Remove unneeded properties from siteSettings
		delete siteSettings.modalSelectedFavicon
		delete siteSettings.modalSelectedPageImage
		delete siteSettings.modalSelectedPostImage
		delete siteSettings.modalSelectedPostPreviewFallbackImage
		delete siteSettings.modalSelectedRouteImage

		settings.siteTitle = siteSettings.siteTitle
		settings.siteDescription = siteSettings.siteDescription
		settings.siteURL = siteSettings.siteURL
		settings.favicon = siteSettings.favicon
		settings.rssSiteLanguage = siteSettings.rssSiteLanguage
		settings.rssCopyright = siteSettings.rssCopyright
		settings.blogImage = siteSettings.blogImage
		settings.archiveImage = siteSettings.archiveImage
		settings.tagsImage = siteSettings.tagsImage
		settings.tagImage = siteSettings.tagImage
		settings.searchImage = siteSettings.searchImage
		settings.footerCopyright = siteSettings.footerCopyright
		settings.postsPerPage = siteSettings.postsPerPage
		settings.postPreviewFallbackImage = siteSettings.postPreviewFallbackImage
		settings.searchFeature = siteSettings.searchFeature
		settings.addIdsToHeadings = siteSettings.addIdsToHeadings
		settings.currentTheme = siteSettings.currentTheme

		await writeFile("config/settings.json", JSON.stringify(settings), "utf8")
		return c.redirect("/admin")
	})

	.post("/admin-config-menu", async (c) => {
		let menuSettings = await c.req.parseBody()

		menuSettings = transformParsedBody(menuSettings, "menuLinks")

		delete settings.menuLinks

		let object = {}
		menuSettings.menuLinks.forEach((obj) => {
			object[obj.linkTarget] = obj.linkTitle
		})
		object.admin = "Admin ⚡" // Added here, because it's removed `from menu configuration`
		settings.menuLinks = object

		await writeFile("config/settings.json", JSON.stringify(settings), "utf8")
		return c.redirect("/admin")
	})
