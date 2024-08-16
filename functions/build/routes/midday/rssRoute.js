// Helper functions
import { ensureFoldersExist } from "../../helpers/ensureFoldersExist.js"
import { writeFileWithHandling } from "../../helpers/writeFileWithHandling.js"

// Internal functions
import { processMarkdownPosts } from "../../../helpers/processMarkdownPosts.js"

/**
 * Function to create the RSS feed
 * ===============================
 */
export const rssRoute = async (app, settings) => {
	try {
		const posts = await processMarkdownPosts(app)

		function generatePostXml(post) {
			const { title, description, tags } = post.frontmatter

			// Helper function to generate URLs
			const generateUrl = (path) => `${settings.siteURL}${path}`

			// Generate XML for categories
			const categoriesXml = (tags || [])
				.map(
					(tag) => `
			<category domain="${generateUrl("tags/" + tag)}">${tag}</category>
				`
				)
				.join("")

			return `
		<item>
			<title>${title}</title>

			<link>${generateUrl("posts/" + post.fileBaseName)}</link>

			${description ? `<description>${description}</description>` : ""}
			${categoriesXml}
			<pubDate>${post.pubDate.toUTCString()}</pubDate>
		</item>
		`
		}

		const itemsXml = posts.map(generatePostXml).join("")

		const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="static/styles/rss-stylesheet.xsl"?>
<rss version="2.0">
	<channel>
		<!-- Channel Information -->

		<title>${settings.siteTitle}</title>

		<link>${settings.siteURL}</link>

		<description>${settings.siteDescription}</description>

		<language>${settings.rssSiteLanguage}</language>

		<copyright>${settings.rssCopyright}</copyright>

		<pubDate>${posts[0].pubDate.toUTCString()}</pubDate>

		<lastBuildDate>${posts[0].pubDate.toUTCString()}</lastBuildDate>

		<docs>https://www.rssboard.org/rss-specification</docs>
		
		<!-- Items (Content) -->
		${itemsXml}
	</channel>
</rss>`

		await ensureFoldersExist(["_site"])

		// Create XML file for the RSS feed
		await writeFileWithHandling(`_site/rss.xml`, xmlContent, "utf8")
	} catch (error) {
		console.error("Error in rssRoute:", error)
		throw error
	}
}
