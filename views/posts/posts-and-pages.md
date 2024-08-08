---
title: "Posts and Pages"
description: "Writing with Markdown"
featuredImage: "/static/images/posts-and-pages.avif"
publish_date: 2022-11-12
tags: [Posts, Pages, Server-Side]
published: true
---

```yaml
---
title:
date: 2022/11/12
description:
featuredImage: /static/images/
tags: []
---
```

Type the title of your post, the date is automatically generated, give it a short description, put its featured image in the **images** folder under the **static** folder and add the filename after `/static/images/` like `/static/images/an_image.png` or simply link to any image out there like `featuredImage: https://link_to_an_image.com`, and finally tag it with the appropriate keywords in the array of `tags` like `[Development, Node.js, Markdown]`.  
You should now be able to see your post on the blog and click on it's title or it's _Read the post_ button to access it !

> _Nota Bene: it's always a good idea to give your post the same file name as it's title for SEO !_

So if the title of your post will be **_Just another dev journey story_**, the filename should be `just-another-dev-journey-story.md`.

## Pages

The same logic applies to write a page. Create a Markdown file in the **pages** folder under the **views** folder. Press `Ctrl+spacebar` and choose the `Blog-Doc Page Frontmatter` to get the following snippet:

```yaml
---
title:
description:
featuredImage: /static/images/
---
```

Also, give your page the same file name as it's title for SEO.

The page will be rendered on a route matching its file name. As an example, if your page filename is `contact-me.md`, this page would be accessible on a route like `https://domain-name/pages/contact-me`. Then, you'll be able to add a link to your page in the menu or anywhere else that suits your needs.

A page is generally informational, which is why I didn't add a date or a tags' array to the pages.  
Keep in mind that **everything in Blog-Doc can be modified, adapted or improved**.

## Notes

If you don't use VS Code, copy and paste the post or page front-matter above.  
Please note that the content of a Markdown file starts two lines after its front-matter!  
You should leave an empty line between the front-matter and the beginning of your post!  
You can read more about the Markdown parser used for Blog-Doc by visiting its [repository](https://github.com/markedjs/marked).  
There is also a [demo page](https://marked.js.org/demo/) for this parser where you can see how it works.

And that's how simply you can write posts and pages using Markdown in Blog-Doc, see you in the next one.
