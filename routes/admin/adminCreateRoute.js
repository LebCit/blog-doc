import { existsSync } from "node:fs"
import { writeFile } from "node:fs/promises"
import { getImages } from "../../functions/helpers/getImages.js"
import { adminMenuItems } from "./adminMenuItems.js"
import { processTags } from "./utils/processTags.js"
import { formatFileName } from "./utils/formatFileName.js"
import { filterFrontmatter } from "./utils/filterFrontmatter.js"
import { quoteSpecialFields } from "./utils/quoteSpecialFields.js"

export const adminCreateRoute = (app, settings, marked, join) => {
	app.get("/bd-admin/add/:newFile", async (req, res) => {
		const newFile = req.params.newFile

		const parsedAdminNewPage = await app.parseMarkdownFile("themes/admin/pages/admin-add-new-page.md")
		const parsedAdminNewPost = await app.parseMarkdownFile("themes/admin/pages/admin-add-new-post.md")

		const { title, description, href } =
			newFile === "new-page" ? parsedAdminNewPage.frontmatter : parsedAdminNewPost.frontmatter
		const html_admin_content =
			newFile === "new-page" ? marked.parse(parsedAdminNewPage.content) : marked.parse(parsedAdminNewPost.content)

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			href,
			menu: adminMenuItems,
			html_admin_content,
			images: await getImages("static/images"),
			siteTitle: settings.siteTitle,
			createRoute: true,
		})
	}).post("/bd-admin/create-file", async (req, res, data) => {
		const { file } = data
		const fileName = formatFileName(file.title)
		const fileType = file.type
		const fileFullPath = join(process.cwd(), "views", fileType, `${fileName}.md`)

		// Check if the file already exists
		const pageFullPath = join(process.cwd(), "views", "pages", `${fileName}.md`)
		const postFullPath = join(process.cwd(), "views", "posts", `${fileName}.md`)
		if (existsSync(pageFullPath) || existsSync(postFullPath)) {
			return res.status(400).json({ error: "File already exists" })
		}

		let frontmatter = {
			title: file.title.trim(),
			description: file.description.trim(),
			featuredImage: file.image,
			publish_date: file.publish_date,
			tags: file.tags ? processTags(file.tags) : undefined,
			published: file.published,
			//href: `${fileName}`,
		}

		frontmatter = quoteSpecialFields(frontmatter)
		const filteredFrontmatter = filterFrontmatter(frontmatter)
		const content = file.content

		const markdownContent = `---
${Object.entries(filteredFrontmatter)
	.map(([key, value]) => {
		if (key === "tags") {
			return `${key}: [${value}]`
		}
		return `${key}: ${value}`
	})
	.join("\n")}
---

${content}`

		// Redirect depending on file published state
		const redirectPath = file.published === "true" ? `/${fileType}/${fileName}` : `/${fileType}/preview/${fileName}`

		try {
			await writeFile(fileFullPath, markdownContent)
			res.redirect(redirectPath)
		} catch (error) {
			console.error("Error writing file:", error)
			res.status(500).json({ error: "Error creating file" })
		}
	})
}
