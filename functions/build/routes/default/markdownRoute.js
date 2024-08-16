// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"

// Internal functions
import { processMarkdownPosts } from "../../../helpers/processMarkdownPosts.js"
import { transformLinksToObjects } from "../../../helpers/transformLinksToObjects.js"

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

				await app.renderToFile(
					`themes/${settings.currentTheme}/layouts/base.html`,
					{
						mdRoute: true,
						data: fileData,
						postPreviewFallbackImage: settings.postPreviewFallbackImage,
						html_content: fileContent,
						prevPost: file.fileDir === "posts" ? file.prevPost : null,
						nextPost: file.fileDir === "posts" ? file.nextPost : null,
						filename: file.fileBaseName,
						siteTitle: settings.siteTitle,
						menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
						html_footerCopyright: settings.footerCopyright,
					},
					`_site/${file.fileDir}/${file.fileBaseName}/index.html` // Create HTML file out of each Markdown file
				)
			})
		)
	} catch (error) {
		console.error("Error in markdownRoute:", error)
		throw error
	}
}
