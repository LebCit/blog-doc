const util = require("util")
const fs = require("fs")
const ejs = require("ejs")
const matter = require("gray-matter")
const glob = require("glob")

// Promisify
const mkdir = util.promisify(fs.mkdir)
const delDir = util.promisify(fs.rm)
const copyDir = util.promisify(fs.cp)
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

// Functions
const getPosts = require("./getPosts")
const paginator = require("./paginator")
const postsByTagCount = require("./postsByTagCount")
const postsByTagList = require("./postsByTagList")
const newHTML = require("./newHTML")
const sitemap = require("./sitemap")

// Settings
const { siteURL, searchFeature } = require("../config/settings.json")

async function build() {
	if (fs.existsSync("_site")) {
		await delDir("_site", { recursive: true })
	}
	if (fs.existsSync("_site/page")) {
		await delDir("_site/page", { recursive: true })
	}
	if (fs.existsSync("_site/tags")) {
		await delDir("_site/tags", { recursive: true })
	}

	try {
		// Create output directory
		await mkdir("_site", { recursive: true })
		await mkdir("_site/page", { recursive: true })
		await mkdir("_site/tags", { recursive: true })

		// Copy public folder to _site
		await copyDir("public", "_site", { recursive: true })

		// FILES ROUTE
		glob("views/**/*(*.ejs|*.md)", { ignore: ["views/components/*", "views/layouts/*"] }, (err, files) => {
			/**
			 * Find files ending with `.ejs` and `.md` in sub-directories of `views` and ignore `components` and `layouts` sub-directories.
			 * Glob returns an array of the full path for each file starting from `views` like the following example :
			 * ['views/pages/myPage.md',...,'views/posts/myPost.md',...,'views/templates/myTemplate.ejs'...].
			 */
			if (err) {
				console.log(err)
				return
			}

			files.forEach(async (file) => {
				// Get each file name
				const fileWithoutExtension = file
					.split("/")
					.pop()
					.replace(/\.[^/.]+$/, "")
				// Markdown Files Logic
				if (file?.endsWith(".md")) {
					// Read the Markdown file and parse it's front matter
					const mdFile = matter.read(file)

					// Convert the Markdown file content to HTML with markdown-it
					// Allows HTML tags inside the Markdown file, use highlight.js with markdown-it and highlight inline code
					const md = require("markdown-it")({ html: true }).use(require("markdown-it-highlightjs"), {
						inline: true,
					})
					const content = mdFile.content // Read the Markdown file content
					const html = md.render(content) // Convert the Markdown file content to HTML

					const titles = {
						docTitle: mdFile.data.title,
						docDescription: mdFile.data.subTitle ? mdFile.data.subTitle : mdFile.data.description,
					}

					if (file?.startsWith("views/pages/")) {
						const pageHTML = await ejs.renderFile("views/layouts/pagesTemplate.ejs", {
							titles: titles,
							title: mdFile.data.title,
							subTitle: mdFile.data.subTitle,
							pageContent: newHTML(html),
							build: true,
						})
						// Create html file out of each Markdown page.
						await writeFile(`_site/${fileWithoutExtension}.html`, pageHTML, "utf8")
					} else {
						const actualPostIndex = getPosts().findIndex((post) => post[0] === `${fileWithoutExtension}.md`)
						const previousPostIndex = actualPostIndex < getPosts().length - 1 ? actualPostIndex + 1 : null
						const nextPostIndex = actualPostIndex > 0 ? actualPostIndex - 1 : null
						const previousPost =
							previousPostIndex !== null ? getPosts()[previousPostIndex][0].replace(".md", "") : null
						const nextPost = nextPostIndex !== null ? getPosts()[nextPostIndex][0].replace(".md", "") : null
						const previousPostTitle =
							previousPostIndex !== null ? getPosts()[previousPostIndex][1].data.title : null
						const nextPostTitle = nextPostIndex !== null ? getPosts()[nextPostIndex][1].data.title : null

						const postHTML = await ejs.renderFile("views/layouts/postsTemplate.ejs", {
							titles: titles,
							title: mdFile.data.title,
							date: mdFile.data.date,
							description: mdFile.data.description,
							featuredImage: mdFile.data.featuredImage,
							featuredImageAltText: mdFile.data.featuredImageAltText,
							tags: mdFile.data.tags,
							postContent: newHTML(html),
							previousPost: previousPost,
							nextPost: nextPost,
							previousPostTitle: previousPostTitle,
							nextPostTitle: nextPostTitle,
							build: true,
						})
						// Create html file out of each Markdown post.
						await writeFile(`_site/${fileWithoutExtension}.html`, postHTML, "utf8")
					}
				} else if (file.startsWith("views/templates/")) {
					// EJS Files Logic
					const templateHTML = await ejs.renderFile(file, {
						build: true,
					})
					const newTemplateHTML = newHTML(templateHTML)
					// Create html file out of each EJS template.
					await writeFile(`_site/${fileWithoutExtension}.html`, newTemplateHTML, "utf8")
				}
			})
		})

		// MAIN ROUTE
		async function mainRoute() {
			const paginatedPosts = paginator(getPosts(), 1, 5) // Paginate all the posts
			const lastPage = paginatedPosts.total_pages - 1 // Get the last page

			const titles = {
				docTitle: "Home",
				docDescription: "A tiny blog and documentation SSG app",
				title: "Bloc-Doc",
				subTitle: "A tiny blog and documentation SSG app",
			}

			const newestFivePosts = getPosts().slice(0, 5) // Array of, at most, the newest five posts
			const postsLength = getPosts().length

			const indexHTML = await ejs.renderFile("views/layouts/postsList.ejs", {
				titles: titles,
				posts: newestFivePosts,
				firstPage: true,
				lastPage: lastPage,
				paginated: postsLength > 5 ? true : false, // To display or not the pagination component on the main route
				build: true,
			})
			// Create html file for the main route.
			await writeFile(`_site/index.html`, indexHTML, "utf8")

			// DYNAMIC MAIN ROUTE
			for (let i = 1; i <= lastPage; i++) {
				// Paginated array from the list of posts without the newest five posts
				const paginatedPostsList = paginator(getPosts().slice(5), i, 5)

				const dynamicIndexHTML = await ejs.renderFile("views/layouts/postsList.ejs", {
					titles: titles,
					posts: paginatedPostsList.data,
					paginatedPostsList: paginatedPostsList,
					firstPage: false,
					lastPage: lastPage,
					paginated: true, // To display the pagination component on each blog page route
					dynamic: true,
				})
				// Create html file for each page after the main route.
				await writeFile(`_site/page/${i}.html`, dynamicIndexHTML, "utf8")
			}
		}
		mainRoute()

		// ARCHIVE ROUTE
		async function archiveRoute() {
			const titles = {
				docTitle: "Archive",
				docDescription: "A list of all the posts",
				title: "Archive",
				subTitle: "A list of all the posts",
			}

			const archiveHTML = await ejs.renderFile("views/layouts/postsList.ejs", {
				titles: titles,
				posts: getPosts(),
				paginated: false, // To hide the pagination component on the archive route
				build: true,
			})
			// Create html file for the archive route.
			await writeFile(`_site/archive.html`, archiveHTML, "utf8")
		}
		archiveRoute()

		// TAGS ROUTE
		async function tagsRoute() {
			const titles = {
				docTitle: "Tags",
				docDescription: "A list of all the tags",
				title: "Tags",
				subTitle: "A list of all the tags",
			}

			const tagsHTML = await ejs.renderFile("views/layouts/postsByTagCount.ejs", {
				titles: titles,
				postsByTagCount: postsByTagCount(),
				build: true,
			})
			// Create html file for the tags route.
			await writeFile(`_site/tags.html`, tagsHTML, "utf8")
		}
		tagsRoute()

		// DYNAMIC ROUTE FOR EACH TAG
		async function tagRoute() {
			const allTagsArray = getPosts()
				.flatMap((post) => post[1].data.tags)
				.sort()

			// Remove duplicates from tagsArray using a Set
			const tagsArray = [...new Set(allTagsArray)]

			tagsArray.forEach(async (tag) => {
				// If tag is not undefined
				if (tag) {
					const postsByTag = postsByTagList(tag)

					const titles = {
						docTitle: `Posts Tagged "${tag}"`,
						docDescription: `List of posts tagged ${tag}`,
						title: postsByTag.length > 1 ? `Posts Tagged "${tag}"` : `Post Tagged "${tag}"`,
						subTitle:
							postsByTag.length > 1 ? `${postsByTag.length} posts with this tag` : "1 post with this tag",
					}

					const tagHTML = await ejs.renderFile("views/layouts/postsList.ejs", {
						titles: titles,
						posts: postsByTag,
						paginated: false, // To hide the pagination component on any requested tag route
						dynamic: true,
					})
					// Create html file for each tag.
					await writeFile(`_site/tags/${tag}.html`, tagHTML, "utf8")
				}
			})
		}
		tagRoute()

		// RSS ROUTE
		async function rssRoute() {
			const rssXML = await ejs.renderFile("views/layouts/rss.ejs", {
				siteURL: siteURL,
				posts: getPosts(),
				build: true,
			})
			// Create xml file for the RSS feed.
			await writeFile(`_site/rss.xml`, rssXML, "utf8")
		}
		rssRoute()

		// SITEMAP ROUTE
		async function sitemapRoute() {
			const sitemapXML = await ejs.renderFile("views/layouts/sitemap.ejs", {
				urls: sitemap(),
				build: true,
			})
			// Create xml file for the sitemap.
			await writeFile(`_site/sitemap.xml`, sitemapXML, "utf8")
		}
		sitemapRoute()

		// SEARCH ROUTE
		async function search() {
			let posts = getPosts()
			posts.forEach((post) => {
				delete post.date
				delete post[1].excerpt
				delete post[1].isEmpty
				delete post[1].path
				delete post[1].orig
			})
			const postsJSON = JSON.stringify(posts)
			await writeFile(`_site/js/posts.json`, postsJSON, "utf8")

			const searchFile = await readFile("functions/search.js")
			const searchString = searchFile.toString()
			await writeFile("_site/js/search.js", searchString, "utf8")

			const titles = {
				docTitle: "Search",
				docDescription: "Make a research in the site's posts",
				title: "Search",
				subTitle: "Make a research in the site's posts",
			}

			const searchHTML = await ejs.renderFile("views/layouts/search.ejs", {
				titles: titles,
				searchJs: true,
				build: true,
			})
			// Create html file for the search route.
			await writeFile(`_site/search.html`, searchHTML, "utf8")
		}
		if (searchFeature) search()
	} catch (error) {
		console.log(error)
	}
}
build()
