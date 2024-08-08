/**
 * Processes files from the posts directory, adds post excerpts, sorts by publish date with previous and next references.
 * @param {Object} app - LiteNode's instance.
 * @returns {Promise<Array<Object>>} - A promise resolving to an array of processed files objects.
 */
export async function processMarkdownPosts(app) {
	// Fetch and process the files
	const posts = (await app.parseMarkdownFileS("posts"))
		.filter((post) => post.frontmatter.published === true)
		.map((post) => {
			// Add postExcerpt to posts
			const excerptLength = 180
			post.postExcerpt =
				post.content.length <= excerptLength ? post.content : `${post.content.substring(0, excerptLength)}...`

			// Add pubDate to each post
			post.pubDate = new Date(post.frontmatter.publish_date)

			return post
		})

	// Sort the posts by publish_date from newer to older
	posts.sort((a, b) => {
		const dateA = new Date(a.frontmatter.publish_date).getTime()
		const dateB = new Date(b.frontmatter.publish_date).getTime()
		return dateB - dateA
	})

	// Add previous and next references
	posts.forEach((post, index) => {
		post.nextPost = index > 0 ? posts[index - 1] : null
		post.prevPost = index < posts.length - 1 ? posts[index + 1] : null
	})

	return posts
}
