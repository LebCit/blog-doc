// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../helpers/writeFileWithHandling.js"

// Internal functions
import { getPages, getPosts, prevNext } from "../../blog-doc.js"
import { idsInHeadings } from "../../helpers.js"
import { initializeApp } from "../../initialize.js"
const { eta } = initializeApp()

// Settings
import { settings } from "../../../config/settings.js"

// External modules
import { marked } from "marked"

/**
 * Function to create the pages and posts
 * ======================================
 */
export const markdownRoute = async () => {
	try {
		const pages = await getPages()
		const posts = await getPosts()
		const mdFiles = pages.concat(posts)

		await Promise.all(
			mdFiles.map(async (file) => {
				const fileName = file[0].replace(".md", "")
				const fileData = file[1].frontmatter
				fileData.favicon = settings.favicon
				const fileContent = marked.parse(file[1].content)

                // Create a folder for each file
				await ensureFoldersExist([`_site/${file.dir}/${fileName}`])

				const fileHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					mdRoute: true,
					data: fileData,
					content: settings.addIdsToHeadings ? idsInHeadings(fileContent) : fileContent,
					prevNext: file.dir === "posts" ? await prevNext(file[0]) : null,
					filename: fileName,
					siteTitle: settings.siteTitle,
					menuLinks: settings.menuLinks,
					footerCopyright: settings.footerCopyright,
				})

                // Create HTML file out of each Markdown file
				await writeFileWithHandling(`_site/${file.dir}/${fileName}/index.html`, fileHTML, "utf8")
			})
		)
	} catch (error) {
		console.error("Error in markdownRoute:", error)
		throw error
	}
}
