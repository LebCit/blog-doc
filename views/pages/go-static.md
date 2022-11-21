---
title: Go Static !
subTitle: Render Blog-Doc as static files
---

## How is it done ?!

When you try to reproduce an idea like an SSG, you learn a lot and especially to respect and appreciate the great and hard work of the developers who made applications used by thousand of people !

Rendering a static file out of a template is an easy task, but turning different routes working together to produce a Node.js app into some folders and a lot of files to generate a static site is not an easy one !

The file behind this trick in Blog-Doc is **build.js**. You can find this file under the **functions** folder. It's very similar to the [filesRoute.js](/the-files-route). The difference between the two is that **filesRoute.js** renders the posts, pages and templates in the Node.js app while **build.js** generates out of those posts, pages and templates a ready to use static site.

## How does it work ?

After [installing Blog-Doc](/install-blog-doc), since it already has some posts, pages and templates, you can type in your terminal :

```bash
npm run watch
```

This command will allow you to explore the app in the browser of your choice by visiting [localhost on port 3000](http://localhost:3000).

To generate a static site out of the app, you can type in your terminal :

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
Ideas, comments and suggestions are most welcome.

SYA,
LebCit
