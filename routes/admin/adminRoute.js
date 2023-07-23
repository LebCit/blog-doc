// Internal Modules
import { writeFile, unlink } from "node:fs/promises"

// Internal Functions
import { getImages, getPages, getPosts } from "../../functions/blog-doc.js"
import { initializeApp } from "../../functions/initialize.js"
const { app, eta } = initializeApp()

// Settings
import { settings } from "../../config/settings.js"
const { siteTitle, footerCopyright } = settings

const adminRoutes = app
	.get("/admin", (c) => {
		const data = {
			title: "Administration",
			description: `${siteTitle} Administration`,
		}

		const res = eta.render("layouts/admin/admin.html", {
			admin: true,
			data: data,
			siteTitle: siteTitle,
			footerCopyright: footerCopyright,
		})
		return c.html(res)
	})

	// RENDER THE POSTS IN A TABLE ON THE admin-posts ROUTE.
	.get("/admin-posts", async (c) => {
		const data = {
			title: "Admin Posts",
			description: `${siteTitle} Posts`,
		}

		const res = eta.render("layouts/admin/adminTable.html", {
			adminTable: true,
			postsTable: true,
			data: data,
			posts: await getPosts(),
			siteTitle: siteTitle,
			footerCopyright: footerCopyright,
		})
		return c.html(res)
	})

	// RENDER THE PAGES IN A TABLE ON THE admin-pages ROUTE.
	.get("/admin-pages", async (c) => {
		const data = {
			title: "Admin Pages",
			description: `${siteTitle} Pages`,
		}

		const res = eta.render("layouts/admin/adminTable.html", {
			adminTable: true,
			pagesTable: true,
			data: data,
			pages: await getPages(),
			siteTitle: siteTitle,
			footerCopyright: footerCopyright,
			adminTable: true,
			pagesTable: true,
		})
		return c.html(res)
	})

const adminUpdateDelete = app
	// RENDER EACH FILE ON THE /admin-update/fileName ROUTE.
	.get("/admin-update/:filename", async (c) => {
		// Merge the pages and the posts arrays into a single array named files
		const pages = await getPages()
		const posts = await getPosts()
		const files = pages.concat(posts)
		// Find the file in the files array
		const file = files.find((file) => file[0] === `${c.req.param("filename")}.md`)

		const data = {
			title: `Update ${file[1].frontmatter.title}`,
			description: `Admin page to update ${file[1].frontmatter.title}`,
		}

		const res = eta.render("layouts/admin/adminUpdate.html", {
			adminUpdate: true,
			data: data,
			file: file,
			images: await getImages(),
			siteTitle: siteTitle,
			footerCopyright: footerCopyright,
		})
		return c.html(res)
	})

	// POST ON THE /admin-update/fileName ROUTE TO UPDATE.
	.post("/admin-update/:filename", async (c) => {
		const {
			filePath,
			pageTitle,
			pageDescription,
			pageImage,
			postTitle,
			postDate,
			postDescription,
			postImage,
			postTags,
			fileContents,
		} = await c.req.parseBody()

		const updatedFile = filePath.split("/").pop().replace(".md", "")

		if (filePath.startsWith("views/pages")) {
			const pageContents = `---
title: ${pageTitle}
description: ${pageDescription}
featuredImage: ${pageImage}
---
${fileContents}`

			await writeFile(`${filePath}`, pageContents, "utf8")
			return c.redirect(`/pages/${updatedFile}`, 301)
		} else {
			const postContents = `---
title: ${postTitle}
date: ${postDate.split("-").join("/")}
description: ${postDescription}
featuredImage: ${postImage}
tags: [${postTags}]
---
${fileContents}`

			await writeFile(`${filePath}`, postContents, "utf8")
			return c.redirect(`/posts/${updatedFile}`)
		}
	})

	// POST ON THE /delete/fileName ROUTE TO DELETE A FILE.
	.post("/delete/:filename", async (c) => {
		const { filePath } = await c.req.parseBody()
		// Promise-based operations return a promise that is fulfilled when the asynchronous operation is complete.
		try {
			await unlink(`${filePath}`)
			console.log(`successfully deleted ${filePath}`)
			return c.redirect(`/admin`)
		} catch (error) {
			console.error("there was an error:", error.message)
		}
	})

export { adminRoutes, adminUpdateDelete }
