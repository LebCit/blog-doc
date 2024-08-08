const searchInput = document.getElementById("searchInput")
searchInput.focus()

document.getElementById("searchForm").addEventListener("submit", async function (event) {
	event.preventDefault() // Prevent the default form submission

	const searchInputValue = searchInput.value.trim() // Trim the input value

	try {
		const response = await fetch("/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query: searchInputValue }),
		})

		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`)
		}

		// Get the JSON response data
		const data = await response.json()

		// Handle the response data: console.log(data)
		// Redirect to the search results page using the query
		window.location.href = `/search/${encodeURIComponent(data.query)}`
	} catch (error) {
		console.error("Error:", error)
		alert("An error occurred while processing your request. Please try again later.")
	}
})
