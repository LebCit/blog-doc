// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { eta } from "../../../initialize.js"
import { processMarkdownPosts } from "../../../helpers/processMarkdownPosts.js"

// External modules
import { marked } from "marked"

/**
 * Function to create the pages and posts
 * ======================================
 */
export const markdownRoute = async (app, settings) => {
	try {
		const pages = (await app.parseMarkdownFileS("pages")).filter((page) => page.frontmatter.published === true)
		const posts = await processMarkdownPosts(app)
		const mdFiles = pages.concat(posts)

		await Promise.all(
			mdFiles.map(async (file) => {
				const fileData = file.frontmatter
				fileData.favicon = settings.favicon
				const fileContent = marked.parse(file.content)

				// Create a folder for each file
				await ensureFoldersExist([`_site/${file.fileDir}/${file.fileBaseName}`])

				const fileHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					mdRoute: true,
					data: fileData,
					content: fileContent,
					prevPost: file.fileDir === "posts" ? file.prevPost : null,
					nextPost: file.fileDir === "posts" ? file.nextPost : null,
					filename: file.fileBaseName,
					siteTitle: settings.siteTitle,
					menuLinks: settings.menuLinks,
					footerCopyright: settings.footerCopyright,
				})

				// Create HTML file out of each Markdown file
				await writeFileWithHandling(`_site/${file.fileDir}/${file.fileBaseName}/index.html`, fileHTML, "utf8")
			})
		)
	} catch (error) {
		console.error("Error in markdownRoute:", error)
		throw error
	}
}
