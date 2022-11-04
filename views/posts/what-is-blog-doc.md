---
title: What is Blog-Doc ?
date: 2022/09/30
description: A brief introduction to Blog-Doc.
tags: [Blog-Doc]
---

Blog-Doc is a tiny and dead simple static site generator written in JavaScript, using EJS as a templating language and Markdown to write and format the markup of the generated posts and pages.

## Motivation

In July of this year (2022), I've written some posts on [my personal blog](https://lebcit.github.io/) showing how to create a Node.js app using EJS as a templating language and how to improve it. Then, taking the code a step further, I've showed how to use Markdown to write the app's content, and finally how to turn it into a simple SSG. So I've decided to leverage my own tutorials one more step by creating a super simple SSG out of them.

## Name, design & architecture

I wanted from the beginning something extremely easy to maintain, modify and improve.  
With this in mind, I asked myself two questions :

-   what would be the purpose of this application ?
-   how it could be useful in the sea of SSG ?

The answer to both came by responding to a third one :

-   what do we use mostly the net for ?

Putting aside personal communication, entertainment of any kind and shopping, we use the net to get data ! We search, read, take notes... The web, in my modest opinion, is a place where people share experience and knowledge with each other. Blogging is the way to express ourselves and spread what we have learned, and documentation is the backbone of any decent application... Therefor, the name **Blog-Doc** was chosen.

Once the purpose defined, I had to think about the look and feel of this app.  
Again, simplicity was the keyword. [Pure.css](https://purecss.io/) docs are a great example, they also provide an identical layout of their own website, lucky me !

Finally, after acquiring the design, I had to carefully build the app's architecture.  
As easy as it may sound, you have to think about _the future_ ! Possibilities are limitless, but by writing essential functionalities for the app and deciding how they should work together and what they should do, the path becomes less cloudy...

This one ends here, I'll be talking about some aspects of the design and the architecture later on.

See you in the next one 😉