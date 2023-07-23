class Helpers {
	/**
	 * This method extracts H2 to H4 tags from a string, searches in each heading for curly braces,
	 * takes the text inside the braces and adds it as an id attribute to the heading with some modifications.
	 * This method is used for the Markdown pages and posts only since we can add an id to any tag in a template.
	 */
	idsInHeadings(str) {
		// Regex to match h2 to h6 tags in the string
		const regex = /<h[2-4](.*?)>(.*?)<\/h[2-4]>/gi
		// Return all headings from a string as an array with match()
		let headingsArray = str.match(regex)

		if (headingsArray) {
			headingsArray.forEach((heading) => {
				/**
				 * Regex to match curly braces ignoring everything before the first hashtag,
				 * followed by any number of characters in them, with or without space(s) inside or outside the curly braces.
				 */
				let idReg = /\s*{\s*.*#\s*(.*)\s*}\s*/
				// Return curly braces found in each heading as an array with match()
				let ids = heading.match(idReg)

				if (ids) {
					let idTag = ids[0] // The curly braces fom the opening one to the closing one `{# my-heading-id}`
					let idTxt = ids[1] // The id itself `my-heading-id`

					// Replace accented characters, by their non accented letter
					idTxt = idTxt.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
					/**
					 * Perform replacements to output a new heading tag with a clean id
					 * 1- Remove the idTag in the original heading tag
					 * 2- Replace the > of the opening tag by id=${id...}>
					 */
					let newHeading = heading.replace(idTag, "").replace(
						">",
						` id="${idTxt
							.toLowerCase() // Lower case the id
							.replace(/[^a-zA-Z0-9-_ ]/g, "") // Remove special characters except hyphen and underscore
							.replace(/_+/g, "-") // Replace any number of underscore by one hyphen
							.replace(/\s+/g, "-") // Replace any number of space by one hyphen
							.replace(/^-+/, "") // Remove any number of hyphen at the beginning
							.replace(/-+/g, "-") // Replace any number of hyphen by one hyphen only
							.replace(/-+$/, "")}">` // Remove any number of hyphen at the end
					)
					// Replace each heading by the newHeading in the string
					str = str.replace(heading, newHeading)
				}
			})
		}

		// Return the string
		return str
	}

	// Method to paginate the posts.
	paginator(items, current_page, per_page_items) {
		let page = current_page || 1,
			per_page = per_page_items || 10,
			offset = (page - 1) * per_page,
			paginatedItems = items.slice(offset).slice(0, per_page_items),
			total_pages = Math.ceil(items.length / per_page)

		return {
			page: Number(page),
			per_page: per_page,
			prev_page: page - 1 ? Number(page) - 1 : null,
			next_page: total_pages > page ? Number(page) + 1 : null,
			total: items.length,
			total_pages: total_pages,
			data: paginatedItems,
		}
	}

	// Method to transform the parsed body request to an array of objects wrapped with a specified main key.
	transformParsedBody(inputObj, mainKey) {
		// Create an empty object to store the transformed objects as a hashmap.
		const transformedObj = {}

		// Iterate over the keys of the input object.
		for (const key in inputObj) {
			// Use a regular expression to match the keys in the format 'mainKey[index][property]'.
			// 'mainKey' is the dynamic key specified when calling the function.
			const match = key.match(new RegExp(`${mainKey}\\[(\\d+)\\]\\[(\\w+)\\]`))

			// If a match is found, process the key-value pair.
			if (match) {
				// Destructure the matched groups (index and property) directly from the match array.
				const [, index, prop] = match
				const value = inputObj[key]

				// If the transformed object for this index does not exist, create an empty object for it.
				if (!transformedObj[index]) {
					transformedObj[index] = {}
				}

				// Set the property-value pair in the transformed object for the specified index.
				transformedObj[index][prop] = value
			}
		}

		// Convert the hashmap object to an array of objects using Object.values().
		// Wrap the array of objects with the specified main key and return the result.
		return { [mainKey]: Object.values(transformedObj) }
	}
}

export const { idsInHeadings, paginator, transformParsedBody } = new Helpers()
