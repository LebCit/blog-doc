const fs = require("fs")
const matter = require("gray-matter")

module.exports = () => {
	// Get the posts from their directory
	const posts = fs.readdirSync(`${__dirname}/../views/posts`).filter((post) => post.endsWith(".md"))
	// Set the post content as an empty array
	const postContent = []
	// Inject into the post content array the front matter
	posts.forEach((post) => {
		postContent.push(matter.read(`${__dirname}/../views/posts/${post}`))
	})

	/**
	 * 1- Return a list of posts as a two dimensional array containing for each one :
	 * . the post filename with it's extension (e.g : postFilename.md)
	 * . the post content as an object {content:"Markdown content as a string", data:{front matter}, excerpt:""}
	 * 2- Return each array as an object and create a Date instance from it's date front matter
	 * 3- Sort posts by publication's date in descending order (newest to oldest)
	 */
	const postsList = posts
		.map((post, i) => {
			return [post, postContent[i]]
		})
		.map((obj) => {
			return { ...obj, date: new Date(obj[1].data.date) }
		})
		.sort((objA, objB) => Number(objB.date) - Number(objA.date))

	return postsList
}
