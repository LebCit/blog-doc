// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { eta } from "../../../initialize.js"
import { getPostsByTag } from "../../../helpers/processPostsTags.js"

/**
 * Function to create a page for each tag
 * ======================================
 */
export const tagRoute = async (app, settings) => {
	try {
		// Get all published posts
		const posts = (await app.parseMarkdownFileS("posts")).filter((page) => page.frontmatter.published === true)
		// Extract all tags from each post
		const tagsFromPosts = posts.flatMap((post) => post.frontmatter.tags)
		// Remove duplicate tags and sort them
		const uniqueSortedTags = [...new Set(tagsFromPosts)].sort()

		await Promise.all(
			uniqueSortedTags.map(async (tag) => {
				// If tag is not undefined:
				if (tag) {
					// Create a folder for each tag
					await ensureFoldersExist([`_site/tags/${tag}`])

					const postsByTag = await getPostsByTag(app, tag)

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
