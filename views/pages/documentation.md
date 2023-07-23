---
title: Blog-Doc's documentation
description: Why and how to use Blog-Doc?
featuredImage: 
---

# Blog-Doc

The Simplest Node.js CMS & SSG!<br />
A tiny flame in the darkness of error...

## Motivation & Purpose

_With all due respect to the time and hard work of each and every developer who made a Static Site Generator with Node.js, **including the previous versions of Blog-Doc**, those are gasworks!_<br />
_I offer my sincerest apologies in advance to each one of these developers, but an app is not supposed to be a gasworks..._<br />
**Please read [From 145 to 7 💪](https://lebcit.github.io/posts/from-145-to-7/)**<br />
**Also read [The New Blog-Doc](/posts/the-new-blog-doc)**

## Requirements

1. Blog-Doc works on [Node.js](https://nodejs.org/en) versions greater than 18.x.<br />
    1. Use the latest version of each major release.
2. The latest version of [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Solid stack of technologies 🪨

### Backend (input)

-   Node.js 18.x or higher.
-   [Hono](https://hono.dev/), small, simple, and ultrafast web framework for the Edges.
-   [Eta](https://eta.js.org/), lightweight, powerful, pluggable embedded JS template engine.
-   [Marked](https://marked.js.org/), Markdown parser and compiler. Built for speed.

### Frontend (output)

-   HTML, CSS and a tiny JS file.

## Blazing fast and simple 🚀

-   A zero code configuration static site generator.
-   Ready to use on your Node.js server as a Node.js CMS.
-   Ready to use, after build, as a static site.
-   Without any unnecessary functionalities, loads in a blink of an eye.
-   Easy to install and use.

## Design 🎨

-   Responsive, elegant and simple layout.
-   Ready to use template for blog and/or documentation.
-   Easy to modify if you opt for another design.

## Features ⚡

-   Administrate your app from the front-end! ![Settings icon](/static/icons/settings.svg)
-   [Gallery](#the-gallery) to upload your images ![Image upload icon](/static/icons/photo-up.svg)
-   Create, Read, Update & Delete your pages and posts ![Pencil icon](/static/icons/pencil.svg)
-   Paginated blog with chosen number of posts per page ![Left and right arrows icon](/static/icons/arrows-left-right.svg)
-   Posts pagination to navigate between your posts ![Arrow left and right icon](/static/icons/arrow-left-right.svg)
-   Write your content in Markdown ![Markdown icon](/static/icons/markdown.svg)
-   Ability to use HTML in Markdown ![HTML5 icon](/static/icons/brand-html5.svg)
-   Tag(s) for posts ![Tags icon](/static/icons/tags.svg)
-   Featured image for posts and pages ![Image icon](/static/icons/photo.svg)
-   Archive route for posts ![Archive icon](/static/icons/archive.svg)
-   Tags list route ![Bookmarks icon](/static/icons/bookmarks.svg)
-   Individual route for each tag ![Bookmark icon](/static/icons/bookmark.svg)
-   Titles & Meta Descriptions ![H1 icon](/static/icons/h-1.svg)
-   Drag and drop your menu links to sort them ![Menu order icon](/static/icons/menu-order.svg)
-   [RSS feed](#rss) ![RSS icon](/static/icons/rss.svg)
-   [Sitemap](#sitemap) ![Sitemap icon](/static/icons/sitemap.svg)
-   [Search](#search) ![Search icon](/static/icons/search.svg)
-   [Code highlighting](#code-highlighting) with highlight.js ![Highlight icon](/static/icons/highlight.svg)
-   [Ids for H2 till H4 in Markdown](#ids-for-h2-till-h4-in-markdown) ![Hash icon](/static/icons/hash.svg)
-   No need for hot reloading in development mode ![Flame icon](/static/icons/flame-off.svg)

## How to install Blog-Doc?

Blog-Doc is a `Node.js` app. You should have [Node.js](https://nodejs.org/en/) on your machine.<br />
Always go for the **LTS** version.

If you want to try Blog-Doc, head over it's [Github repository](https://github.com/LebCit/blog-doc) and download it.<br />
You can also download it's zip by clicking on the following link: [Blog-Doc ZIP](https://github.com/LebCit/blog-doc/archive/refs/heads/master.zip).

Once downloaded, extract the zipped folders and files to a new folder and open it in your IDE (I use [VS Code](https://code.visualstudio.com/)).

Another way is to directly clone the repository itself.<br />

```bash
git clone https://github.com/LebCit/blog-doc.git
```

Whatever method you use to get Bloc-Doc, the process after having it is to open the folder where Blog-Doc lives with your IDE and type in the terminal:

```bash
npm install
```

After the install, to see what Blog-Doc looks like, type in the terminal the following command:

```bash
npm run fire
```

This command will allow you to explore the app in the browser of your choice by visiting [localhost on port 3000](http://localhost:3000).

Blog-Doc comes with some posts and pages. You can now begin to create your own pages and posts from the administration, then remove the existing ones also from the administration.

I wish you an enjoyable trip with Blog-Doc 🚀

## Generate a static site

To generate a static site out of the created content:

1. Click the `Admin ⚡` link.
2. Click the `Build Static Site` link or card.
3. Download the `site.zip` file to your disk.
4. Extract `site.zip` and open the extracted folder with you IDE.
5. Launch the site from the server of your IDE.

Alternatively, type the following command in the terminal:

```bash
npm run build
```

This command will create a **\_site** folder in which all the necessary folders and files are created. You can now copy the entire content of the **\_site** folder to the server of your choice or just test it locally.

_**Nota Bene: In both cases, the administration part and all of it's components will be removed from the generated static site!**_

## How to use it?

### Test it locally

Open the **\_site** folder in your IDE, I use [VS Code](https://code.visualstudio.com/) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.<br />
Launch the local server and you'll be able to explore the static site.

### Host it!

Push the content of the **\_site** folder to a host of your choice.<br />
There are many free hosts for static sites. The most known are:

-   [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static/)
-   [Cloudflare Pages](https://pages.cloudflare.com/)
-   [Deta Space](https://deta.space/)
-   [GitHub Pages](https://pages.github.com/)
-   [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/#gitlab-pages)
-   [Netlify](https://www.netlify.com/)
-   [Render](https://render.com/)
-   [Surge](https://surge.sh/)
-   [Vercel](https://vercel.com/)

_Nota Bene: the above list can be much longer with the different services out there to host a static site!_

## RSS!{#rss}

⚠️ You **MUST** provide the **live URL** of your site in the **Settings page** under the administration by modifying the `siteURL` value before deploying the application.

At build time, a `rss.xml` file is generated in the **\_site** folder.<br />
This file takes the live URL that you provided to generate the correct links for your feed.<br />
_Nota Bene: The live URL **MUST** end with a slash `/`_

Of course, you **MUST** also modify `siteTitle`, `siteDescription` and `rssCopyright` in the Settings page.<br />
You **SHOULD** replace the `siteTitle`, `siteDescription` and `rssCopyright` **values** with the ones of your site.<br />
You **MAY** replace the `rssSiteLanguage` value with the language of your site.<br />
A list of available language codes can be found on the [RSS language codes page](https://www.rssboard.org/rss-language-codes).

Bellow is a screenshot of the old RSS feed of Blog-Doc in [Vivaldi browser](https://vivaldi.com/)

<style>
.pure-img-responsive {
  border-style: dashed;
}
</style>
<img class="pure-img-responsive" src="/static/images/blog-doc-rss.xml.png">

## Sitemap{#sitemap}

Like the RSS feed, you **MUST** provide the **live URL** of your site in the Settings page by modifying the `siteURL` value to generate the correct links for each page, post, tag and template as well as for the blog routes.<br />
Please remember that the **Site URL** **MUST** end with a slash `/`

You can check the sitemap of your site under the `/sitemap` route.<br />
At build time, a `sitemap.xml` is generated in the **\_site** folder.

## Search{#search}

Blog-Doc has a built-in search feature.<br />
The search functionality allows a user to make a research on **the titles** and **the contents** of the posts.

You can check the search of your site under the `/search` route.<br />
At build time, a `posts.json` and a `search.js` are generated in **\_site/js**.<br />
Also, at build time, an `index.html` is generated under the `search` folder in the **\_site** folder.

You can disable the search in the Node.js app as well as for the generated static site by giving `searchFeature` a value of `false` in the Settings page.

## Code highlighting{#code-highlighting}

Blog-Doc uses [highlight.js](https://highlightjs.org/) to highlight **block of code**.

To write **inline code**, surround your code with backticks <code>\`\`</code>.<br />

To write a **block of code**, surround your block with a pair of 3 backticks <code>\`\`\`</code>.<br />
To highlight it, provide the alias of the language for the block just after the first 3 backticks.<br />
An example to highlight a block of CSS:

<pre><code>
```css
p { 
    color: red 
}
```
</code></pre>

We'll get the following output:

```css
p {
	color: red;
}
```

⚠️ **The alias of the code language**, inline or block, **is always lowercase** ⚠️

Visit the [highlight.js demo](https://highlightjs.org/static/demo/) to get the correct alias if you're unsure.

## Ids for H2 till H4 in Markdown{#ids-for-h2-till-h4-in-markdown}

Adding an `id` attribute to a heading tag, H2 till H4 only, is an optional activated feature by default.

This feature was built with edge cases and typing typos in mind:

-   Regex to match curly braces ignoring everything before the last hashtag
-   Replace accented characters, by their non accented letter
-   Replace upper case letters by lower case one
-   Remove special characters except hyphen and underscore
-   Replace any number of underscore by one hyphen
-   Replace any number of space by one hyphen
-   Remove any number of hyphen at the beginning
-   Replace any number of hyphen by one hyphen only
-   Remove any number of hyphen at the end

To add an `id`, add a curly braces with a hashtag followed by the id's text.<br />
The following examples will give you a better idea:

```markdown
<!-- Heading tags with an id property -->

## My awesome H2 title {# my-awesome-h2-title}

The HTML output will be: <h2 id="my-awesome-h2-title">My awesome H2 title</h2>

### My awesome H3 title {# my awesome h3 title}

The HTML output will be: <h3 id="my-awesome-h3-title">My awesome H3 title</h3>

#### My awesome H4 title {# My awesome H4 title}

The HTML output will be: <h4 id="my-awesome-h4-title">My awesome H4 title</h4>
```

Every Whitespace is automatically replaced by a hyphen and any number of consecutive hyphens are replaced by one hyphen only.  
Any number of hyphen at the beginning or the end of the id's text are removed so the following is also valid:

```markdown
## My awesome H2 title { # ----- My ----- aWEsOMe ----- h2 ----- tITlE ----- }

Whatever the number of whitespace characters / hyphens is at the beginning,
between the words or at the end, the HTML output will still be:

<h2 id="my-awesome-h2-title">My awesome H2 title</h2>
```

Anything before the **last** hashtag is ignored and special characters in the id's text are ignored too:

```markdown
## My awesome H2 title { /!@# a comment ?%^& # -my= awesome+ h2 \ ( title ) | }

The HTML output will be: <h2 id="my-awesome-h2-title">My awesome H2 title</h2>
```

⚠️ Please be aware that the following special characters, if used **inside the id's text** after the **last** hashtag, will not be deleted:

```txt
& will be parsed to amp (ampersand)
" will be parsed to quot (quotation)
> will be parsed to gt (greater then)
< will be parsed to lt (less then)
```

As an example:

```markdown
## Honey & Bees {#Honey & Bees}

The HTML output will be: <h2 id="honey-amp-bees">Honey & Bees</h2>
```

At build time, predefined ids will be generated into the HTML of the static site.

If you wish to disable this feature, set the `addIdsToHeadings` value to `false` in the Settings page.

## The Gallery!{#the-gallery}

Since Blog-Doc turned into a CMS, I've planned to add a gallery and a way to retrieve images for the pages and posts directly.<br />
Now it's almost done. Almost, because there is always space to bring on improvements.<br />
For now, you can visit the gallery by hitting the `/admin-gallery` route, or go to the Administration page and click on the **Gallery** link in the menu or it's card.

In the global spirit of Blog-Doc, The Galley is pretty simple to use.<br />
You'll find a drop zone where you can drop your image(s) or click on it and choose the image(s) you wish to upload.<br />
⚠️ Once an image added, it will be directly uploaded to the **images** folder but will not be available yet in the gallery, you **MUST** click on the **Add image(s) ✅** button to add the image(s) to the gallery!

You can also delete an image from the gallery by clicking on it's **&#10008; DELETE** button.

Finally, to assign an image to a page or a post, you can, while creating or updating, choose an image from the gallery by selecting it directly from the page or post.

## What's next?

I intend to make a lot of improvements to this app in my short free time.

You can take Blog-Doc as a prototype and modify it totally to use it with another design and/or another template language.

I really hope that this app will be useful in any way for a lot of people out there, I'm considering it as my personal contribution to the Node.js and Markdown communities.

Ideas, comments and suggestions are most welcome.

SYA,<br />
LebCit

Built with ❤️ by [LebCit](https://lebcit.github.io/)
