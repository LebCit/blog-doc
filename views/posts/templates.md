---
title: Templates
date: 2022/11/13
description: Using EJS for specific pages
featuredImage: /images/templates.avif
tags: [Blog-Doc, Templates, Server-Side]
---

You may ask yourself the reason for a third option of files since we already can create posts and pages in Markdown. Well the reason is that a template can do much more than a Markdown file...

## Capabilities & Security

A simple example would be to create a contact form, this would take a serious amount of data objects to be passed in the frontmatter of a Markdown file as well as in the route where it would be rendered, all of this without forgetting the serious security risks of directly parsing sensitive data to HTML...

## Architecture & Design

Bloc-Doc's architecture parses Markdown content to HTML which is injected into EJS templates that are rendered on routes matching the Markdown's file name.  
The design is obviously at the templates' level. We can pass personalized CSS for a post or a page directly from the Markdown file, but structuring a whole web page from Markdown would be a time killer...  
This is why we use a templating language, EJS in Bloc-Doc, to generate our final HTML markup with the power of plain JavaScript.  
Another advantage is that we could completely change the design of a site for a particular page to whatever we like with a template, but this would result in a labyrinthine system if we try to achieve it from a Markdown file...

## How to use a template ?

To use a template file, head over to the **templates** folder under the **views** folder and create in there an `.ejs` file.  
Now paste the following block of code and write your content under the `<content>` tag :

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="description" content="A DESCRIPTION OF YOUR EJS TEMPLATE" />
		<title>Blog-Doc | YOUR TEMPLATE TITLE</title>
		<link rel="shortcut icon" href="/icons/favicon.ico" type="image/x-icon" />


		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css"
			integrity="sha256-AXV9/14XTNljCQp7u3n02VIiYAICq8ocXkc11rvMlSw="
			crossorigin="anonymous"
		/>
		<link rel="stylesheet" href="/css/styles.min.css" />
	</head>
	<body>
		<div id="layout">
			<%- include('../components/menu') %>

			<div id="main">
				<%# Template header %>
				<div class="header">
					<h1>YOUR TEMPLATE TITLE</h1>
					<h2>A DESCRIPTION OF YOUR EJS TEMPLATE</h2>
				</div>

				<%# Template content %>
				<div class="content">
                    <%# WRITE YOUR CONTENT HERE %>
                    <%# YOU CAN USE PLAIN HTML INSIDE AN EJS FILE %>
				</div>
			</div>
		</div>
		<%- include('../components/footer') %>
```

If your new to EJS, please take the time to read the following articles on my personal blog :

1. [Templating a Node.js app with EJS](https://lebcit.github.io/posts/templating-a-nodejs-app-with-ejs/)
2. [Improving a Node.js app built with Express and EJS](https://lebcit.github.io/posts/improving-a-nodejs-app-built-with-express-and-ejs/)

After creating your content with a template, you'll be able to add a link to it in the menu or anywhere else that suits your needs.

## Conclusion

If you followed the articles related to [Blog-Doc](/tags/Blog-Doc) from the beginning till this one, you now have a solid understanding of how everything works under the hood, how the components are displayed on the frontend, how the posts, pages and templates files are rendered on the frontend, and how to use them.

You can take Blog-Doc as a prototype and modify it totally to use it with another design and/or another template language.

I really hope that this app will be useful in any way for a lot of people out there, I'm considering it as my personal contribution to the Node.js, Express, EJS and Markdown communities.
