---
title: Posts and Pages
date: 2022/11/12
description: Writing with Markdown
featuredImage: /images/posts-and-pages.avif
tags: [Blog-Doc, Posts, Pages, Server-Side]
---

This post is intended to show you how to format a Markdown file to write a post or a page. I think that the most important tool for this task is the IDE, Integrated Development Environment, that you're using. I'm using the one and only [VS Code](https://code.visualstudio.com/), the best IDE in my opinion, with [Prettier](https://prettier.io/) as a well known extension for VS Code [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). Another great VS Code extension to write in Markdown with ease is [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one). If you are using another IDE, look for an addon/plugin/extension to format your Markdown files while writing a post or a page.

## Posts

To write a post, head to the **posts** folder under the **views** folder and create a new Markdown file. A Markdown file ends with `.md`. If you are using VS Code, I've already setup snippets to generate Markdown front matter in the `.vscode` folder, all you have to do is press `Ctrl+spacebar` and choose the `Blog-Doc Post Frontmatter`, you'll be served with the following block :

```yaml
---
title:
date: 2022/11/12
description:
featuredImage: /images/
tags: []
---
```

Type the title of your post, the date is automatically generated, give it a short description, put it's featured image in the **images** folder under the **public** folder and add the filename after `/images/` like `/images/an_image.png` or simply link to any image out there like `featuredImage: https://link_to_an_image.com`, and finally tag it with the appropriate keywords in the array of `tags` like `[Development, Node.js, Markdown]`.  
You should now be able to see your post on the blog and click on it's title or it's _Read the post_ button to access it !

> _Nota Bene : it's always a good idea to give your post the same file name as it's title for SEO !_

So if the title of your post will be **_Just another dev journey story_**, the filename should be `just-another-dev-journey-story.md`.

## Pages

The same logic applies to write a page. Create a Markdown file in the **pages** folder under the **views** folder. Press `Ctrl+spacebar` and choose the `Blog-Doc Page Frontmatter` to get the following snippet :

```yaml
---
title:
subTitle:
---
```

Also, give your page the same file name as it's title for SEO.

The page will be rendered on a route matching it's file name. As an example, if your page filename is `contact-me.md`, this page would be accessible on a route like `https://domain-name/contact-me`. Then, you'll be able to add a link to your page in the menu or anywhere else that suits your needs.

A page is generally informational, which is why I didn't add a date, featured image or a tags' array to the pages.  
Keep in mind that **everything in Blog-Doc can be modified, adapted or improved**.

## Notes

If you don't use VS Code, copy and paste the post or page frontmatter above.  
Please note that the content of a Markdown file starts two lines after it's frontmatter !  
You should leave an empty line between the frontmatter and the beginning of your post !  
You can read more about the Markdown parser used for Blog-Doc by visiting it's [repository](https://github.com/markdown-it/markdown-it).  
There is also a [playground](https://markdown-it.github.io/) for this parser where you can see how it works.

And that's how simply you can write posts and pages using Markdown in Blog-Doc, see you in the next one.
