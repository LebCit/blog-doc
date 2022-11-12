---
title: The files route
date: 2022/11/11
description: Rendering posts, pages and templates
featuredImage: /images/files-route.avif
tags: [Blog-Doc, Server-Side]
---

Under the routes folder lives the filesRoute.js file, it's the most important file of the app, the heart and soul of this tiny SSG. This file looks at three folders sitting under the **views** folder at the same time :

1. The **posts** folder 
2. The **pages** folder
3. The **templates** folder

It converts the content of the Markdown files in the **posts** and **pages** folders to `HTML` and renders each post, page, and `ESJ` template on a route matching it's filename. If the requested route doesn't match any file name inside those folders, the 404 error page will be displayed.

To understand how this file works, please take a look at it, it's pretty well documented.  
You can also read more about it on my personal blog :

1. [Markdown blog with EJS](https://lebcit.github.io/posts/markdown-blog-with-ejs/)
2. [Turn a Markdown blog to a simple SSG](https://lebcit.github.io/posts/turn-a-markdown-blog-to-a-simple-ssg/)

Since everything is explained inside the file itself and in the two articles mentioned above, I'm not going to elaborate further more about it here.

That will be all for the rendering of MarkDown and EJS files from one end to another, see you in the next one.
