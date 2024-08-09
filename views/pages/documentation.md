---
title: "Blog-Doc's documentation"
description: "How to install and use Blog-Doc"
published: true
---

## Documentation

With the release of [version 3.0.0](https://github.com/LebCit/blog-doc/releases/tag/v3.0.0), Blog-Doc has undergone some fantastic updates. I've integrated [LiteNode](https://www.npmjs.com/package/litenode) to streamline and enhance your experience.

The Blog-Doc admin interface is now more intuitive than ever. Each page comes with its own handy documentation, all designed with [responsive attributes](https://responsive-attributes-generator.pages.dev/) for seamless usability on any device.

You can check out **the full documentation for Blog-Doc** here: [Blog-Doc Documentation](https://blog-doc.pages.dev/).

## Requirements

1. Blog-Doc requires [Node.js](https://nodejs.org/en) version 18.x or higher.
    - For the best experience, use the latest [Long Term Support](https://nodejs.org/en/download/package-manager) (LTS) version.
2. Make sure you have the latest version of [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

## Installation

To get Blog-Doc up and running on your machine, follow these steps:

1. Open your preferred IDE (like VS Code) and navigate to the directory where you want to install Blog-Doc.
2. In the terminal, you have two options to install Blog-Doc:

### Option 1: Using `npx`

Run the following command:

```bash
npx create-blog-doc my-blog-doc-app
```

This will create a new folder named **my-blog-doc-app** within your current directory, containing all the files you need.

### Option 2: Using `npm init`

Alternatively, you can use the following command:

```bash
npm init blog-doc my-blog-doc-app
```

This will also create a new folder named **my-blog-doc-app** within your current directory, containing all the files you need.

3. Once installed, start Blog-Doc by typing:

```bash
npm run fire
```

This command will launch the app, which you can then explore in your browser at [localhost on port 5000](http://localhost:5000).

Blog-Doc comes with some sample posts and pages. Feel free to create your own content through the admin interface, and you can remove the default ones as needed.

Enjoy exploring Blog-Doc! 🚀

## What's Next?

I’m excited to keep improving Blog-Doc in my spare time. Consider it a prototype that you can customize and adapt to your own design and template needs.

I genuinely hope this tool is helpful for the Node.js and Markdown communities. I welcome any [ideas](https://github.com/LebCit/blog-doc/discussions/categories/ideas), [code issues](https://github.com/LebCit/blog-doc/issues), or [code improvements](https://github.com/LebCit/blog-doc/pulls) you might have.

See you around!  
[LebCit](https://lebcit.github.io/)