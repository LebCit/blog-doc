---
title: The pagination component
date: 2022/11/10
description: Navigating between blog's pages
featuredImage: /static/images/pagination-component.avif
tags: [Blog-Doc,Blog,Pagination]
---
One of the functionalities that we have seen in [The Main Route](/posts/the-main-route) is how the blog gets paginated under the hood. In this post, we will talk about the pagination component itself and see how it's rendered on the front-end.

The file `pagination.ejs` in the **components** folder under the **views** folder holds the logic behind the display and the look of the pagination component and is only used by the `index.ejs` file in the **layouts** folder under the **views** folder on line 72 :

```js
<% if (paginated) { %> <%- include('../components/pagination') %> ... <% } %>
```

The `paginated` condition is a passed data object to display or not the pagination component.

At the top of the `pagination.ejs` file, you can find a link to the stylesheet related to this component.

```html
<link rel="stylesheet" href="/css/pagination.css" />
```

Yes, an `.ejs` file is just `HTML` in which we can use plain `JavaScript` !

Those styles will only be available when the pagination component is displayed. This is very useful to avoid loading unnecessary styles in the app.

In [The Main Route](/posts/the-main-route) we have seen that the pagination component will only be displayed for the homepage if the length off all the posts is greater than the [defined number of posts per page](http://localhost:3000/admin-config-site/#posts-per-page) for the blog in the settings :

```js
// /routes/mainRoute.js

// Paginate all the posts. Set the first page to 1 and X posts per page. | Line 21
const paginatedPosts = paginator(posts, 1, postsPerPage)
// Get the total number of posts. | Line 24
const postsLength = paginatedPosts.total
...
// To display or not the pagination component on the main route. | Line 42
paginated: postsLength > postsPerPage ? true : false
```

That's nice, but how the pagination works on the front-end ? How does it know where to go ?  
Well, if you look again in `pagination.ejs` on line 4, you'll see that the pagination for the homepage has a condition :

```js
if (firstPage && lastPage > 0)
```

Hey ! Where those data objects came from ?  
They also came from the `mainRoute.js` file under the **routes** folder.  
You can see in there that we have calculated the result of the last page on line 24 with the help of `getPosts.js` and `paginator.js` functions which are located under the **functions** folder :

```js
// /routes/mainRoute.js

import { paginator } from "../functions/paginator.js" // Line 5
import { getPosts } from "../functions/getPosts.js" // Line 6
const posts = await getPosts() // Line 7
...
// Paginate all the posts. Set the first page to 1 and X posts per page. | Line 21
const paginatedPosts = paginator(posts, 1, postsPerPage)
// Get the last page number by removing 1 from the total number of pages. | Line 23
const lastPage = paginatedPosts.total_pages - 1
```

After that, always in the `mainRoute.js` file, we pass those data objects to the entry route `/` :

```js
// /routes/mainRoute.js

router.get("/", (req, res) => {
		res.render(`layouts/base`, {
			mainRoute: true,
			links: menuLinks,
			titles: titles,
			posts: newestPosts,
			firstPage: true, // Line 40
			lastPage: lastPage, // Line 41
			paginated: postsLength > postsPerPage ? true : false, // To display or not the pagination component on the main route.
			featuredImage: featuredImage,
			postPreviewFallbackImage: postPreviewFallbackImage,
			footerCopyright: footerCopyright,
		})
	})
```

So now, back to our condition in `pagination.ejs` on line 5, `firstPage`{language=js} is true for the homepage and we are also checking that the `lastPage`{language=js} exists as an extra layer of precaution. We can omit the use of this extra layer at this point, but since the pagination component have a particular display for the blog's last page, we need to pass this data object right here to make sure that their will be no future conflict when the `firstPage`{language=js} is false and the `lastPage`{language=js} exists. With both conditions acquired, we can display the pagination component for the homepage that will have a link to the **Older Posts**, page 1 of the blog, as well as a left chevron icon linking to the last page of the blog.

For the other pages of the blog, the condition is declared on line 25 :

```js
// /views/components/pagination.ejs
if (!firstPage)
```

We just check that we are not on the first page. Three scenarios can take place :

1. We are not on the last page but on any page between it and the homepage
2. We are on the last page which is not after the homepage
3. We are on the last page which is just after the homepage

In [The Main Route](/posts/the-main-route), we have seen that the function `paginator.js` gives us some values that we can use to paginate our collection of posts, like the actual page, the previous page and the next page. By using this function in `mainRoute.js` on line 54 and passing it to the dynamic route `"/page/:actualBlogPage"` on line 61, we can access those values through the pagination component :

```js
// /routes/mainRoute.js
const paginatedPostsList = paginator(posts.slice(postsPerPage), actualBlogPage, postsPerPage) // line 54
...
paginatedPostsList: paginatedPostsList // line 61
```

So, for the first scenario, we just have to check that the page we are on have at least one page after it. In other words, we check if their is a `next_page` property returned by the `paginatedPostsList`{language=js} data object. A simplified explanation would be that we check if there are some previous posts rendered on a page after the page we are on. You can see it in `pagination.ejs` on line 30 :

```js
if (paginatedPostsList.next_page)
```

So if this condition is true, we display a link to the last page as well as a link to the previous page.

The same logic applies for the page before, but here we solve the last two scenarios together.  
We know for fact that there is a page before the one we are on, so we just check for the page before where the newer set of posts are rendered on line 52 :

```js
if (paginatedPostsList.prev_page)
```

So if this condition is true, we display a link to the homepage as well as a link to the next page, and that solves the second scenario.

> Don't be confused by the switch between previous and next here, remember that the posts are rendered by their publication's dates in descending order, newest to oldest !

For the third scenario, where the last page is the first page of the blog, the function will not return a value for the page before it since it's the first one, we check that the `prev_page`{language=js} property of `paginatedPostsList`{language=js} is not returned on line 72 with a simple `else`{language=js} and if this condition is true we display a link to the homepage as well as a link to the previous page who's also the homepage, so 2 links to the homepage in different tastes.

And that's how the pagination component is rendered on the front-end, allowing us to navigate between the blog's pages.
