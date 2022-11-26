---
title: Install Blog-Doc
subTitle: Installing and using the app
---

## Blog-Doc

A tiny blog and documentation SSG app.

## How to install Blog-Doc ?

Blog-Doc is a `Node.js` app. You should have [Node.js](https://nodejs.org/en/) on your machine.  
Always go for the **LTS** version. At the time of writing those lines it's 18.12.1 !

To install it, just head over it's [Github repository](https://github.com/LebCit/blog-doc) and download it.  
You can also download it's zip by clicking on the following link : [Bloc-Doc ZIP](https://github.com/LebCit/blog-doc/archive/refs/heads/master.zip).

Once everything is in place, extract the zipped files to a new folder and open it in your IDE (I use the one and only [VS Code](https://code.visualstudio.com/)).  
Then type in the terminal :

```bash
npm install
```

After the install, you'll see that Blog-Doc comes with some posts, a page and a template. Those files are located under the **views** folder in the **pages**, **posts** and **templates** folders. You can begin by removing those existing files and create your own [Posts and Pages](/posts-and-pages) and also [Templates](/templates).

To see what you content looks like, type in your terminal the following command :

```bash
npm run watch
```

This command will allow you to explore the app in the browser of your choice by visiting [localhost on port 3000](http://localhost:3000).

## Generate a static site

### How is it done ?!

When you try to reproduce an idea like an SSG, you learn a lot and especially to respect and appreciate the great and hard work of the developers who made applications used by thousand of people !

Rendering a static file out of a template is an easy task, but turning different routes working together to produce a Node.js app into some folders and a lot of files to generate a static site is not an easy one !

The file behind this trick in Blog-Doc is **build.js**. You can find this file under the **functions** folder. It's very similar to the [filesRoute.js](/the-files-route). The difference between the two is that **filesRoute.js** renders the posts, pages and templates in the Node.js app while **build.js** generates out of those posts, pages and templates a ready to use static site.

### How does it work ?

To generate a static site out of your posts, pages and templates, type the following command in your terminal :

```bash
npm run build
```

This command will create a **\_site** folder in which all the necessary folders and files are created. You can now copy the entire content of the **\_site** folder to the server of your choice or just test it locally.

## How to use it ?

### Test it locally

Copy the content of the **\_site** folder to a new folder and open it in your IDE, I use [VS Code](https://code.visualstudio.com/) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.  
Launch the local server and you'll be able to explore the static site.

### Host it !

Push the content of the **\_site** folder to a host of your choice.  
There are many free hosts for static sites. The most known are :

-   [Netlify](https://www.netlify.com/)
-   [Vercel](https://vercel.com/)
-   [Cloudflare Pages](https://pages.cloudflare.com/)
-   [Render](https://render.com/)
-   [Surge](https://surge.sh/)
-   [GitHub Pages](https://pages.github.com/)
-   [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/#gitlab-pages)
-   [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static/)

_Nota Bene : the above list can be much longer with the different services out there to host a static site !_

### Deploy it to Deta !

You can deploy the content of the **\_site** folder to [Deta](https://www.deta.sh/) as a Node.js app !  
It took me less than 5 minutes to do it !  
Deta's [documentation](https://docs.deta.sh/docs/micros/about) is great and straightforward !  
You can take a look at the result by visiting [Blog-Doc static with Express](https://blog-doc-static-express.deta.dev/).  
The implementation can be found on the following [GitHub repository](https://github.com/LebCit/blog-doc-static-express).

## What's next ?

I intend to make a lot of improvements to this app in my short free time.

You can take Blog-Doc as a prototype and modify it totally to use it with another design and/or another template language (I use the one and only plain JavaScript [EJS](https://ejs.co/)).

I really hope that this app will be useful in any way for a lot of people out there, I'm considering it as my personal contribution to the Node.js, Express, EJS and Markdown communities.

Ideas, comments and suggestions are most welcome.

SYA,
LebCit
