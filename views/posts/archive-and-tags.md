---
title: Archive and tags
date: 2022/10/20
description: Archive and tags pages
featuredImage: /static/images/archive-and-tags.webp
tags: [Archive,Tags,Blog-Doc]
---
The archive and tags pages are very similar to the blog as mentioned before, except that they have no pagination. The archive is a reversed chronological list of all the posts in the blog, while the tags is an alphabetical ordered list of all the tags used in all the posts with the number of occurrence for each tag.  
In this post, we'll explore how those pages work behind the scene aka server-side.

## Archive route

Under the **routes** folder, the first file is `archiveRoute.js`. This tiny file collects all the posts and displays them on the `/posts` route using the `base.html` template located in the **layouts** folder under the **views** folder.

To understand the archive route file, you'll have to read the following posts :

1. [Express global router for a DRY code](https://lebcit.github.io/posts/express-global-router-for-a-dry-code/)
2. [Markdown blog with EJS](https://lebcit.github.io/posts/markdown-blog-with-ejs/)

The first post shoes us how to parse an express router to a global router variable. The second one is **very important** to understand the logic behind the process of writing in Markdown and rendering it on the front-end.

### Modifying archive's route

To modify the route on which the list of all the posts is displayed, you just have to change `/posts` on line 11 inside `archiveRoute.js` to whatever suits you. As an example, you can change it to `/archive` and the list will now be available on this route instead of the previous one.

> _Nota Bene: whenever you make a change, always check through the whole app for changes to be made according to the one you're making !_

## Tags route

Under the **routes** folder, the last file is `tagsRoute.js`. This file has 2 tasks:

1. Display all the tags in the blog's posts
2. Display all the posts for a particular tag

The first task is accomplished by a function defined in `blog-doc.js` under the **functions** folder, that creates an array of the tags from all the posts and sort them alphabetically then count the occurrence of each tag in this tags' array and return the result as an object.  
The function is imported to `tagsRoute.js` on line 2:

```
import { postsByTagCount, ... } from "../functions/blog-doc.js"
```

The function is then passed to the `/tags` route, `posts: await postsByTagCount()`, where we loop through the resulting object in `postsByTagCount.html` on line 2 :

```
for (const property in it.posts)
```

Then we check inside the loop, on line 4, if each tag exists and it's value is greater than 0, to avoid displaying a null tag in the list of tags if one or more post have no tag(s) :

```
if (property !== "null" && property !== "undefined")
```

### Tag route

The second task, leading to the display of all the posts for a particular tag, begins with a simple function living in `blog-doc.js` under the **functions** folder. This function, with a `(tag)` parameter, filters the posts to retrieve an array of post(s) including the requested tag, otherwise it returns an empty array.  
The function is imported in `tagsRoute.js` on line 5 :

```
import { ..., postsByTagList } from "../functions/blog-doc.js"
```

This function is used with the requested parameter (the requested tag) on line 31 inside the dynamic route `"/tags/:tag"` :

```
const tag = c.req.param("tag")
const postsByTag = await postsByTagList(tag)
```

Finally `postsByTag` is passed through the dynamic route as a data object :

```javascript
posts: postsByTag
```

This data object, the array of post(s) related to a single tag, is sent to the `base.html` file in the **layout** folder under the **views** folder, where it will be used by the `index.html` file living in the same folder :

```xml
// index.html | line 3
it.posts.forEach((post, index) => {...})
```

The file `index.html` is responsible of the look and feel of each and every post's preview. I'll be talking later on about this file in details.

A last thing to mention in the dynamic route is that if the returned array is empty, not even one post is related to the requested tag, the 404 error page is rendered.  
Try to hit a tag route that doesn't exists, as an example : [inexistent tag](/tags/INEXISTENTTAG).

### Modifying the tags route

Modifying the tags route is quite simple, all you have to do is to change the path `/tags` in `tagsRoute.js` on line 11 to whatever you desire.  
If you change it to `/hashtags`, the list of all available tags will now be displayed on this route instead of the previous one.

### Modifying tags' dynamic route

The route of each individual tag is defined by a parameter `/:tag` in the dynamic route `"/tags/:tag"`. There is absolutely no need to change the parameter by itself !  
Let's say you changed previously `/tags` to `/hashtags`. To keep some logic, you'll have to make the same modification in the dynamic route to `"/hashtags/:tag"`.

> _Nota Bene: whenever you make a change, always check through the whole app for changes to be made according to the one you're making !_

That's all for archive and tags, see you in the next one.
