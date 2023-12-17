import { statSync } from "fs"

// Internal Functions
import { getFiles, getPosts } from "../functions/blog-doc.js"

const viewsFiles = await getFiles("views")
const posts = (await getPosts()).filter((post) => post[1].frontmatter.published == "true")

// Settings
import { readFile } from "node:fs/promises"
const { siteURL, postsPerPage } = JSON.parse(await readFile(new URL("../config/settings.json", import.meta.url)))

export function sitemap() {
	let urlsData = []

	/**
	 * This function loops through an array of posts,
	 * gets the newest modification date from those posts,
	 * creates an object with the location of those posts and their last modification date,
	 * then add the created object to the urlsData array.
	 * This function is used for the main route, the archive route, the tags route and the blog routes.
	 */
	function postsObj(array, url) {
		let arr = []
		let temp = 0

		array.forEach((post) => {
			const postTitle = post[0]
			const postLastMod = statSync(`views/posts/${postTitle}`).mtimeMs
			// Add the last modification date of each post into the empty array.
			arr.push(postLastMod)
		})

		// Get the biggest number out of arr. It's the last modification date for this list of posts.
		arr.forEach((msDate) => {
			if (temp < msDate) {
				temp = msDate
			}
		})

		// Return the last modification as a date with the format YYYY-MM-DD
		let urlLastMod = new Date(temp).toLocaleDateString().split("/").reverse().join("-")

		// Create the object for those posts
		let postsObj = {
			urlLocation: url,
			urlLastMod: urlLastMod,
		}

		// Add the postsObj to the urlsData array.
		urlsData.push(postsObj)
	}

	// MAIN ROUTE
	const newestPosts = posts.slice(0, postsPerPage) // Array of, at most, the newest X posts
	postsObj(newestPosts, siteURL)

	// ARCHIVE ROUTE
	const archiveURL = siteURL + "archive"
	postsObj(posts, archiveURL)

	// TAGS ROUTE
	const tagsURL = siteURL + "tags"
	postsObj(posts, tagsURL)

	// BLOG ROUTES
	/**
	 * 1- Check if the array of posts is greater then postsPerPage.
	 * 2- Slice the array of posts into chunks of postsPerPage.
	 * 3- Remove the first chunk corresponding to the main route.
	 * 4- For each other chunk apply the postsObj() function.
	 */
	if (posts.length > postsPerPage) {
		function sliceIntoChunks(arr, chunkSize) {
			const res = []
			for (let i = 0; i < arr.length; i += chunkSize) {
				const chunk = arr.slice(i, i + chunkSize)
				res.push(chunk)
			}
			return res
		}

		let slicedArray = sliceIntoChunks(posts, postsPerPage)
		slicedArray.shift()

		slicedArray.forEach((arr, idx) => {
			let pageURL = `${siteURL}page/${idx + 1}`
			postsObj(arr, pageURL)
		})
	}

	/**
	 * This function loops trough an array of files,
	 * and returns the location as well as the last modification date of each file as an object.
	 * This function is used for all the pages, posts and templates.
	 */
	function filesObj() {
		let files = viewsFiles.filter((path) => !path.startsWith(`views/admin`) && !path.startsWith(`views/themes`))
		files.forEach((file) => {
			const fileTitle = file
				.split("/")
				.pop()
				.replace(/\.[^/.]+$/, "")

			const fileDir = file.split("/")[1]

			let fileLastMod = statSync(file).mtimeMs
			let fileLastModDate = new Date(fileLastMod).toLocaleDateString().split("/").reverse().join("-")

			let fileObj = {
				urlLocation: `${siteURL + fileDir}/${fileTitle}`,
				urlLastMod: fileLastModDate,
			}

			urlsData.push(fileObj)
		})
	}
	filesObj()

	// EACH TAG ROUTE
	function tagObj() {
		const allTagsArray = posts.flatMap((post) => post[1].frontmatter.tags).sort()

		// Remove duplicates from tagsArray using a Set
		const tagsArray = [...new Set(allTagsArray)]

		tagsArray.forEach((tag) => {
			// Define an empty time array
			let timeArray = []
			// Get the posts in which the tag exist
			const postsByTagArray = posts.filter((post) =>
				post[1].frontmatter.tags.includes(tag) ? post[1].frontmatter.tags : post[1].frontmatter.tags == []
			)
			// Push into the time array the last modification time of each post of the tag
			postsByTagArray.forEach((post) => {
				const postTitle = post[0]
				const postLastMod = statSync(`views/posts/${postTitle}`).mtimeMs

				timeArray.push(postLastMod)
			})
			// Get the newest time from the time array
			const newestTime = Math.max.apply(Math, timeArray)
			// Change the tag's last modification time to a readable date.
			const tagLastMod = new Date(newestTime).toLocaleDateString().split("/").reverse().join("-")

			let tagObj = {
				urlLocation: siteURL + "tags/" + tag,
				urlLastMod: tagLastMod,
			}

			urlsData.push(tagObj)
		})
	}
	tagObj()

	return urlsData
}
