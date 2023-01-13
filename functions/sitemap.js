const fs = require("fs")
const glob = require("glob")

// Functions
const getPosts = require("./getPosts")
const postsByTagList = require("./postsByTagList")

// Settings
const { siteURL } = require("../config/settings.json")

module.exports = () => {
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
			const postLastMod = fs.statSync(`views/posts/${postTitle}`).mtimeMs
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
	const newestFivePosts = getPosts().slice(0, 5) // Array of, at most, the newest five posts
	postsObj(newestFivePosts, siteURL)

	// ARCHIVE ROUTE
	const archiveURL = siteURL + "archive"
	postsObj(getPosts(), archiveURL)

	// TAGS ROUTE
	const tagsURL = siteURL + "tags"
	postsObj(getPosts(), tagsURL)

	// BLOG ROUTES
	/**
	 * 1- Check if the array of posts is greater then 5.
	 * 2- Slice the array of posts into chunks of 5.
	 * 3- Remove the first chunk corresponding to the main route.
	 * 4- For each other chunk apply the postsObj() function.
	 */
	if (getPosts().length > 5) {
		function sliceIntoChunks(arr, chunkSize) {
			const res = []
			for (let i = 0; i < arr.length; i += chunkSize) {
				const chunk = arr.slice(i, i + chunkSize)
				res.push(chunk)
			}
			return res
		}

		let slicedArray = sliceIntoChunks(getPosts(), 5)
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
		let files = glob.sync("views/**/*(*.ejs|*.md)", {
			ignore: ["views/components/*", "views/layouts/*"],
		})
		files.forEach((file) => {
			const fileTitle = file
				.split("/")
				.pop()
				.replace(/\.[^/.]+$/, "")

			let fileLastMod = fs.statSync(file).mtimeMs
			let fileLastModDate = new Date(fileLastMod).toLocaleDateString().split("/").reverse().join("-")

			let fileObj = {
				urlLocation: siteURL + fileTitle,
				urlLastMod: fileLastModDate,
			}

			urlsData.push(fileObj)
		})
	}
	filesObj()

	// EACH TAG ROUTE
	function tagObj() {
		const allTagsArray = getPosts()
			.flatMap((post) => post[1].data.tags)
			.sort()

		// Remove duplicates from tagsArray using a Set
		const tagsArray = [...new Set(allTagsArray)]

		tagsArray.forEach((tag) => {
			// If tag is not undefined
			if (tag) {
				let tagLastMod

				const postsByTag = postsByTagList(tag)

				postsByTag.forEach((post) => {
					const postTitle = post[0]
					const postLastMod = fs.statSync(`views/posts/${postTitle}`).mtimeMs

					tagLastMod = new Date(postLastMod).toLocaleDateString().split("/").reverse().join("-")
				})

				let tagObj = {
					urlLocation: siteURL + "tags/" + tag,
					urlLastMod: tagLastMod,
				}

				urlsData.push(tagObj)
			}
		})
	}
	tagObj()

	return urlsData
}
