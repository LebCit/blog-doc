const router = global.router

const sitemap = require("../functions/sitemap")

// Render the sitemap on the sitemap route
router.get("/sitemap", (req, res) => {
	res.set("Content-Type", "text/xml").render("layouts/sitemap", {
		urls: sitemap(),
	})
})

module.exports = router
