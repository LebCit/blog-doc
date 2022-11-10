---
title: The blog
date: 2022/10/05
description: How the blog works ?
featuredImage: /images/the-blog.webp
tags: [Blog-Doc, Blog]
---

This post is an introduction to the blog design and functionalities. We'll explore how things are related and how they work together. We'll understand what's mandatory for the blog to work properly and what's optional.

## Blog's design & functionalities

You'll notice that the homepage, dedicated to the blog, shares with the archive page and the page of a particular tag almost the same design. They give us a view of existing posts, however their designs are slightly different, only the blog is paginated.

The blog sorts your posts by their publication's dates in descending order, newest to oldest, and displays only five posts on each page. **The blog will not be paginated if the number of posts is less then five !**

## Single post preview

Each post in the blog is represented by a card like the following one :

<img class="pure-img-responsive" alt="Screenshot of a single post card in the blog" src="/images/screenshot-card-blog.png">

First things first, the design of this card is the work of [Chyno Deluxe](https://codepen.io/ChynoDeluxe) that you can find on his [Blog Cards](https://codepen.io/ChynoDeluxe/pen/bdXeqQ) pen.  
The card is composed of two parts:

1. A featured image of the post
2. A brief preview of the post

**The featured image is optional**. If you don't assign a featured image to a post, a fallback image will be displayed. This fallback image can of course be changed depending on your needs.  
To change the fallback image :

1. Put your own image under the **images** folder located in the **public** folder.
2. Open the **singlePostPreview.ejs** file located in the **components** folder under the **views** folder. On line 30, replace the path to the `postFeaturedImage`. In other words, on line 30, replace `graphic-of-white-camera-on-black-background-no-image-available.webp` by the filename of your image.

### Publishing date & tag(s)

When the preview of a single post is hovered, a zoom in with a little rotation is applied to the featured image while it gets covered by an overlay.  
The overlay reveals the publishing date of the post and the tag(s) associated to this post **if any**. Yes, **if any means that you can choose to tag or not any post**, tagging a post is an optional feature while giving it a **publishing date is mandatory**, some logic please !

The hovered card will look like the following image :

<img class="pure-img-responsive" alt="Screenshot of a hovered single post card in the blog" src="/images/screenshot-card-blog-hovered.png">

### Brief preview

The right section of the card contains the post's **title**, **description**, first **180 characters**, and a **Read the post** button linking to the post itself, just like it's title.  
When this button is hovered, the previous effects are applied and the button expands a little bit to the left, gets a blue background while it's label becomes white and an arrow takes the available space to the right, like the following image :

<img class="pure-img-responsive" alt="Screenshot of a hovered button of a single post card in the blog" src="/images/screenshot-card-blog-read-hovered.png">

## Pagination

Like explained previously, the pagination will only work if your blog contains more than 5 posts. Once this number exceeded, a pagination will be displayed at the bottom of each blog's page.

The homepage will have a pagination to the **Older Posts**, page 1 of the blog, as well as a left chevron icon linking to the last page of the blog.  
The last page of the blog will have a pagination to the **Newer Posts**, as well as a right chevron icon linking to the first page of the blog.  
In between, every other page of the blog will have a pagination to the **Older Posts**, the **Newer Posts**, a left chevron icon linking to the last page of the blog and a right chevron icon linking to the first page of the blog.

This one ends here, I'll be talking more about the pagination later on.

See you in the next one 😉
