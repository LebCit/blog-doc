// Internal Functions
import { getPages, getPosts, prevNext } from "../../functions/blog-doc.js"
import { idsInHeadings } from "../../functions/helpers.js"
import { initializeApp } from "../../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../../config/settings.js"

import { marked } from "marked"

// Markdown Route
export const adminPreviewRoute = app.get("/admin-preview/:filename", async (c, next) => {
	// Merge the pages and the posts arrays into a single array named unpublishedFiles
	const pages = (await getPages()).filter((page) => page[1].frontmatter.published == "false")
	const posts = (await getPosts()).filter((post) => post[1].frontmatter.published == "false")
	const unpublishedFiles = pages.concat(posts)

	const currentFile = unpublishedFiles.find(
		(file) => file[0] === `${c.req.param("filename")}.md`
	)

	if (currentFile) {
		const fileData = currentFile[1].frontmatter
		fileData.favicon = settings.favicon
		const fileContent = marked.parse(currentFile[1].content)
		const res = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			// Passing Route data
			mdRoute: true,
			// Passing Markdown file data
			data: fileData,
			content: settings.addIdsToHeadings ? idsInHeadings(fileContent) : fileContent,
			prevNext: currentFile.dir === "posts" ? await prevNext(`${c.req.param("filename")}.md`) : null,
			// Passing data to edit the file
			editable: true,
			filename: c.req.param("filename"),
			// Passing needed settings for the template
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})
		return c.html(res)
	} else {
		// Proceed to the 404 route if no file is found
		await next()
	}
})
