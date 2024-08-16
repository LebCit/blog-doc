<?xml version="1.0" encoding="UTF-8"?>

<!--
Important: Do Not Delete This File!

This file is essential for generating the RSS feed for your site's posts.
Deleting it will disrupt the functionality of your RSS feed.
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <style>
          body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            margin: 50px;
            background-color: #24292f;
          }
          header,
          footer {
            display: flex;
            align-items: center;
            justify-content: center;
            
          }
          header {
			flex-direction: column;
            margin-bottom: 50px;
          }
		  header a {
			color: #54aeff;
		  }
          h1 {
            color: #f6f8fa;
          }
          .grid-container {
            display: grid;
            grid-gap: 20px;
            grid-template-columns: 1fr;
          }
          .item {
            border: 1px solid #f6f8fa;
            padding: 15px;
            background: #eaeef2;
            border-radius: 8px;
          }
          .item h2 {
            margin: 0 0 10px 0;
          }
          .item a {
            text-decoration: none;
            color: #033d8b;
          }
          .item a:hover {
            text-decoration: underline;
          }
          .description {
            color: #24292f;
          }
          .pubDate {
            font-size: 0.9em;
            color: #57606a;
            margin-top: 10px;
          }
          footer {
            margin-top: 50px;
            color: #f6f8fa;
          }

          /* Responsive Grid */
          @media (min-width: 769px) {
            .grid-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .grid-container {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (min-width: 1280px) {
            .grid-container {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        </style>
      </head>
      <body>
        <header>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <a href="/">Back to Home</a>
        </header>
        <div class="grid-container">
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
              <div class="description"><xsl:value-of select="description"/></div>
              <div class="pubDate"><xsl:value-of select="pubDate"/></div>
            </div>
          </xsl:for-each>
        </div>
        <footer>
            <p><xsl:value-of select="/rss/channel/copyright"/></p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
