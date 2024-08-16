import { LiteNode } from "litenode"
import { transformLinksToObjects } from "../../functions/helpers/transformLinksToObjects.js"

// Markdown Route
export const adminPreviewRoute = (app, settings, marked, join = null) => {
	const filesRouter = new LiteNode()

	filesRouter.get("/preview/:filename", async (req, res) => {
		// Merge the pages and the posts arrays into a single array named unpublishedFiles
		const pages = (await app.parseMarkdownFileS("pages")).filter((page) => page.frontmatter.published === false)
		const posts = (await app.parseMarkdownFileS("posts")).filter((post) => post.frontmatter.published === false)
		const unpublishedFiles = pages.concat(posts)

		const currentFile = unpublishedFiles.find((file) => file.fileBaseName === req.params.filename)

		if (currentFile) {
			const fileData = currentFile.frontmatter
			fileData.favicon = settings.favicon
			fileData.description = fileData.description || " "
			fileData.fileDir = currentFile.fileDir
			const fileContent = marked.parse(currentFile.content)
			res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				mdRoute: true,
				previewRoute: true,
				data: fileData,
				html_content: fileContent,
				prevPost: null,
				nextPost: null,
				editable: true,
				editLink: req.params.filename,
				siteTitle: settings.siteTitle,
				siteDescription: settings.siteDescription, // For Midday
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
				currentYear: new Date().getFullYear(), // For Midday
			})
		} else {
			// Proceed to the 404 route if no file is found
			res.redirect("/404")
		}
	})

	app.nest("/posts", filesRouter)
	app.nest("/pages", filesRouter)
}
