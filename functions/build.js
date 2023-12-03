// Internal modules
import util from "util"
import * as fs from "node:fs"
import { join } from "path"
// External modules
import { Eta } from "eta"
import { marked } from "marked"

// Promisify
const mkdir = util.promisify(fs.mkdir)
const delDir = util.promisify(fs.rm)
const copyDir = util.promisify(fs.cp)
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

// Internal Functions
import { getPages, getPosts, prevNext, postsByTagCount, postsByTagList } from "./blog-doc.js"
import { idsInHeadings, paginator } from "./helpers.js"
import { sitemap } from "./sitemap.js"

// Settings
import { settings } from "../config/settings.js"

// Global Variables
const eta = new Eta({ views: join(process.cwd(), "views") })
const posts = await getPosts()

// Remove admin link from menu
delete settings.menuLinks.admin

async function build() {
	if (fs.existsSync("_site")) {
		await delDir("_site", { recursive: true })
	}

	try {
		// Create output directory
		await mkdir("_site", { recursive: true })
		await mkdir("_site/page", { recursive: true })
		await mkdir("_site/pages", { recursive: true })
		await mkdir("_site/posts", { recursive: true })
		await mkdir("_site/templates", { recursive: true })
		await mkdir("_site/tags", { recursive: true })
		await mkdir("_site/search", { recursive: true })
		await mkdir("_site/static", { recursive: true })

		// Copy static folder to _site/static
		await copyDir("static", "_site/static", { recursive: true })

		// Delete the admin folder in _site/static
		await delDir("_site/static/admin", { recursive: true })

		// MARKDOWN ROUTE
		async function markdownRoute() {
			// Merge the pages and the posts arrays into a single array named mdFiles
			const pages = await getPages()
			const mdFiles = pages.concat(posts)

			mdFiles.forEach(async (file) => {
				const fileName = file[0].replace(".md", "")
				const fileData = file[1].frontmatter
				fileData.favicon = settings.favicon
				const fileContent = marked.parse(file[1].content)

				// Create a folder for each file
				await mkdir(`_site/${file.dir}/${fileName}`, { recursive: true })

				const fileHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					// Passing Route data
					mdRoute: true,
					data: fileData,
					content: settings.addIdsToHeadings ? idsInHeadings(fileContent) : fileContent,
					prevNext: file.dir === "posts" ? await prevNext(file[0]) : null,
					filename: fileName,
					siteTitle: settings.siteTitle,
					menuLinks: settings.menuLinks,
					footerCopyright: settings.footerCopyright,
				})
				// Create HTML file out of each Markdown file.
				await writeFile(`_site/${file.dir}/${fileName}/index.html`, fileHTML, "utf8")
			})
		}
		markdownRoute()

		// MAIN ROUTE
		async function mainRoute() {
			const paginatedPosts = paginator(posts, 1, settings.postsPerPage)
			const newestPosts = paginatedPosts.data
			const lastPage = paginatedPosts.total_pages - 1
			const postsLength = paginatedPosts.total

			const data = {
				title: "Home",
				description: settings.siteDescription,
				featuredImage: settings.blogImage,
				favicon: settings.favicon,
			}

			const indexHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				mainRoute: true,
				firstPage: true,
				data: data,
				posts: newestPosts,
				lastPage: lastPage,
				paginated: postsLength > settings.postsPerPage ? true : false,
				postPreviewFallbackImage: settings.postPreviewFallbackImage,
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})
			// Create html file for the main route.
			await writeFile(`_site/index.html`, indexHTML, "utf8")

			// DYNAMIC MAIN ROUTE
			for (let i = 1; i <= lastPage; i++) {
				// Create a folder for each page of the blog
				await mkdir(`_site/page/${i}`, { recursive: true })

				// Paginated array from the list of posts without the newest X posts
				const paginatedPostsList = paginator(posts.slice(settings.postsPerPage), i, settings.postsPerPage)

				const dynamicIndexHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
					// Passing Route data
					mainRoute: true,
					firstPage: false,
					data: data,
					posts: paginatedPostsList.data,
					paginatedPostsList: paginatedPostsList,
					lastPage: lastPage,
					paginated: true,
					postPreviewFallbackImage: settings.postPreviewFallbackImage,
					siteTitle: settings.siteTitle,
					menuLinks: settings.menuLinks,
					footerCopyright: settings.footerCopyright,
				})
				// Create html file for each page after the main route.
				await writeFile(`_site/page/${i}/index.html`, dynamicIndexHTML, "utf8")
			}
		}
		mainRoute()

		// ARCHIVE ROUTE
		async function archiveRoute() {
			const data = {
				title: "Archive",
				description: "A list of all the posts",
				featuredImage: settings.archiveImage,
				favicon: settings.favicon,
			}

			const archiveHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				archiveRoute: true,
				data: data,
				posts: posts,
				paginated: false,
				postPreviewFallbackImage: settings.postPreviewFallbackImage,
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})
			// Create html file for the archive route.
			await writeFile(`_site/posts/index.html`, archiveHTML, "utf8")
		}
		archiveRoute()

		// TAGS ROUTE
		async function tagsRoute() {
			const data = {
				title: "Tags",
				description: "A list of all the tags",
				featuredImage: settings.tagsImage,
				favicon: settings.favicon,
			}

			const tagsHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
				tagsRoute: true,
				data: data,
				posts: await postsByTagCount(),
				siteTitle: settings.siteTitle,
				menuLinks: settings.menuLinks,
				footerCopyright: settings.footerCopyright,
			})
			// Create html file for the tags route.
			await writeFile(`_site/tags/index.html`, tagsHTML, "utf8")
		}
		tagsRoute()

		// DYNAMIC ROUTE FOR EACH TAG
		async function tagRoute() {
			const allTagsArray = posts.flatMap((post) => post[1].frontmatter.tags).sort()

			// Remove duplicates from tagsArray using a Set
			const tagsArray = [...new Set(allTagsArray)]

			tagsArray.forEach(async (tag) => {
				// If tag is not undefined
				if (tag) {
					// Create a folder for each tag
					await mkdir(`_site/tags/${tag}`, { recursive: true })

					const postsByTag = await postsByTagList(tag)

					const data = {
						title: postsByTag.length > 1 ? `Posts Tagged "${tag}"` : `Post Tagged "${tag}"`,
						description: `List of posts tagged ${tag}`,
						featuredImage: settings.tagImage,
						subTitle:
							postsByTag.length > 1 ? `${postsByTag.length} posts with this tag` : `1 post with this tag`,
						favicon: settings.favicon,
					}

					const tagHTML = eta.render(`themes/${settings.currentTheme}/layouts/base.html`, {
						// Passing Route data
						tagRoute: true,
						data: data,
						posts: postsByTag,
						paginated: false,
						postPreviewFallbackImage: settings.postPreviewFallbackImage,
						siteTitle: settings.siteTitle,
						menuLinks: settings.menuLinks,
						footerCopyright: settings.footerCopyright,
					})
					// Create html file for each tag.
					await writeFile(`_site/tags/${tag}/index.html`, tagHTML, "utf8")
				}
			})
		}
		tagRoute()

		// RSS ROUTE
		async function rssRoute() {
			const rssXML = eta.render(`themes/${settings.currentTheme}/layouts/rss.html`, {
				siteTitle: settings.siteTitle,
				siteDescription: settings.siteDescription,
				siteURL: settings.siteURL,
				rssSiteLanguage: settings.rssSiteLanguage,
				rssCopyright: settings.rssCopyright,
				posts: posts,
			})
			// Create xml file for the RSS feed.
			await writeFile(`_site/rss.xml`, rssXML, "utf8")
		}
		rssRoute()

		// SITEMAP ROUTE
		async function sitemapRoute() {
			const sitemapXML = eta.render(`themes/${settings.currentTheme}/layouts/sitemap.html`, {
				urls: sitemap(),
			})
			// Create xml file for the sitemap.
			await writeFile(`_site/sitemap.xml`, sitemapXML, "utf8")
		}
		sitemapRoute()

		// SEARCH ROUTE
		async function search() {
			let allPosts = JSON.parse(JSON.stringify(posts))
			allPosts.forEach((post) => {
				delete post.date
				delete post.dir
				delete post.path
			})
			const postsJSON = JSON.stringify(allPosts)
			await writeFile(`_site/static/scripts/posts.json`, postsJSON, "utf8")

			const searchFile = await readFile(`functions/search-${settings.currentTheme}.js`)
			const searchString = searchFile.toString()
			await writeFile("_site/static/scripts/search.js", searchString, "utf8")

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
			// Create html file for the search route.
			await writeFile(`_site/search/index.html`, searchHTML, "utf8")
		}
		if (settings.searchFeature) search()
	} catch (error) {
		console.log(error)
	}
}
build()
