// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../helpers/writeFileWithHandling.js"

// Internal functions
import { getPosts, postsByTagList } from "../../blog-doc.js"
import { initializeApp } from "../../initialize.js"
const { eta } = initializeApp()

// Settings
import { settings } from "../../../config/settings.js"

/**
 * Function to create a page for each tag
 * ======================================
 */
export const tagRoute = async () => {
	try {
		const posts = await getPosts()

		const allTagsArray = posts.flatMap((post) => post[1].frontmatter.tags).sort()
		const tagsArray = [...new Set(allTagsArray)]

		await Promise.all(
			tagsArray.map(async (tag) => {
				// If tag is not undefined:
				if (tag) {
					// Create a folder for each tag
					await ensureFoldersExist([`_site/tags/${tag}`])

					const postsByTag = await postsByTagList(tag)

					const data = {
						title: postsByTag.length > 1 ? `Posts Tagged "${tag}"` : `Post Tagged "${tag}"`,
						description: `List of posts tagged ${tag}`,
						featuredImage: settings.tagImage,
						subTitle:
							postsByTag.length > 1 ? `${postsByTag.length} posts with this tag` : `1 post with this tag`,
						favicon: settings.favicon,
					}

					const tagHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
						tagRoute: true,
						data: data,
						posts: postsByTag,
						paginated: false,
						postPreviewFallbackImage: settings.postPreviewFallbackImage,
						siteTitle: settings.siteTitle,
						menuLinks: settings.menuLinks,
						footerCopyright: settings.footerCopyright,
					})

					// Create HTML file for each tag
					await writeFileWithHandling(`_site/tags/${tag}/index.html`, tagHTML, "utf8")
				}
			})
		)
	} catch (error) {
		console.error("Error in tagRoute:", error)
		throw error
	}
}
