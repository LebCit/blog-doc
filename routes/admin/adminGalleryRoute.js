// Internal Modules
import { unlink } from "node:fs/promises"
import { writeFile } from "fs"
import { join } from "path"

// Internal Functions
import { getImages } from "../../functions/blog-doc.js"
import { initializeApp } from "../../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../../config/settings.js"

// GALLERY ROUTE.
export const adminGalleryRoute = app
	.get("/admin-gallery", async (c) => {
		const data = {
			title: "Images gallery",
			description: `${settings.siteTitle} gallery page`,
		}
		const res = eta.render("layouts/admin/adminGallery.html", {
			adminGallery: true,
			data: data,
			images: await getImages(),
			siteTitle: settings.siteTitle,
			footerCopyright: settings.footerCopyright,
		})
		return c.html(res)
	})

	.post("/add-image", async (c) => {
		const { images } = await c.req.parseBody()

		const arr = [images]

		arr.forEach(async (image) => {
			const buffer = await image.arrayBuffer()

			writeFile(`${join(process.cwd())}/static/images/${image.name}`, Buffer.from(buffer), (err) => {
				if (err) throw err
			})
		})

		return c.text("uploaded!")
	})

	.post("/save-image", (c) => {
		return c.redirect("/admin-gallery")
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
