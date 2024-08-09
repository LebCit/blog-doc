import { writeFile } from "node:fs/promises"
import { adminMenuItems } from "./adminMenuItems.js"
import { getImages } from "../../functions/helpers/getImages.js"

export const adminSetTheme = async (app, settings, marked, join) => {
	app.get("/bd-admin/set/theme", async (req, res) => {
		const parsedAdminSetTheme = await app.parseMarkdownFile("themes/admin/pages/admin-set-theme.md")
		const { title, description } = parsedAdminSetTheme.frontmatter
		const html_admin_content = marked.parse(parsedAdminSetTheme.content)

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			menu: adminMenuItems,
			html_admin_content,
			images: await getImages("static/admin/images/themes"),
			siteTitle: settings.siteTitle,
			activeTheme: settings.currentTheme,
			setTheme: true,
		})
	}).post("/bd-admin/update/theme", async (req, res, data) => {
		// Update settings with values from data
		Object.assign(settings, data)

		// Get settings.json path
		const settingsFullPath = join(process.cwd(), "config/settings.json")

		try {
			// Convert settings object to a formatted JSON string
			const formattedJson = JSON.stringify(settings, null, 4) // 4 spaces for indentation

			// Write the formatted JSON to settings.json in config directory
			await writeFile(settingsFullPath, formattedJson, "utf8")
			res.redirect("/bd-admin/set/theme")

			console.log("Theme has been saved in JSON settings file!")
		} catch (error) {
			console.error("Error saving Theme in JSON settings file:", error)
		}
	})
}
