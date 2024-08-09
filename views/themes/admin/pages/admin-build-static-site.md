---
title: "Static Static"
description: "Build and download your static site."
---

# Go Static

Generate and deploy a static site from your content using Blog-Doc.

<button class="build-and-zip-button bd-button-grey" type="button">Build and Zip</button>

## Generating a Static Site

You have two options for generating your static site:

### 1. Administration Interface

1. **Trigger a Build**:

    - Click the "Build and Zip" button in the administration toolbar or on this page.

2. **Download the Build**:

    - This action will create a `site.zip` file for you to download.

3. **Upload or Extract**:
    - **Option A**: Directly upload the `site.zip` to your server if it supports static site deployment from a ZIP archive.
    - **Option B**: Extract the `site.zip` file to a new folder. You can then preview your static site by running a local server (using your IDE) and, once satisfied, upload the extracted content to your server.

### 2. IDE/Editor Terminal

1. **Open Your Project**:

    - Open the root folder of your Blog-Doc application in your IDE or editor.

2. **Run the Build Command**:

    - Execute the following command in the terminal:

    ```bash
    npm run build
    ```

3. **Preview and Upload**:
    - This command creates a `_site` folder in the root directory of your Blog-Doc application. Preview your static site by running a local server (using your IDE) and, once you’re satisfied, upload the content of the `_site` folder to your server.

### Build Notes

-   **Renaming `site.zip`**:

    -   You can rename the `site.zip` file before saving it, but make sure to keep the `.zip` extension. Renaming the file to something other than `site` is acceptable.

-   **Overwriting Builds**:

    -   If you save a new build with the same name in the same location, it will overwrite the previous content.

-   **Content Replacement**:
    -   Every time you run a build, the content in the `_site` folder is replaced with the new build output.

**Important**: Regardless of the method used, the administration components and all related parts will be removed from the generated static site.

## Publishing Your Site

Deploy your static site to the web to make it publicly accessible.

### Test Locally

Before publishing, it’s crucial to test your static site locally. This allows you to review your site as a visitor would and make any necessary adjustments.

-   **Testing Locally**:
    -   Run a build and use your IDE’s local server to explore the site. For example, if using VS Code, the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension is a great tool for this purpose. Consult your IDE’s documentation or community for other local server options.

### Hosting Your Site

Once your site is ready and tested, it’s time to deploy it.

-   **Deploy the Content**:

    -   The static site content is located in the `_site` folder. Upload the contents of this folder to your chosen hosting provider. Do not push the `_site` folder itself, only its contents.

-   **Popular Hosting Providers**:
    -   [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static/)
    -   [Cloudflare Pages](https://pages.cloudflare.com/)
    -   [Deta Space](https://deta.space/)
    -   [GitHub Pages](https://pages.github.com/)
    -   [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/#gitlab-pages)
    -   [Netlify](https://www.netlify.com/)
    -   [Render](https://render.com/)
    -   [Surge](https://surge.sh/)
    -   [Vercel](https://vercel.com/)

_Note: There are many more hosting services available for static sites beyond those listed above._
