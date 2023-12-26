// Helper functions
import { ensureFoldersExist } from "../helpers/ensureFoldersExist.js"
import { readFileWithHandling } from "../helpers/readFileWithHandling.js"
import { writeFileWithHandling } from "../helpers/writeFileWithHandling.js"

// Internal functions
import { getPosts } from "../../blog-doc.js"
import { initializeApp } from "../../initialize.js"
const { eta } = initializeApp()

// Settings
import { settings } from "../../../config/settings.js"

/**
 * Function to create the search page
 * ==================================
 */
export const searchRoute = async () => {
	try {
		const posts = await getPosts()

		let allPosts = JSON.parse(JSON.stringify(posts))
		allPosts.forEach((post) => {
			delete post.date
			delete post.dir
			delete post.path
		})

		const postsJSON = JSON.stringify(allPosts)
		await ensureFoldersExist(["_site", "_site/static/scripts"])

		// Create the `posts.json` file that holds the posts data
		await writeFileWithHandling(`_site/static/scripts/posts.json`, postsJSON, "utf8")

		const searchFile = await readFileWithHandling(`functions/search-${settings.currentTheme}.js`)
		const searchString = searchFile.toString()
		await ensureFoldersExist(["_site", "_site/static/scripts"])

		// Create the `search.js` file that displays the result of a research in the posts
		await writeFileWithHandling(`_site/static/scripts/search.js`, searchString, "utf8")

		const data = {
			title: "Search",
			description: "Make a research in the site's posts",
			featuredImage: settings.searchImage,
			favicon: settings.favicon,
		}

		const searchHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
			build: true,
			searchRoute: true,
			data: data,
			postPreviewFallbackImage: settings.postPreviewFallbackImage,
			siteTitle: settings.siteTitle,
			menuLinks: settings.menuLinks,
			footerCopyright: settings.footerCopyright,
		})

		await ensureFoldersExist(["_site", "_site/search"])

		// Create HTML file for the search page
		await writeFileWithHandling(`_site/search/index.html`, searchHTML, "utf8")
	} catch (error) {
		console.error("Error in searchRoute:", error)
		throw error
	}
}
