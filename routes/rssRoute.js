const router = global.router

const getPosts = require("../functions/getPosts")
const { siteURL } = require("../config/settings.json")

// Render RSS feed on the rss route
router.get("/rss", (req, res) => {
	res.set("Content-Type", "text/xml").render("layouts/rss", {
		siteURL: siteURL,
		posts: getPosts(),
	})
})

module.exports = router
