import { writeFile } from "node:fs/promises"
import { adminMenuItems } from "./adminMenuItems.js"
import { getImages } from "../../functions/helpers/getImages.js"
import { processRoutesImages } from "../../functions/helpers/processRoutesImages.js"

export const adminSetRoutesImages = async (app, settings, marked, join) => {
	app.get("/bd-admin/set/routes-images", async (req, res) => {
		const parsedAdminRoutesImages = await app.parseMarkdownFile("themes/admin/pages/admin-set-routes-images.md")
		const { title, description } = parsedAdminRoutesImages.frontmatter
		const html_admin_content = marked.parse(parsedAdminRoutesImages.content)
		const routesImagesArray = processRoutesImages(settings)

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			menu: adminMenuItems,
			html_admin_content,
			images: await getImages("static/images"),
			siteTitle: settings.siteTitle,
			routesImagesArray,
			setRoutesImages: true,
		})
	}).post("/bd-admin/update/routes-images", async (req, res, data) => {
		// Update settings with values from data
		Object.assign(settings, data)

		// Get settings.json path
		const settingsFullPath = join(process.cwd(), "config/settings.json")

		try {
			// Convert settings object to a formatted JSON string
			const formattedJson = JSON.stringify(settings, null, 4) // 4 spaces for indentation

			// Write the formatted JSON to settings.json in config directory
			await writeFile(settingsFullPath, formattedJson, "utf8")
			res.redirect("/bd-admin/set/routes-images")

			console.log("Routes Images has been saved in JSON settings file!")
		} catch (error) {
			console.error("Error saving Routes Images in JSON settings file:", error)
		}
	})
}
