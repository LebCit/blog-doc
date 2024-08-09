import { unlink, writeFile } from "node:fs/promises"
import { formatFileName } from "./utils/formatFileName.js"
import { adminMenuItems } from "./adminMenuItems.js"
import { getImages } from "../../functions/helpers/getImages.js"

export const adminGalleryRoute = async (app, settings, marked, join) => {
	app.get("/bd-admin/set/images", async (req, res) => {
		const parsedAdminGallery = app.parseMarkdownFile("themes/admin/pages/admin-gallery.md")
		const { title, description } = parsedAdminGallery.frontmatter
		const html_admin_content = marked.parse(parsedAdminGallery.content)

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			menu: adminMenuItems,
			html_admin_content,
			images: await getImages("static/images"),
			siteTitle: settings.siteTitle,
			galleryRoute: true,
		})
	})
		.post(
			"/bd-admin/set-images",
			async (req, res, data) => {
				const { files } = data
				try {
					for (const file of files) {
						const fileName = formatFileName(file.filename, true)
						const fileFullPath = join(process.cwd(), `static/images/${fileName}`)
						await writeFile(fileFullPath, file.body)
					}
					res.redirect("/bd-admin/set/images")
				} catch (err) {
					console.error("Error writing files:", err)
					res.status(500).txt("Internal Server Error")
				}
			},
			15
		)
		.post(
			"/bd-admin/delete-image",
			async (req, res, data) => {
				const { imagePath } = data
				const imageFullPath = join(process.cwd(), imagePath)
				try {
					await unlink(imageFullPath)
					console.info(`Successfully delete ${imageFullPath}`)
					res.redirect("/bd-admin/set/images")
				} catch (err) {
					console.error("Error deleting image:", err)
					res.status(500).txt("Internal Server Error")
				}
			},
			15
		)
}
