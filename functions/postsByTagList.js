const posts = require("./getPosts")

module.exports = (tag) => {
	// Filter the posts to retrieve an array of post(s) including the requested tag
	// Check if the post have tags, otherwise define them as an empty array
	const postsByTagArray = posts().filter((post) =>
		post[1].data.tags ? post[1].data.tags.includes(tag) : post[1].data.tags === []
	)

	return postsByTagArray
}
