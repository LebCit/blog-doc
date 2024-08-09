import { writeFile } from "node:fs/promises"
import { adminMenuItems } from "./adminMenuItems.js"
import { getImages } from "../../functions/helpers/getImages.js"

export const adminSetSiteSettings = async (app, settings, marked, join) => {
	app.get("/bd-admin/set/site-settings", async (req, res) => {
		const parsedAdminSiteSettings = await app.parseMarkdownFile("themes/admin/pages/admin-set-site-settings.md")
		const { title, description } = parsedAdminSiteSettings.frontmatter
		const html_admin_content = marked.parse(parsedAdminSiteSettings.content)

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			menu: adminMenuItems,
			html_admin_content,
			images: await getImages("static/images"),
			siteTitle: settings.siteTitle,
			settings,
			setSiteSettings: true,
		})
	}).post("/bd-admin/update/site-settings", async (req, res, data) => {
		// Convert `postsPerPage` from string to number
		data.postsPerPage = parseInt(data.postsPerPage, 10)

		// Convert `searchFeature` from string to boolean
		data.searchFeature = data.searchFeature.toLowerCase() === "true"

		// Update settings with values from data
		Object.assign(settings, data)

		// Get settings.json path
		const settingsFullPath = join(process.cwd(), "config/settings.json")

		try {
			// Convert settings object to a formatted JSON string
			const formattedJson = JSON.stringify(settings, null, 4) // 4 spaces for indentation

			// Write the formatted JSON to settings.json in config directory
			await writeFile(settingsFullPath, formattedJson, "utf8")
			res.redirect("/bd-admin/set/site-settings")

			console.log("Site Settings has been saved in JSON settings file!")
		} catch (error) {
			console.error("Error saving Site Settings in JSON settings file:", error)
		}
	})
}
