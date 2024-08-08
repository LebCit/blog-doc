---
title: The Markdown route
publish_date: 2022-11-11
description: Rendering posts and pages
featuredImage: "/static/images/files-route.avif"
tags: [Blog-Doc, Server-Side]
published: true
---

In the **default** folder within the **routes** directory, you'll find the `markdownRoute.js` file—this is essentially the heart and soul of [Blog-Doc](/posts/what-is-blog-doc). It’s responsible for handling the content of two key folders under the **views** directory:

1. The **posts** folder
2. The **pages** folder

This file takes the Markdown files from these folders and converts them into HTML. It then serves each post and page on a route that matches its filename. If someone tries to access a route that doesn’t correspond to any file in these folders, they’ll see a 404 error page.

To get a deeper understanding of how this works, I encourage you to check out the `markdownRoute.js` file itself—it’s well documented and should provide all the insights you need. You might also find these articles on my personal blog helpful:

1. [Markdown Blog with EJS](https://lebcit.github.io/posts/markdown-blog-with-ejs/)
2. [Turn a Markdown Blog into a Simple SSG](https://lebcit.github.io/posts/turn-a-markdown-blog-to-a-simple-ssg/)

Since the file and these articles cover everything in detail, there’s no need to go further here.

That’s a wrap on how Markdown and template engine files are rendered from start to finish. See you in the next post!
