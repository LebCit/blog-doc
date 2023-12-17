// Internal Functions
import { getPosts } from "../functions/blog-doc.js"
import { initializeApp } from "../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../config/settings.js"

// Render all the posts from the list of posts on the Archive Route.
export const archiveRoute = app.get("/posts", async (c) => {
	const posts = (await getPosts()).filter((post) => post[1].frontmatter.published == "true")

	const data = {
		title: "Archive",
		description: "A list of all the posts",
		featuredImage: settings.archiveImage,
		favicon: settings.favicon,
	}
	const res = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
		// Passing Route data
		archiveRoute: true,
		// Passing document data
		data: data,
		posts: posts,
		paginated: false, // To hide the pagination component on the archive route.
		// Passing document image data
		postPreviewFallbackImage: settings.postPreviewFallbackImage,
		// Passing needed settings for the template
		siteTitle: settings.siteTitle,
		menuLinks: settings.menuLinks,
		footerCopyright: settings.footerCopyright,
	})
	return c.html(res)
})
