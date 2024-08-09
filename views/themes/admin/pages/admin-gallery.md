---
title: Gallery
description: "Add, delete, and use images"
---

# Gallery

All images uploaded to Blog-Doc's gallery are stored in the "images" folder within the "static" directory. You can access these images using a path similar to: `/static/images/my-image.extension`

## Add images

To add images to the gallery, click the "Browse" button and select one or more images. You can upload as many images as you like, but be aware that **the total file size of all uploaded images must not exceed 15MB**.

Why is this important? Optimizing your images is crucial for ensuring they perform well on the web and enhance the user experience. For image optimization, you can use free online tools such as [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/), and [Resizing.app](https://resizing.app/), among others.

After selecting your images, click the "Upload" button to add them to the gallery. You will be redirected to the gallery, where your images will be available.

## Delete images

To remove an image from the gallery, first click the "Delete" button associated with the image you wish to remove. A confirmation modal will appear, asking you to confirm the deletion. Click the "Delete" button in the modal to permanently remove the image. Please note that once deleted, the image will no longer be available in the gallery and will also be removed from any page(s) or post(s) where it was previously displayed.

## Use images

You can incorporate images from the gallery into your pages or posts using the following methods:

1. **Markdown Syntax**: Embed images using the Markdown format `![Image title](image-source "Image alternative text")`. For example:

    ```markdown
    ![Cedar of Lebanon](/static/images/cedar-tree-of-Lebanon.jpg "Mighty Cedar Tree of Lebanon")
    ```

2. **HTML `<img>` Tag**: Include images using the HTML `<img>` tag, just as you would in a standard HTML file:

    ```html
    <img title="Cedar of Lebanon" src="/static/images/cedar-tree-of-Lebanon.jpg" alt="Mighty Cedar Tree of Lebanon" />
    ```

3. **External Images**: You can also use images hosted on the Internet. For instance:

    - Markdown:
        ```markdown
        ![Cedar of Lebanon](https://tinyurl.com/483s6hr2 "Mighty Cedar Tree of Lebanon")
        ```
    - HTML:
        ```html
        <img title="Cedar of Lebanon" src="https://tinyurl.com/483s6hr2" alt="Mighty Cedar Tree of Lebanon" />
        ```

4. **Image Picker**: Use the "Add an Image" button available in each page and post to select and display a featured image for the page or post from the gallery.
