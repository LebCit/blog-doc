const posts = require("./getPosts")

module.exports = () => {
	// Create an array of the tags from all the posts and sort them alphabetically
	const tagsArray = posts()
		.flatMap((post) => post[1].data.tags)
		.sort()

	// Count the occurrence of each tag in the tagsArray an return the result as an object
	const tagsCountObject = tagsArray.reduce((acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc), {})

	return tagsCountObject
}
