// Internal Modules
import { join } from "path"
import { writeFile } from "node:fs/promises"

// Internal Functions
import { getImages, getPages, getPosts } from "../../functions/blog-doc.js"
import { initializeApp } from "../../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../../config/settings.js"
const { siteTitle, footerCopyright } = settings

// Route to create a page or a post.
const data = {
	title: "Admin Create",
	description: `${siteTitle} Creation Page`,
}

export const adminCreateRoute = app
	.get("/admin-create", async (c) => {
		const res = eta.render("admin/layouts/adminCreate.html", {
			adminCreate: true,
			data: data,
			images: await getImages(),
			siteTitle: siteTitle,
			footerCopyright: footerCopyright,
		})
		return c.html(res)
	})

	.get("/check-admin-create", async (c) => {
		// Merge the pages and the posts arrays into a single array named mdFiles
		const pages = await getPages()
		const posts = await getPosts()
		const mdFiles = pages.concat(posts)
		// Create a new array called mdTitles populated by Markdown files titles
		const mdTitles = mdFiles.map((x) => x[0])
		// Send mdTitles array to the client
		return c.body(JSON.stringify(mdTitles))
	})

	.post("/admin-create", async (c) => {
		const {
			fileType,
			fileContents,
			pageTitle,
			pageDescription,
			pageImage,
			postTitle,
			postDate,
			postDescription,
			postImage,
			postTags,
		} = await c.req.parseBody()

		const pageContents = `---
title : ${pageTitle}
description: ${pageDescription}
featuredImage: ${pageImage}
---
${fileContents}`

		const postContents = `---
title : ${postTitle}
date: ${postDate.split("-").join("/")}
description: ${postDescription}
featuredImage: ${postImage}
tags: [${postTags}]
---
${fileContents}`

		const createdFilePath = `${join(process.cwd())}/views/${fileType}s`

		if (fileType === "page") {
			const createdPageName = pageTitle
				.toLowerCase()
				.replace(/[^a-zA-Z0-9-_ ]/g, "") // Remove special characters except hyphen and underscore
				.replace(/_+/g, "-") // Replace any number of underscore by one hyphen
				.replace(/\s+/g, "-") // Replace any number of space by one hyphen
				.replace(/^-+/, "") // Remove any number of hyphen at the beginning
				.replace(/-+/g, "-") // Replace any number of hyphen by one hyphen only
				.replace(/-+$/, "") // Remove any number of hyphen at the end

			writeFile(`${createdFilePath}/${createdPageName}.md`, pageContents, "utf8")
			return c.redirect(`/admin-create?created=/pages/${createdPageName}`)
		} else {
			const createdPostName = postTitle
				.toLowerCase()
				.replace(/[^a-zA-Z0-9-_ ]/g, "") // Remove special characters except hyphen and underscore
				.replace(/_+/g, "-") // Replace any number of underscore by one hyphen
				.replace(/\s+/g, "-") // Replace any number of space by one hyphen
				.replace(/^-+/, "") // Remove any number of hyphen at the beginning
				.replace(/-+/g, "-") // Replace any number of hyphen by one hyphen only
				.replace(/-+$/, "") // Remove any number of hyphen at the end

			writeFile(`${createdFilePath}/${createdPostName}.md`, postContents, "utf8")
			return c.redirect(`/admin-create?created=/posts/${createdPostName}`)
		}
	})
