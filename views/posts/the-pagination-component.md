---
title: The pagination component
date: 2022/11/10
description: Navigating between blog's pages
featuredImage: /images/pagination-component.avif
tags: [Blog-Doc, Blog, Pagination]
---

One of the functionalities that we have seen in [The Main Route](/the-main-route) is how the blog gets paginated under the hood. In this post, we will talk about the pagination component itself and see how it's rendered on the frontend.

The file **pagination.ejs** in the **components** folder under the **views** folder holds the logic behind the display and the look of the pagination component and is only used by the **postsList.ejs** file in the **layouts** folder under the **views** folder on line 19 :

```js
<% if (paginated) { %> <%- include('../components/pagination') %> ... <% } %>
```

The `paginated` condition is a passed data object to display or not the pagination component.

At the top of the **pagination.ejs** file, you can find a link to the stylesheet related to this component.

```html
<link rel="stylesheet" href="/css/pagination.css" />
```

Yes, an `.ejs` file is just `HTML` in which we can use plain `JavaScript` !

Those styles will only be available when the pagination component is displayed. This is very useful to avoid loading unnecessary styles in the app.

In [The Main Route](/the-main-route) we have seen that the pagination component will only be displayed for the homepage if the length off all the posts is greater than 5 :

```js
// /routes/mainRoute.js
const postsLength = getPosts().length // line 19
...
paginated: postsLength > 5 ? true : false // line 26
```

That's nice, but how the pagination works on the frontend ? How does it know where to go ?  
Well, if you look again in **pagination.ejs** on line 5, you'll see that the pagination for the homepage has a condition :

```js
if (firstPage && lastPage > 0)
```

Hey ! Where those data objects came from ?  
They also came from the **mainRoute.js** file under the **routes** folder.  
You can see in there that we have calculated the result of the last page on line 7 with the help of **getPosts.js** and **paginator.js** functions which are located under the **functions** folder :

```js
// /routes/mainRoute.js
const getPosts = require("../functions/getPosts") // line 3
const paginator = require("../functions/paginator") // line 4

const paginatedPosts = paginator(getPosts(), 1, 5) // line 6
const lastPage = paginatedPosts.total_pages - 1 // line 7
```

After that, always in the **mainRoute.js** file, we pass those data objects to the entry route `/` on line 24 & 25 :

```js
// /routes/mainRoute.js
router.get("/", (req, res) => {
	const newestFivePosts = getPosts().slice(0, 5)
	const postsLength = getPosts().length

	res.render("layouts/postsList", {
		titles: titles,
		posts: newestFivePosts,
		firstPage: true, // line 24
		lastPage: lastPage, // line 25
		paginated: postsLength > 5 ? true : false,
	})
})
```

So now, back to our condition in **pagination.ejs** on line 5, `firstPage` is true for the homepage and we are also checking that the `lastPage` exists as an extra layer of precaution. We can omit the use of this extra layer at this point, but since the pagination component have a particular display for the blog's last page, we need to pass this data object right here to make sure that their will be no future conflict when the `firstPage` is false and the `lastPage` exists. With both conditions acquired, we can display the pagination component for the homepage that will have a link to the **Older Posts**, page 1 of the blog, as well as a left chevron icon linking to the last page of the blog.

For the other pages of the blog, the condition is declared on line 26 :

```js
// /views/components/pagination.ejs
if (!firstPage)
```

We just check that we are not on the first page. Three scenarios can take place :

1. We are not on the last page but on any page between it and the homepage
2. We are on the last page which is not after the homepage
3. We are on the last page which is just after the homepage

In [The Main Route](/the-main-route), we have seen that the function **paginator.js** gives us some values that we can use to paginate our collection of posts, like the actual page, the previous page and the next page. By using this function in **mainRoute.js** on line 35 and passing it to the dynamic route `"/page/:actualBlogPage"` on line 40, we can access those values through the pagination component :

```js
// /routes/mainRoute.js
const paginatedPostsList = paginator(getPosts().slice(5), actualBlogPage, 5) // line 35
...
paginatedPostsList: paginatedPostsList // line 40
```

So, for the first scenario, we just have to check that the page we are on have at least one page after it. In other words, we check if their is a `next_page` property returned by the `paginatedPostsList` data object. A simplified explanation would be that we check if there are some previous posts rendered on a page after the page we are on. You can see it in **pagination.ejs** on line 31 :

```js
if (paginatedPostsList.next_page)
```

So if this condition is true, we display a link to the last page as well as a link to the previous page.

The same logic applies for the page before, but here we solve the last two scenarios together.  
We know for fact that there is a page before the one we are on, so we just check for the page before where the newer set of posts are rendered on line 53 :

```js
if (paginatedPostsList.prev_page)
```

So if this condition is true, we display a link to the homepage as well as a link to the next page, and that solves the second scenario.

> Don't be confused by the switch between previous and next here, remember that the posts are rendered by their publication's dates in descending order, newest to oldest !

For the third scenario, where the last page is the first page of the blog, the function will not return a value for the page before it since it's the first one, we check that the `prev_page` property of `paginatedPostsList` is not returned on line 73 with a simple `else` and if this condition is true we display a link to the homepage as well as a link to the previous page who's also the homepage, so 2 links to the homepage in different tastes.

And that's how the pagination component is rendered on the frontend, allowing us to navigate between the blog's pages.
