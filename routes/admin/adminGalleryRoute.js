// Internal Modules
import { unlink } from "node:fs/promises"
import { writeFile } from "fs"
import { join } from "path"

// Internal Functions
import { getIcons, getImages } from "../../functions/blog-doc.js"
import { initializeApp } from "../../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../../config/settings.js"

// GALLERIES ROUTE. Since v2.5.0
export const adminGalleryRoute = app
	.get("/admin/gallery/:files", async (c) => {
		const files = c.req.param("files")
		const firstLetter = files.charAt(0)
		const firstLetterCap = firstLetter.toUpperCase()
		const remainingLetters = files.slice(1)
		const capitalizedFiles = firstLetterCap + remainingLetters

		const data = {
			title: `${capitalizedFiles} gallery`,
			description: `${settings.siteTitle} ${files} gallery page`,
		}
		const res = eta.render("admin/layouts/adminGallery.html", {
			adminGallery: true,
			adminIcons: files == "icons" ? true : false,
			data: data,
			images: files == "icons" ? await getIcons() : await getImages(),
			siteTitle: settings.siteTitle,
			footerCopyright: settings.footerCopyright,
		})
		return c.html(res)
	})

	.post("/add/:imgType", async (c) => {
		const imgType = c.req.param("imgType")

		const { images } = await c.req.parseBody()

		const arr = [images]

		arr.forEach(async (image) => {
			const buffer = await image.arrayBuffer()

			writeFile(`${join(process.cwd())}/static/${imgType}s/${image.name}`, Buffer.from(buffer), (err) => {
				if (err) throw err
			})
		})

		return c.text("uploaded!")
	})

	.post("/save/:imgType", (c) => {
		const imgType = c.req.param("imgType")

		return c.redirect(`/admin/gallery/${imgType}s`)
	})

	.post("/delete-image", async (c) => {
		const { imageName } = await c.req.parseBody()
		const imagePath = `${join(process.cwd())}/static/images/${imageName}`
		try {
			await unlink(`${imagePath}`)
			return c.redirect("/admin-gallery")
		} catch (error) {
			console.error("there was an error:", error.message)
		}
	})
