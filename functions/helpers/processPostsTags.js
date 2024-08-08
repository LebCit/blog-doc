import { processMarkdownPosts } from "./processMarkdownPosts.js"

/**
 * Counts the occurrences of each tag from the posts' front-matter.
 * @param {Object} app - LiteNode's instance.
 * @returns {Promise<Object>} An object with tags as keys and their counts as values.
 */
async function countPostsByTag(app) {
	try {
		const posts = await processMarkdownPosts(app)

		// Create an array of the tags from all the posts by handling posts without tags properly
		const tagsArray = posts.flatMap((post) => post.frontmatter.tags || [])

		// Count the occurrence of each tag in the tagsArray and return the result as an object
		const tagsCountObject = tagsArray.reduce((acc, curr) => {
			acc[curr] = (acc[curr] || 0) + 1
			return acc
		}, {})

		// Sort the keys of the result object alphabetically
		const sortedTagsCountObject = Object.keys(tagsCountObject)
			.sort()
			.reduce((acc, key) => {
				acc[key] = tagsCountObject[key]
				return acc
			}, {})

		return sortedTagsCountObject
	} catch (error) {
		console.error("Error counting posts by tag:", error)
		return {}
	}
}

/**
 * Returns the posts of a particular tag.
 * @param {Object} app - LiteNode's instance.
 * @param {string} tag - The tag to filter posts by.
 * @returns {Promise<Array>} An array of posts that include the specified tag.
 */
async function getPostsByTag(app, tag) {
	try {
		const posts = await processMarkdownPosts(app)

		// Filter the posts to retrieve an array of post(s) including the requested tag
		const postsByTagArray = posts.filter((post) => {
			const tags = post.frontmatter.tags
			// Return posts where tags is not null or undefined
			return tags && tags.includes(tag)
		})

		return postsByTagArray
	} catch (error) {
		console.error(`Error fetching posts by tag "${tag}":`, error)
		return []
	}
}

export { countPostsByTag, getPostsByTag }
