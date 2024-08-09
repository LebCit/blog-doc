import { marked } from "marked"
import { LiteNode } from "litenode"
import { eta } from "../../functions/initialize.js"
import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"

// Markdown Route
export const markdownRoute = (app, settings) => {
	const filesRouter = new LiteNode()

	filesRouter.get("/:filename", async (req, res) => {
		// Merge the pages and the posts arrays into a single array named mdFiles
		const pages = (await app.parseMarkdownFileS("pages")).filter((page) => page.frontmatter.published === true)
		const posts = await processMarkdownPosts(app)
		const mdFiles = pages.concat(posts)

		const currentFile = mdFiles.find((file) => file.fileBaseName === req.params.filename)

		if (currentFile) {
			const fileData = currentFile.frontmatter
			fileData.favicon = settings.favicon
			fileData.fileDir = currentFile.fileDir
			const fileContent = marked.parse(currentFile.content)
			const response = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				// Passing Route data
				mdRoute: true,
				// Passing Markdown file data
				data: fileData,
				content: fileContent,
				prevPost: currentFile.fileDir === "posts" ? currentFile.prevPost : null,
				nextPost: currentFile.fileDir === "posts" ? currentFile.nextPost : null,
				// Passing data to edit the file
				editable: true,
				editLink: req.params.filename,
				// Passing needed settings for the template
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})
			res.html(response)
		} else {
			// Proceed to the 404 route if no file is found
			res.redirect("/404")
		}
	})

	app.nest("/posts", filesRouter)
	app.nest("/pages", filesRouter)
}
