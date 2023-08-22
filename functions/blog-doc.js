import { readFileSync } from "node:fs"
import { readdir } from "node:fs/promises"

class Blog_Doc {
	// Method to parse front-matter from Markdown files.
	parseFrontMatter(text, delimiter = "---") {
		const lines = text.split("\n")
		const frontmatter = {}

		let i = 0
		if (!lines[i].startsWith(delimiter)) {
			throw new Error("Front matter delimiter not found.")
		}

		i++
		while (i < lines.length && !lines[i].startsWith(delimiter)) {
			const line = lines[i].trim()
			const separatorIndex = line.indexOf(":")
			if (separatorIndex === -1) {
				throw new Error(`Invalid front matter syntax: ${line}`)
			}
			const key = line.slice(0, separatorIndex).trim()
			let value = line.slice(separatorIndex + 1).trim()

			// Check if value is wrapped in brackets
			if (value.startsWith("[") && value.endsWith("]")) {
				// Remove brackets and split into array elements
				const trimmedValue = value.slice(1, -1).trim()
				if (trimmedValue.length > 0) {
					value = trimmedValue.split(",").map((item) => item.trim())
				} else {
					value = []
				}
			}

			frontmatter[key] = value
			i++
		}

		if (i === lines.length) {
			throw new Error("End of front matter not found.")
		}

		const content = lines.slice(i + 1).join("\n")

		return {
			frontmatter,
			content,
		}
	}

	// Method to get files from their directory recursively.
	async getFiles(dirName) {
		let files = []
		const items = await readdir(dirName, { withFileTypes: true })

		try {
			for (const item of items) {
				if (item.isDirectory()) {
					files = [...files, ...(await getFiles(`${dirName}/${item.name}`))]
				} else {
					files.push(`${dirName}/${item.name}`)
				}
			}
		} catch (error) {
			console.error(error)
		}

		return files
	}

	// Method to get the pages and posts data.
	async getMarkdownData(dirname) {
		// Get the files from their directory (`views/pages` or `views/posts`)
		const files = await getFiles(dirname)
		// Only process Markdown files
		const mdFiles = files.filter((file) => file.endsWith(".md"))
		// Set the files data as an empty array
		const data = []
		// Read the contents of each Markdown file and push it's data into the data array as a new object
		mdFiles.forEach((file) => {
			const fileName = file.split("/").pop() // Markdown filename : my-file.md
			const contents = readFileSync(file, "utf-8") // Synchronously reads the entire contents of the file
			const fileData = parseFrontMatter(contents) // Parse the front-matter of the file
			const filePath = `${dirname}/${fileName}` // Get the file path
			const fileDir = filePath.split("/")[1] // Get the file directory
			const obj = { 0: fileName, 1: fileData } // Create the object that holds the file data
			obj.path = filePath // Add the file path to the object
			obj.dir = fileDir // Add the file directory to the object
			data.push(obj) // Push the object into the data array
		})

		return data
	}

	// Method to get the pages data.
	getPages() {
		const pagesData = getMarkdownData("views/pages")
		return pagesData
	}

	// Method to get the posts data.
	async getPosts() {
		const postsData = await getMarkdownData("views/posts")
		const newPostsData = postsData
			.map((obj) => {
				return { ...obj, date: new Date(obj[1].frontmatter.date) }
			})
			.sort((objA, objB) => Number(objB.date) - Number(objA.date))

		return newPostsData
	}

	// Method to get the images from their directory.
	async getImages() {
		let images = await getFiles("static/images")
		images = images.filter(
			(image) =>
				image !== "static/images/404-not-found-error.png" &&
				image !== "static/images/500-internal-server-error.png"
		)

		return images
	}

	// Method to count the occurrence of each tag from the posts front-matter.
	async postsByTagCount() {
		const posts = await getPosts()

		// Create an array of the tags from all the posts and sort them alphabetically
		const tagsArray = posts.flatMap((post) => post[1].frontmatter.tags).sort()

		// Count the occurrence of each tag in the tagsArray an return the result as an object
		const tagsCountObject = tagsArray.reduce((acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc), {})

		return tagsCountObject
	}

	// Method to return the posts of a particular tag.
	async postsByTagList(tag) {
		const posts = await getPosts()
		// Filter the posts to retrieve an array of post(s) including the requested tag
		// Check if the post have tags, otherwise define them as an empty array
		const postsByTagArray = posts.filter((post) =>
			post[1].frontmatter.tags ? post[1].frontmatter.tags.includes(tag) : post[1].frontmatter.tags === []
		)

		return postsByTagArray
	}

	// Method to return the previous and next posts of a particular post.
	async prevNext(filename) {
		const posts = await getPosts()
		// Get the index of each post in the posts array by it's filename
		const actualPostIndex = posts.findIndex((post) => post[0] === filename)
		// Get the previous post index while the actual post index is smaller than the posts array length - 1 (posts array length - 1 is the index of the last post)
		const previousPostIndex = actualPostIndex < posts.length - 1 ? actualPostIndex + 1 : null
		// Get the next post index while the actual post index is greater than 0 (0 is the index of the first post)
		const nextPostIndex = actualPostIndex > 0 ? actualPostIndex - 1 : null
		// Get the previous post by it's index while it's not the last post or return null
		const previousPost = previousPostIndex !== null ? posts[previousPostIndex][0].replace(".md", "") : null
		// Get the next post by it's index while it's not the first post or return null
		const nextPost = nextPostIndex !== null ? posts[nextPostIndex][0].replace(".md", "") : null
		// Get the previous post title by it's index while it's not the last post or return null
		const previousPostTitle = previousPostIndex !== null ? posts[previousPostIndex][1].frontmatter.title : null
		// Get the next post title while it's not the first post or return null
		const nextPostTitle = nextPostIndex !== null ? posts[nextPostIndex][1].frontmatter.title : null

		return {
			nextPost,
			nextPostTitle,
			previousPost,
			previousPostTitle,
		}
	}

	// Method to return the related posts of a particular post.
	async relatedPosts(filename) {
		const posts = await getPosts()
		// Get the post in the posts array by it's filename
		const actualPost = posts.find((post) => post[0] === filename)
		// Get the related posts from the front-matter of the actual post
		const relatedPostsArray = actualPost[1].frontmatter.relatedPosts
		// Set the related posts as an empty array
		let relatedPosts = []
		// Check if the actual post have a related posts array
		if (relatedPostsArray) {
			relatedPostsArray.forEach((relatedPost) => {
				// Get the data of each related post
				relatedPost = posts.find((post) => post[0] === `${relatedPost}.md`)
				// Push the data of each related post into the related posts array
				relatedPosts.push(relatedPost)
			})
		}
		return relatedPosts
	}

	// Method to list sub directories in directory. Used to get available themes.
	async getSubDirs(dirname) {
		const subDirs = (await readdir(dirname, { withFileTypes: true }))
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name)
		return subDirs
	}
}

export const {
	parseFrontMatter,
	getFiles,
	getMarkdownData,
	getPages,
	getPosts,
	getImages,
	postsByTagCount,
	postsByTagList,
	prevNext,
	relatedPosts,
	getSubDirs,
} = new Blog_Doc()
