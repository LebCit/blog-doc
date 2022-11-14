const router = global.router

const matter = require("gray-matter")
const glob = require("glob")

// Find files ending with `.ejs` and `.md` in sub-directories of `views` and ignore `components` and `layouts` sub-directories.
glob("views/**/*(*.ejs|*.md)", { ignore: ["views/components/*", "views/layouts/*"] }, (err, files) => {
	if (err) {
		console.log(err)
		return
	}

	/**
	 * Glob returns an array of the full path for each file starting from `views` like the following example :
	 * ['views/pages/myPage.md',...,'views/posts/myPost.md',...,'views/templates/myTemplate.ejs'...].
	 * To Get an array of the files only, we map() the returned array from Glob (files)
	 * and split each path by specifying the slash `/` as a separator,
	 * then we use pop() to extract just the filename with it's extension.
	 */
	const filesArray = files.map((file) => file.split("/").pop())

	// Using a route parameter to render each post/page/template on a route matching it's filename
	router.get("/:filename", (req, res) => {
		// Get the file by searching in filesArray for a file matching the request parameter and any extension
		const fileWithExtension = filesArray.find(
			(file) => file === req.params.filename + file.match(/\.[0-9a-z]+$/i)[0]
		)
		// Get the path of that fileWithExtension by searching in the files array
		const path = files.find((file) => file.endsWith(fileWithExtension))

		// Markdown Files Logic
		if (fileWithExtension?.endsWith(".md")) {
			// `?` optional chaining operator to check if the variable is not nullish before accessing it
			// Read the Markdown file and parse it's front matter
			const file = matter.read(`${__dirname}/../${path}`)

			// Convert the Markdown file content to HTML with markdown-it
			// Allows HTML tags inside the Markdown file, use highlight.js with markdown-it and highlight inline code
			const md = require("markdown-it")({ html: true }).use(require("markdown-it-highlightjs"), { inline: true })
			const content = file.content // Read the Markdown file content
			const html = md.render(content) // Convert the Markdown file content to HTML

			const titles = {
				docTitle: file.data.title,
				docDescription: file.data.subTitle ? file.data.subTitle : file.data.description,
			}

			if (path?.startsWith("views/pages/")) {
				// Render the pagesTemplate for each page and pass it's front matter as a data object into pagesTemplate
				res.render("layouts/pagesTemplate", {
					titles: titles,
					title: file.data.title,
					subTitle: file.data.subTitle,
					pageContent: html,
				})
			} else {
				// Render the postsTemplate for each post and pass it's front matter as a data object into postsTemplate
				res.render("layouts/postsTemplate", {
					titles: titles,
					title: file.data.title,
					date: file.data.date,
					description: file.data.description,
					featuredImage: file.data.featuredImage,
					featuredImageAltText: file.data.featuredImageAltText,
					tags: file.data.tags,
					postContent: html,
				})
			}
		} else if (path?.startsWith("views/templates/")) {
			// Render the EJS template
			res.render(`templates/${fileWithExtension}`)
		} else {
			const titles = {
				docTitle: "Page Not Found",
				docDescription: "The server cannot find the requested resource",
			}
			// Render the 404 error page if no file in the pages, posts and templates sub-directories matches the filename request parameter
			res.status(404).render("layouts/error", {
				titles: titles,
				headerTitle: "Page Not Found",
				headerSubtitle: "Nothing to land on here !",
				imageSrc: "/images/404-not-found-error.png",
				imageAlt: "Sailor on a 404 mast looking out to sea",
			})
		}
	})
})

module.exports = router
