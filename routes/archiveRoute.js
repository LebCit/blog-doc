const router = global.router

const getPosts = require("../functions/getPosts")

const titles = {
	docTitle: "Archive",
	docDescription: "A list of all the posts",
	title: "Archive",
	subTitle: "A list of all the posts",
}

// Render all the posts from the list of posts on the archive route
router.get("/archive", (req, res) => {
	res.render("layouts/postsList", {
		titles: titles,
		posts: getPosts(),
		paginated: false, // To hide the pagination component on the archive route
	})
})

module.exports = router
