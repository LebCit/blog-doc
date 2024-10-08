import { stat } from "node:fs/promises"
import { getFiles } from "./getFiles.js"
import { processMarkdownPosts } from "./processMarkdownPosts.js"

/**
 * Gets the last modification time of a file.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<number>} The last modification time in milliseconds.
 */
async function getPostLastMod(filePath) {
	const stats = await stat(filePath)
	return stats.mtimeMs
}

/**
 * Creates an object representing the posts and their last modification date.
 * @param {Array} array - The array of posts.
 * @param {string} url - The URL associated with the posts.
 * @returns {Promise<Object>} An object containing the URL location and last modification date.
 */
async function createPostsObj(array, url) {
	const modDates = await Promise.all(array.map((post) => getPostLastMod(post.filePath)))
	const lastMod = new Date(Math.max(...modDates)).toUTCString()
	return { urlLocation: url, urlLastMod: lastMod }
}

/**
 * Generates a sitemap with URLs and their last modification dates.
 * @returns {Promise<Array>} An array of objects representing the sitemap.
 */
export async function sitemap(app, settings) {
	const urlsData = []
	const viewsFiles = await getFiles("views")
	const posts = await processMarkdownPosts(app)

	// MAIN ROUTE
	const newestPosts = posts.slice(0, settings.postsPerPage)
	urlsData.push(await createPostsObj(newestPosts, settings.siteURL))

	// ARCHIVE ROUTE
	urlsData.push(await createPostsObj(posts, `${settings.siteURL}archive`))

	// TAGS ROUTE
	urlsData.push(await createPostsObj(posts, `${settings.siteURL}tags`))

	// BLOG ROUTES
	if (posts.length > settings.postsPerPage) {
		const chunkedPosts = []
		for (let i = 0; i < posts.length; i += settings.postsPerPage) {
			chunkedPosts.push(posts.slice(i, i + settings.postsPerPage))
		}
		chunkedPosts.shift() // Remove the first chunk corresponding to the main route

		const blogRoutes = await Promise.all(
			chunkedPosts.map((chunk, idx) => createPostsObj(chunk, `${settings.siteURL}page/${idx + 1}`))
		)
		urlsData.push(...blogRoutes)
	}

	// FILES ROUTE
	const files = viewsFiles.filter((path) => !path.startsWith(`views/themes`))
	const filesData = await Promise.all(
		files.map(async (file) => {
			const fileTitle = file
				.split("/")
				.pop()
				.replace(/\.[^/.]+$/, "")
			const fileDir = file.split("/")[1]
			const lastMod = new Date((await stat(file)).mtimeMs).toUTCString()
			return { urlLocation: `${settings.siteURL + fileDir}/${fileTitle}`, urlLastMod: lastMod }
		})
	)
	urlsData.push(...filesData)

	// TAGS ROUTE
	const allTags = [...new Set(posts.flatMap((post) => post.frontmatter.tags))]
	const tagsData = await Promise.all(
		allTags.map(async (tag) => {
			const taggedPosts = posts.filter((post) => {
				const tags = post.frontmatter.tags
				// Return posts where tags is not null or undefined
				return tags && tags.includes(tag)
			})
			const modDates = await Promise.all(taggedPosts.map((post) => getPostLastMod(post.filePath)))
			const lastMod = new Date(Math.max(...modDates)).toUTCString()
			return { urlLocation: `${settings.siteURL}tags/${tag}`, urlLastMod: lastMod }
		})
	)
	urlsData.push(...tagsData)

	return urlsData
}
