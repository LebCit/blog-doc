---
title: "Posts and Pages"
description: "Writing with Markdown"
featuredImage: "/static/images/posts-and-pages.avif"
publish_date: 2022-11-12
tags: [Posts, Pages, Server-Side]
published: true
---

Creating posts and pages manually in Blog-Doc is a breeze! Please keep in mind that creating posts and pages from the [administration interface](/bd-admin) is much easier and safer! Here’s a step-by-step guide to get you started:

<h3>Writing a Post</h3>

Create a Markdown file in the **posts** folder within the **views** directory.

1. **Title and Date**: Start by typing the title of your post. If the title contains any [special character](https://www.webopedia.com/definitions/special-character#How_to_Type_Special_Characters) it must be quoted! The publish_date must be in YYYY-MM-DD format (4 digits year - 2 digits month - 2 digits day).
2. **Description**: Add a brief description of your post. Quote it if it contains any special character!
3. **Featured Image**: Place your featured image in the **images** folder under the **static** directory. Use the path `/static/images/` followed by the image filename, like `/static/images/an_image.png`. Alternatively, you can link to any image online by using a URL like `https://link_to_an_image.com`.
4. **Tags**: Include relevant keywords for your post in the `tags` array. For example: `[Development, Node.js, Markdown]`.
5. **Published**: Set the state of the post to be published or saved as a draft for later use. Drafts are not available on the blog or in the list of published posts!

Here’s a front-matter snippet for your post:

```yaml
---
title: Your Post Title
publish_date: 2024-08-06
description: A brief description of your post
featuredImage: "/static/images/an_image.png"
tags: [Development, Node.js, Markdown]
published: true
---
```

After you’ve set everything up, your post will appear on the blog. Click on the title or the _Read the post_ button to view it.

> _Tip: For better SEO, use the same filename as your post title._  
> For a post titled **_Just Another Dev Journey Story_**, name your file `just-another-dev-journey-story.md`.

<h3>Creating a Page</h3>

The process for creating a page is similar:

1. **Markdown File**: Create a Markdown file in the **pages** folder within the **views** directory.
2. **Front-Matter**: If you’re using VS Code, press `Ctrl+spacebar` and select `Blog-Doc Page Frontmatter` to insert the following snippet:

    ```yaml
    ---
    title: Your Page Title
    description: A brief description of your page
    featuredImage: "/static/images/"
    published: true
    ---
    ```

3. **Filename**: Name your page file the same as its title for SEO purposes.

Your page will be available at a route that matches its filename. For example, a file named `contact-me.md` will be accessible at `https://domain-name/pages/contact-me`. You can then link to this page from the menu or anywhere else on your site.

Pages are usually informational, so there’s no need to add a date or tags.  
Remember, **everything in Blog-Doc can be customized to fit your needs**.

<h3>Additional Notes</h3>

-   **For Non-VS Code Users**: Manually copy and paste the front-matter snippets as shown above.
-   **Markdown Content**: Start writing your content two lines after the front-matter. Make sure to leave an empty line between the front-matter and your content.
-   **Markdown Parser**: For more info on the Markdown parser used by Blog-Doc, check out its [repository](https://github.com/markedjs/marked) or visit the [demo page](https://marked.js.org/demo/).

And that’s it! You’re all set to write posts and pages in Blog-Doc using Markdown. See you in the next one!