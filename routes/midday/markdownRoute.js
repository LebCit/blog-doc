import { marked } from "marked"
import { LiteNode } from "litenode"
import { processMarkdownPosts } from "../../functions/helpers/processMarkdownPosts.js"
import { transformLinksToObjects } from "../../functions/helpers/transformLinksToObjects.js"

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

			res.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				mdRoute: true,
				data: fileData,
				postPreviewFallbackImage: settings.postPreviewFallbackImage,
				html_content: fileContent,
				prevPost: currentFile.fileDir === "posts" ? currentFile.prevPost : null,
				nextPost: currentFile.fileDir === "posts" ? currentFile.nextPost : null,
				editable: true,
				editLink: req.params.filename,
				siteTitle: settings.siteTitle,
				siteDescription: settings.siteDescription,
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
				currentYear: new Date().getFullYear(),
			})
		} else {
			// Proceed to the 404 route if no file is found
			res.redirect("/404")
		}
	})

	app.nest("/posts", filesRouter)
	app.nest("/pages", filesRouter)
}
