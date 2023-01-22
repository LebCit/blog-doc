const router = global.router

const getPosts = require("../functions/getPosts")

const titles = {
	docTitle: "Search",
	docDescription: "Make a research in the site's posts",
	title: "Search",
	subTitle: "Make a research in the site's posts",
}

// Render the search form on the search route.
router.get("/search", (req, res) => {
	res.render("layouts/search", {
		titles: titles,
	})
})

// Render the search result(s) of a query
router.get("/search/:query", (req, res) => {
	const query = req.params.query
	const reg = new RegExp(query, "gi")

	const titleSearch = getPosts().filter((post) => post[1].data.title.match(reg))
	const contentSearch = getPosts().filter((post) => post[1].content.match(reg))

	// Concatenate the results of titleSearch and contentSearch
	const concat = titleSearch.concat(contentSearch)

	// Get the unique result(s) by removing duplicates from concat array
	const uniqueProps = []
	const result = concat.filter((post) => {
		const isDuplicate = uniqueProps.includes(post[1].data.title)

		if (!isDuplicate) {
			uniqueProps.push(post[1].data.title)

			return true
		}

		return false
	})

	// If the result array is not empty
	if (result.length > 0) {
		const resultLength = result.length
		// Render the search page with the resultant post(s)
		res.render("layouts/search", {
			titles: titles,
			posts: result,
			resultLength: resultLength,
			results: true,
		})
	} else {
		/**
		 * If the result array is empty,
		 * render the search page,
		 * with a message.
		 */
		res.render("layouts/search", {
			titles: titles,
			noResults: true,
		})
	}
})

// Redirect a search to the result(s) of a query
router.post("/search", (req, res) => {
	const { searchString } = req.body
	res.redirect(`/search/${searchString}`)
})

module.exports = router
