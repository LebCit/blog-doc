import { marked } from "marked"
import { settings } from "../../config/settings.js"

/**
 * Processes files from the posts directory, adds post excerpts, sorts by publish date with previous and next references.
 * @param {Object} app - LiteNode's instance.
 * @returns {Promise<Array<Object>>} - A promise resolving to an array of processed files objects.
 */
export async function processMarkdownPosts(app) {
	const { postPreviewFallbackImage } = settings

	// Fetch and process the files
	const posts = (await app.parseMarkdownFileS("posts"))
		.filter(({ frontmatter }) => frontmatter.published)
		.map((post) => {
			const excerptLength = 180
			const { content, frontmatter } = post

			post.postExcerpt = marked.parse(
				content.length <= excerptLength ? content : `${content.substring(0, excerptLength)}...`
			)

			frontmatter.featuredImage = frontmatter.featuredImage || postPreviewFallbackImage
			frontmatter.description = frontmatter.description || " " // Space prevents "" (empty quotes) from rendering

			post.pubDate = new Date(frontmatter.publish_date)

			return post
		})
		.sort((a, b) => new Date(b.frontmatter.publish_date) - new Date(a.frontmatter.publish_date))

	// Add lightweight references to the previous and next posts
	posts.forEach((post, index) => {
		const prevPost = posts[index + 1] || null
		const nextPost = posts[index - 1] || null

		post.prevPost = prevPost ? { title: prevPost.frontmatter.title, fileBaseName: prevPost.fileBaseName } : null

		post.nextPost = nextPost ? { title: nextPost.frontmatter.title, fileBaseName: nextPost.fileBaseName } : null
	})

	return posts
}
