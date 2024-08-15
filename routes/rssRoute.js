/**
 * Important: Do Not Delete or Modify This File!
 *
 * This file is critical for generating the RSS feed for your site's posts.
 * Removing or altering it will disrupt the RSS feed functionality.
 * Additionally, changes to this file will break the application!
 */

import { processMarkdownPosts } from "../functions/helpers/processMarkdownPosts.js"

// Global RSS Route
export const rssRoute = (app, settings) => {
	app.get("/rss", async (req, res) => {
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

		res.xml(xmlContent)
	})
}
