---
title: The Main Route
publish_date: 2022-11-07
description: The blog behind the curtains
featuredImage: "/static/images/the-main-route.avif"
tags: [Blog, Server-Side]
published: true
---
The` mainRoute.js` file, under the **routes** folder, is where all the functionalities of the blog are defined. It collects, paginates and displays, all the Markdown files in the **posts** folder under the **views** folder.

This file uses two functions to get the posts and paginate them :

1. `import { getPosts } from "../functions/blog-doc.js"`
2. `import { paginator } from "../functions/helpers.js"`

To understand how `getPosts` works, you should read [Markdown blog with EJS](https://lebcit.github.io/posts/markdown-blog-with-ejs/) who’s very important to understand the logic behind the process of writing in Markdown and rendering it on the front-end.  
On the other hand, the second one is a pagination function. There are a lot of modules to accomplish the desired output, one of the most popular is [Paginator](https://www.npmjs.com/package/paginator) but I didn't want to add another module to this app for a simple task nor reinvent the wheel, so I did a little research to find a ready made pagination that suits my needs and found it while reading the [Easiest Way to Paginate an Array in JavaScript](https://shouts.dev/articles/easiest-way-to-paginate-an-array-in-javascript).

With both functions ready to spin, the only task left was some logic.  
Since I decided to have the blog on the entry route `/`, and paginate it with a maximum of the [defined number of posts per page](/admin-config-site#posts-per-page), I just had to do the following steps :

1. get the newest **X** posts from the array of posts and display them on the homepage
2. get the rest of them and display them with a pagination of **X** posts per page
3. make the pagination available only if the blog have more than **X** posts

**1-** The first step is pretty easy, just slice out the newest five posts:

```javascript
// /routes/mainRoute.js

// Paginate all the posts. Set the first page to 1 and X posts per page. | Line 14
const paginatedPosts = paginator(posts, 1, settings.postsPerPage)
// Get the first X posts. | Line 15
const newestPosts = paginatedPosts.data
```

After acquiring those ones, we render them on the entry route `/` via `base.html` in the **layouts** folder under the **views** folder.  
To know if the first page should be paginated or not, we pass a data object that will display the pagination component only if the length off all the posts is greater than **X**:

```javascript
// /routes/mainRoute.js

// Get the total number of posts. | Line 17
const postsLength = paginatedPosts.total
...

// To display or not the pagination component on the main route. | Line 34
paginated: postsLength > settings.postsPerPage ? true : false,
```

**2-** The second step is a little bit trickier because it's not only a matter of slicing out the rest of the posts. We have to slice them out, _dynamically_ define the current page for each set once paginated, paginate them by a maximum of **X** posts per page. This is where the `paginator` function steps in to achieve this goal and returns the actual page, the previous page, the next page, the sliced posts' total, the total of the pages and the sliced posts themselves. We use this function in `mainRoute.js` to accomplish this task on line 60:

```javascript
// Paginated array from the list of posts without the newest X posts
const paginatedPostsList = paginator(posts.slice(settings.postsPerPage), actualBlogPage, settings.postsPerPage)
```

`actualBlogPage` is a parameter in the dynamic route `"/page/:actualBlogPage"` defined on line 58:

```javascript
// Dynamic page number
const actualBlogPage = c.req.param("actualBlogPage")
```

With this in place, the rest of the posts are now paginated in sets of **X**, we use `index.html` to render them on the dynamic route mentioned above and make sure to display the pagination component on each page coming after the homepage by passing a paginated data object on line 71:

```javascript
paginated: true
```

**3-** The third step is taken care off in the first step for the homepage and in the second step for each page after the homepage.

That's how the blog is getting displayed from behind the curtains to the stage, see you in the next one.
