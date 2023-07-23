// Internal Functions
import { getPages, getPosts, prevNext } from "../functions/blog-doc.js"
import { idsInHeadings } from "../functions/helpers.js"
import { initializeApp } from "../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../config/settings.js"

import { marked } from "marked"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"

// USe marked-highlight to highlight code blocks
marked.use(
	markedHighlight({
		langPrefix: "hljs language-",
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : "plaintext"
			return hljs.highlight(code, { language }).value
		},
	})
)

// Markdown Route
export const markdownRoute = app.get("/:folder/:filename", async (c, next) => {
	// Merge the pages and the posts arrays into a single array named mdFiles
	const pages = await getPages()
	const posts = await getPosts()
	const mdFiles = pages.concat(posts)

	const currentFile = mdFiles.find(
		(file) => file.path === `views/${c.req.param("folder")}/${c.req.param("filename")}.md`
	)

	if (currentFile) {
		const fileData = currentFile[1].frontmatter
		const fileContent = marked.parse(currentFile[1].content, { mangle: false, headerIds: false })
		const res = eta.render("layouts/base.html", {
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
