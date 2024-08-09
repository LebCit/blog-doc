import { writeFile } from "node:fs/promises"
import { adminMenuItems } from "./adminMenuItems.js"

export const adminSetMenu = async (app, settings, marked, join) => {
	app.get("/bd-admin/set/menu", async (req, res) => {
		const parsedAdminSetMenu = await app.parseMarkdownFile("themes/admin/pages/admin-set-menu.md")
		const { title, description } = parsedAdminSetMenu.frontmatter
		const html_admin_content = marked.parse(parsedAdminSetMenu.content)
		const frontEndMenuLinks = settings.menuLinks
		const frontEndMenuArray = Object.keys(frontEndMenuLinks)
			.filter((key) => key !== "bd-admin") // Exclude the key "bd-admin"
			.map((key) => ({
				linkTarget: key,
				linkTitle: frontEndMenuLinks[key],
			}))

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			menu: adminMenuItems,
			html_admin_content,
			siteTitle: settings.siteTitle,
			frontEndMenuArray,
			setMenu: true,
		})
	}).post("/bd-admin/update/menu", async (req, res, data) => {
		// Delete the menu links from the settings
		delete settings.menuLinks

		// Readd the administration link to the menu
		data["bd-admin"] = "Admin ⚡"

		// Update settings with new menu
		settings.menuLinks = data

		// Get settings.json path
		const settingsFullPath = join(process.cwd(), "config/settings.json")

		try {
			// Convert settings object to a formatted JSON string
			const formattedJson = JSON.stringify(settings, null, 4) // 4 spaces for indentation

			// Write the formatted JSON to settings.json in config directory
			await writeFile(settingsFullPath, formattedJson, "utf8")
			res.json(data)

			console.log("Menu in JSON settings file has been saved!")
		} catch (error) {
			console.error("Error saving Menu in JSON settings file:", error)
		}
	})
}
