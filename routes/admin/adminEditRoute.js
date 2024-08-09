import { writeFile } from "node:fs/promises"
import { getImages } from "../../functions/helpers/getImages.js"
import { adminMenuItems } from "./adminMenuItems.js"
import { processTags } from "./utils/processTags.js"
import { filterFrontmatter } from "./utils/filterFrontmatter.js"
import { quoteSpecialFields } from "./utils/quoteSpecialFields.js"

export const adminEditRoute = (app, settings, marked, join) => {
	app.get("/bd-admin/edit/:filename", async (req, res) => {
		// Merge the pages and the posts arrays into a single array named mdFiles
		const pages = await app.parseMarkdownFileS("pages")
		const posts = await app.parseMarkdownFileS("posts")
		const mdFiles = pages.concat(posts)

		const file = mdFiles.find((file) => file.fileBaseName === req.params.filename)

		const parsedAdminEditPage = await app.parseMarkdownFile("themes/admin/pages/admin-edit-page.md")
		const parsedAdminEditPost = await app.parseMarkdownFile("themes/admin/pages/admin-edit-post.md")
		let pageContent = marked.parse(parsedAdminEditPage.content)
		let postContent = marked.parse(parsedAdminEditPost.content)
		pageContent = pageContent.replace("{{pageTitle}}", file.frontmatter.title)
		postContent = postContent.replace("{{postTitle}}", file.frontmatter.title)

		res.render("themes/admin/layouts/index.html", {
			file,
			title: file.fileDir === "pages" ? "Edit Page" : "Edit Post",
			description:
				file.fileDir === "pages"
					? `Edit page: ${file.frontmatter.title}`
					: `Edit post: ${file.frontmatter.title}`,
			menu: adminMenuItems,
			html_admin_content: file.fileDir === "pages" ? pageContent : postContent,
			images: await getImages("static/images"),
			siteTitle: settings.siteTitle,
			editRoute: true,
		})
	}).post("/bd-admin/edit-file", async (req, res, data) => {
		const { file } = data

		let frontmatter = {
			title: file.title,
			description: file.description,
			featuredImage: file.image,
			publish_date: file.publish_date,
			tags: file.tags ? processTags(file.tags) : undefined,
			published: file.published,
			//href: file.href,
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

		const fileFullPath = join(process.cwd(), file.path)
		const fileDir = file.directory
		const fileHREF = file.href // This is the file base name!
		// Redirect depending on file published state
		const redirectPath = file.published === "true" ? `/${fileDir}/${fileHREF}` : `/${fileDir}/preview/${fileHREF}`

		try {
			await writeFile(fileFullPath, markdownContent)
			res.redirect(redirectPath)
		} catch (error) {
			console.error("Error writing file:", error)
			res.status(500).txt("Error updating file")
		}
	})
}
