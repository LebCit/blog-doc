export function processRoutesImages(obj, suffix = "Image", excludeKey = "postPreviewFallbackImage") {
	// Get an array of keys that end with the specified suffix and exclude the specified key
	const filteredKeys = Object.keys(obj).filter((key) => key.endsWith(suffix) && key !== excludeKey)

	// Map the keys to their corresponding values and transform them into objects
	const resultArray = filteredKeys.map((key) => {
		const path = obj[key]
		const fileName = path.split("/").pop()
		const routeName = key
			.replace(suffix, "")
			.split(/(?=[A-Z])/)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")

		return {
			route: key,
			routeName: routeName,
			routeNameLow: routeName.toLowerCase(),
			routeImage: fileName,
			routeImagePath: path,
		}
	})

	return resultArray
}
