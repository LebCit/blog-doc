---
title: The Main Route
publish_date: 2022-11-07
description: The blog behind the curtains
featuredImage: "/static/images/the-main-route.avif"
tags: [Blog, Server-Side]
published: true
---

The `mainRoute.js` file, found in the **default** folder within the **routes** directory, is where all the magic happens for the blog. It takes care of gathering, organizing, and showing the blog posts from the **posts** folder within the **views** directory.

Here’s a quick breakdown of how it works:

1. **Getting and Paginating Posts**: The file uses two main functions to handle posts:
    - One function fetches the posts.
    - Another function handles pagination (dividing posts into pages).

To understand how these functions work, you might want to check out [Markdown blog with EJS](https://lebcit.github.io/posts/markdown-blog-with-ejs/) for the basics of writing and displaying posts, and [Easiest Way to Paginate an Array in JavaScript](https://shouts.dev/articles/easiest-way-to-paginate-an-array-in-javascript) for a simple pagination method.

With these functions ready, the main tasks are straightforward:

1. **Display the Newest Posts**: The homepage shows the latest posts. We pull out the most recent posts and display them right on the homepage.

2. **Paginate the Rest**: For the remaining posts, we divide them into pages. This means we set up a system to show a specific number of posts per page and create links to navigate through them.

3. **Enable Pagination**: Pagination only shows up if there are more posts than fit on one page. So, if you have enough posts, you'll see page numbers to navigate through the older posts.

Here’s a simple rundown of the process:

1. **Showing the Latest Posts**: We grab the newest posts and show them on the homepage. If there are more posts, we add a pagination component to help navigate through them.

2. **Paginating the Remaining Posts**: For posts beyond the latest batch, we organize them into pages. This way, you can view older posts by navigating through different pages.

3. **Pagination Logic**: Pagination only kicks in if you have more posts than fit on one page. If so, you'll get pagination links to browse through older posts.

That’s a wrap on how the blog’s display and pagination work behind the scenes. Catch you in the next post!
