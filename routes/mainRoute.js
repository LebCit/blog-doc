const router = global.router

const getPosts = require("../functions/getPosts")
const paginator = require("../functions/paginator")

const paginatedPosts = paginator(getPosts(), 1, 5) // Paginate all the posts
const lastPage = paginatedPosts.total_pages - 1 // Get the last page

const titles = {
	docTitle: "Home",
	docDescription: "A tiny blog and documentation SSG app",
	title: "Bloc-Doc",
	subTitle: "A tiny blog and documentation SSG app",
}

// Render, at most, the newest five posts from the list of posts on the main route
router.get("/", (req, res) => {
	const newestFivePosts = getPosts().slice(0, 5) // Array of, at most, the newest five posts
	const postsLength = getPosts().length

	res.render("layouts/postsList", {
		titles: titles,
		posts: newestFivePosts,
		firstPage: true,
		lastPage: lastPage,
		paginated: postsLength > 5 ? true : false, // To display or not the pagination component on the main route
	})
})

// Dynamic route to display the list of posts without the newest five posts
router.get("/page/:actualBlogPage", (req, res) => {
	// Dynamic page number
	const actualBlogPage = req.params.actualBlogPage
	// Paginated array from the list of posts without the newest five posts
	const paginatedPostsList = paginator(getPosts().slice(5), actualBlogPage, 5)

	res.render("layouts/postsList", {
		titles: titles,
		posts: paginatedPostsList.data,
		paginatedPostsList: paginatedPostsList,
		firstPage: false,
		lastPage: lastPage,
		paginated: true, // To display the pagination component on each blog page route
	})
})

module.exports = router
