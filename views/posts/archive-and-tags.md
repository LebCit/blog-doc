---
title: Archive and tags
date: 2022/10/20
description: Archive and tags pages
tags: [Archive, Tags, Blog-Doc]
---

The archive and tags pages are very similar to the blog as mentioned before, except that they have no pagination. The archive is a reversed chronological list of all the posts in the blog, while the tags is an alphabetical ordered list of all the tags used in all the posts with the number of occurrence for each tag.  
In this post, we'll explore how those pages work behind the scene aka server-side.

## Archive route

Under the **routes** folder, the first file is **archiveRoute.js**. This tiny file collects all the posts and displays them on the `/archive` route using the **postsList.ejs** template located in the **layouts** folder under the **views** folder.

To understand the archive route file, you'll have to read the following posts :

1. [Express global router for a DRY code](https://lebcit.github.io/posts/express-global-router-for-a-dry-code/)
2. [Markdown blog with EJS](https://lebcit.github.io/posts/markdown-blog-with-ejs/)

The first post shoes us how to parse an express router to a global router variable. The second one is **very important** to understand the logic behind the process of writing in Markdown and rendering it on the frontend.

### Modifying archive's route

To modify the route on which the list of all the posts is displayed, you just have to change `/archive` on line 13 inside **archiveRoute.js** to whatever suits you. As an example, you can change it to `/posts` and the list will now be available on this route instead of the previous one.

> _Nota Bene : whenever you make a change, always check through the whole app for changes to be made according to the one you're making !_

Let's say you changed `/archive` to `/posts` in **archiveRoute.js**, you'll have to make the same modification in **postsList.ejs** on line 20, as well as in **menu.ejs** if you have their a link for that.

## Tags route

Under the **routes** folder, the last file is **tagsRoute.js**. This file has 2 tasks :

1. Display all the tags in the blog's posts
2. Display all the posts for a particular tag

The first task is accomplished by a function, defined in the **postsByTagCount.js** file under the **functions** folder, that creates an array of the tags from all the posts and sort them alphabetically then count the occurrence of each tag in this tags' array and return the result as an object.  
The function is parsed to a constant, `postsByTagCount`, in **tagsRoute.js** on line 3 :

```js
const postsByTagCount = require("../functions/postsByTagCount")
```

This constant is passed to the `/tags` route, `postsByTagCount: postsByTagCount()`, where we loop through the resulting object in **postsByTagCount.ejs** on line 18 :

```js
for (const property in postsByTagCount)
```

then we check inside the loop, on line 20, if each tag exists to avoid displaying a null tag in the list of tags if one or more post have no tag(s) :

```js
if (property !== "null")
```
