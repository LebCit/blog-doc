import { adminMenuItems } from "./adminMenuItems.js"

export const adminMainRoute = async (app, settings, marked, join = null) => {
	app.get("/bd-admin", async (req, res) => {
		const parsedAdminHome = await app.parseMarkdownFile("themes/admin/pages/admin-home.md")
		const { title, description } = parsedAdminHome.frontmatter
		const html_admin_content = marked.parse(parsedAdminHome.content)

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			menu: adminMenuItems,
			html_admin_content,
			siteTitle: settings.siteTitle,
			mainRoute: true,
		})
	})
}
