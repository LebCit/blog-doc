---
title: "The blog"
description: "How the blog works?"
featuredImage: "/static/images/the-blog.webp"
publish_date: 2022-10-05
tags: [Blog]
published: true
---

This post will give you an overview of the blog's design and features. We’ll look at how different elements are connected and how they work together. We'll also break down what’s essential for the blog to function properly and what’s optional.

<h2>Blog Design & Functionality</h2>

You’ll see that the [homepage](/), [archive](/posts) page, and  each individual tag page all have similar designs. They show a list of posts, though each page has slight design differences, with only the blog being paginated.

The blog sorts posts by their publication date, from newest to oldest, and displays the [number of posts per page](/bd-admin/set/site-settings#site-posts-per-page) as set in the settings. **If the total number of posts is fewer than the defined number, pagination won’t be applied!**

<h2>Single Post Preview</h2>

Each post is shown as a card like this one:

<img alt="Screenshot of a single post card in the blog" src="/static/images/screenshot-card-blog.png">

The design for this card is inspired by [Chyno Deluxe](https://codepen.io/ChynoDeluxe), which you can check out on his [Blog Cards](https://codepen.io/ChynoDeluxe/pen/bdXeqQ) CodePen.  
The card consists of two parts:

1. A featured image of the post
2. A brief preview of the post

**The featured image is optional**. If you don’t set one, a default fallback image will be used. You can change this fallback image to whatever suits your needs:

1. Upload your desired image to the [gallery](/bd-admin/set/images).
2. Select it in the [Post Preview Fallback Image](/bd-admin/set/site-settings) modal under the site's settings.

<h3>Publishing Date & Tags</h3>

When you hover over a post preview, the featured image zooms in slightly and rotates, covered by an overlay. This overlay shows the post’s publishing date and any associated tags, **if there are any**. Yes, **tags are optional**, but you must provide a the required properties/fields mentioned earlier in [No description or tags](/posts/no-description-or-tags) post.

Here’s how the hovered card looks:

<img alt="Screenshot of a hovered single post card in the blog" src="/static/images/screenshot-card-blog-hovered.png">

<h3>Brief Preview</h3>

The right side of the card includes the post’s **title**, **description**, the first **180 characters**, and a **Read the post** button that links to the full post. When you hover over this button, it expands slightly to the left, changes to a blue background with white text, and features an arrow to the right:

<img alt="Screenshot of a hovered button of a single post card in the blog" src="/static/images/screenshot-card-blog-read-hovered.png">

<h2>Pagination</h2>

As mentioned, pagination only kicks in if your blog has more posts than the defined number per page. Once you hit that threshold, pagination will appear at the bottom of each blog page.

The homepage will have a pagination link to **Older Posts** (page 1) and a left chevron icon to navigate to the last page.  
The last page will have a pagination link to **Newer Posts** and a right chevron icon to navigate to the first page.  
Pages in between will have links to **Older Posts**, **Newer Posts**, and chevron icons to navigate to both the first and last pages.

That’s all for now! I’ll dive deeper into pagination in a future post.

See you next time 😉