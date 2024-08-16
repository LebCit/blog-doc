// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { readFileWithHandling } from "../../helpers/readFileWithHandling.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { processMarkdownPosts } from "../../../helpers/processMarkdownPosts.js"
import { transformLinksToObjects } from "../../../helpers/transformLinksToObjects.js"

/**
 * Function to create the search page
 * ==================================
 */
export const searchRoute = async (app, settings) => {
	try {
		const posts = await processMarkdownPosts(app)

		let allPosts = JSON.parse(JSON.stringify(posts))
		allPosts.forEach((post) => {
			delete post.date
			delete post.fileDir
			delete post.filePath
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

		await ensureFoldersExist(["_site", "_site/search"])

		await app.renderToFile(
			`themes/${settings.currentTheme}/layouts/base.html`,
			{
				build: true,
				searchRoute: true,
				data: data,
				siteTitle: settings.siteTitle,
				siteDescription: settings.siteDescription,
				menuLinks: transformLinksToObjects(settings.menuLinks, "linkTarget", "linkTitle"),
				html_footerCopyright: settings.footerCopyright,
				currentYear: new Date().getFullYear(),
			},
			"_site/search/index.html" // Create HTML file for the search page
		)
	} catch (error) {
		console.error("Error in searchRoute:", error)
		throw error
	}
}
