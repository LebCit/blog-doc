import { unlink } from "node:fs/promises"
import { adminMenuItems } from "./adminMenuItems.js"

export const adminTableRoute = (app, settings, marked, join) => {
	app.get("/bd-admin/get/:files", async (req, res) => {
		const files = req.params.files

		const parsedAdminAllPages = await app.parseMarkdownFile("themes/admin/pages/admin-all-pages.md")
		const parsedAdminAllPosts = await app.parseMarkdownFile("themes/admin/pages/admin-all-posts.md")

		const { title, description, href } =
			files == "all-pages" ? parsedAdminAllPages.frontmatter : parsedAdminAllPosts.frontmatter
		const html_admin_content =
			files == "all-pages" ? marked.parse(parsedAdminAllPages.content) : marked.parse(parsedAdminAllPosts.content)

		const pages = await app.parseMarkdownFileS("pages")
		const posts = await app.parseMarkdownFileS("posts")

		const filesData = []

		if (files == "all-pages") {
			pages.forEach((page) => {
				const fileName = page.fileBaseName
				const filePath = page.filePath
				const { title, published } = page.frontmatter
				const description = page.frontmatter.description || ""

				filesData.push({ fileName, filePath, title, description, published })
			})
		} else {
			posts.sort((a, b) => {
				const dateA = new Date(a.frontmatter.publish_date).getTime()
				const dateB = new Date(b.frontmatter.publish_date).getTime()
				return dateB - dateA
			})
			posts.forEach((post) => {
				const fileName = post.fileBaseName
				const filePath = post.filePath
				const { title, publish_date, published } = post.frontmatter
				const description = post.frontmatter.description || ""
				const tags = post.frontmatter.tags || ""

				filesData.push({ fileName, filePath, title, description, tags, publish_date, published })
			})
		}

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			href,
			menu: adminMenuItems,
			html_admin_content,
			filesData,
			siteTitle: settings.siteTitle,
			tableRoute: true,
		})
	}).post("/bd-admin/delete-file", async (req, res, data) => {
		const { filePath } = data
		const splitPath = filePath.split("/")
		const fileDir = splitPath[1]
		const fileFullPath = join(process.cwd(), filePath)

		try {
			await unlink(fileFullPath)
			console.log(`successfully deleted ${fileFullPath}`)
			res.redirect(`/bd-admin/get/all-${fileDir}`)
		} catch (error) {
			console.error("there was an error:", error.message)
		}
	})
}
