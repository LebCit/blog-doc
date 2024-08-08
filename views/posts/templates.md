---
title: "Why Templates Are a Game Changer"
description: "Using template engine for specific pages"
featuredImage: "/static/images/templates.avif"
publish_date: 2022-11-13
tags: [Templates, Server-Side]
published: true
---

You might be wondering why we need a third type of file when we already have Markdown files for creating posts and pages. The magic of templates lies in their extended capabilities—they offer much more than your standard Markdown file can.

Templates allow for a unique design and structure, different from the fixed layouts of Markdown files. In the future, I plan to make templates editable directly from the admin interface, just like posts and pages, but that's a bit down the road.

<h3>Capabilities & Security</h3>

Let's start with a simple example: a contact form. Implementing a contact form with Markdown would require a lot of complex data handling in the front-matter and in the route where it's rendered. Not to mention, directly converting sensitive data to HTML poses significant security risks. Templates simplify this process and handle sensitive data more securely.

<h3>Architecture & Design</h3>

Blog-Doc processes Markdown content into HTML, which is then injected into templates for rendering. This means that the design and layout are controlled at the template level. While you can apply custom CSS for individual posts or pages directly in Markdown, creating a complete web page from Markdown alone would be cumbersome and inefficient.

Templates let us leverage the full power of plain JavaScript to create dynamic and customized HTML markup. This approach also means we can easily switch up the design for specific pages using different templates. Trying to achieve this level of flexibility with Markdown alone would be a tangled mess.

<h3>Conclusion</h3>

If you've been following along from the start, you should now have a solid grasp of how everything works under the hood—from the front-end display of components to the rendering of posts and pages. 

Feel free to use Blog-Doc as a starting point and customize it to fit your own design or template language. **For a real-world example, I rebuilt [my own blog](https://lebcit.github.io/) using Blog-Doc** ❤️

I genuinely hope this tool proves useful to many people out there. It’s my way of contributing to the Node.js and Markdown communities.