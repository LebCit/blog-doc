// Focus on the search input as soon as the search page loads
const searchInput = document.getElementById("searchInput")
searchInput.focus()

// Fetch the posts from posts.json
fetch("/js/posts.json")
	.then((response) => response.json())
	.then((posts) => {
		// Get the searched string and assign it to a query constant
		const params = new URLSearchParams(window.location.search)
		const query = params.get("searchString")

		// Global and case insensitive regex to filter the posts depending on the query
		const reg = new RegExp(query, "gi")

		// Filter the posts by title and content depending on the regex
		const titleSearch = posts.filter((post) => post[1].data.title.match(reg))
		const contentSearch = posts.filter((post) => post[1].content.match(reg))

		// Concatenate the results of titleSearch and contentSearch
		const concat = titleSearch.concat(contentSearch)

		// Get the unique result(s) by removing duplicates from concat array
		const uniqueProps = []
		const result = concat.filter((post) => {
			const isDuplicate = uniqueProps.includes(post[1].data.title)

			if (!isDuplicate) {
				uniqueProps.push(post[1].data.title)

				return true
			}

			return false
		})

		// If a search is made and the result array is not empty
		if (query && result.length > 0) {
			// Insert the single-post-preview.css at the end of the head tag
			document.head.insertAdjacentHTML(
				"beforeend",
				'<link rel="stylesheet" href="css/single-post-preview.css" />'
			)

			// Define an empty string that will hold the search result(s)
			let searchResultString = ""
			// Define the markup for each post of the result array
			result.forEach((post, index) => {
				const postFilename = post[0].replace(/\.[^/.]+$/, "")
				const postTitle = post[1].data.title
				const postFeaturedImage = post[1].data.featuredImage
				const postDate = post[1].data.date
				const postDescription = post[1].data.description
				const postTags = post[1].data.tags
				const postContent = post[1].content
				const postExcerpt = postContent.substring(0, 180) + "..."

				// Define the image path depending on the postFeaturedImage
				let imagePath
				if (!postFeaturedImage) {
					imagePath = "./images/graphic-of-white-camera-on-black-background-no-image-available.webp"
				} else if (postFeaturedImage && postFeaturedImage.startsWith("/")) {
					imagePath = `.${postFeaturedImage}`
				} else {
					imagePath = `${postFeaturedImage}`
				}

				// Define an empty string that will hold the tag(s) if any
				let tagsLinks = "",
					tagLink
				// If a post have tag(s)
				if (postTags) {
					// Define the markup of each tag
					postTags.forEach((tag) => {
						tagLink = `<li><a href="tags/${tag}.html"><span>${tag}</span></a></li> `
						// Add each tag markup to the tagsLinks
						tagsLinks += tagLink
					})
				}

				// Define the markup of the preview for a post
				const singlePostPreview = `
				<div class="${index % 2 === 0 ? `blog-card` : `blog-card alt`}">
					<div class="meta">
						<div class="photo" style="background-image: url('${imagePath}')"></div>
						<ul class="details">
							<li class="date"><span>${postDate}</span></li>
							${postTags ? `<li class="tags"><ul>${tagsLinks}</ul></li>` : ""}
						</ul>
					</div>
					<div class="description">
						<h1><a href="/${postFilename}.html" rel="bookmark">${postTitle}</a></h1>
						${postDescription ? `<h2>${postDescription}</h2>` : ""}
						<p>${postExcerpt}</p>
						<p class="read-more">
							<a href="/${postFilename}.html" aria-label="Read more about ${postTitle}" tabindex="0" role="button" class="btn info" > Read the post
								<span class="arrow arrow-right"></span>
							</a>
						</p>
					</div>
				</div>`

				// Add each post preview markup to the searchResultString
				searchResultString += singlePostPreview
			})
			// Count the number of matching post(s)
			let searchResultCount
			if (result.length >= 2) {
				searchResultCount = `<h3>Your search returned ${result.length} posts</h3>`
			} else {
				searchResultCount = `<h3>Your search returned 1 post</h3>`
			}
			// Insert searchResultCount at the beginning of searchResult
			const searchResult = document.getElementById("searchResult")
			searchResult.insertAdjacentHTML("afterbegin", searchResultCount)
			// Insert the searchResultString at the end of the content
			const content = document.getElementById("content")
			content.insertAdjacentHTML("beforeend", searchResultString)
		} else if (query && !result.length) {
			// Define a message when no result comes back from a search
			const noResult = `
			<p>
				Sorry, your search didn't return any result.
				<br />
				Please try some other keyword(s) or,
				<br />
				browse the posts in the
				<a class="archive-link" href="/archive.html">archive</a>
				.
			</p>
			`
			// Insert searchResultCount at the beginning of searchResult
			const searchResult = document.getElementById("searchResult")
			searchResult.insertAdjacentHTML("afterbegin", noResult)
		}
	})
