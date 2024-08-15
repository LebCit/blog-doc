export function processImages(imagesPaths) {
	const excludedPaths = [
		"static/images/404-not-found-error.png",
		"static/images/500-internal-server-error.png",
		"static/images/chevron-left.svg",
		"static/images/chevron-right.svg",
		"static/images/date-post-details.svg",
		"static/images/tag-post-details.svg",
	]

	return imagesPaths
		.filter((path) => !excludedPaths.includes(path))
		.map((path) => {
			const [imageMainDir, imageBaseDir, ...rest] = path.split("/")
			const imageFileName = rest[rest.length - 1]
			const imageBaseName = imageFileName.split(".")[0]
			const imageName = imageBaseName.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

			return {
				imagePath: path,
				imageMainDir,
				imageBaseDir,
				imageFileName,
				imageBaseName,
				imageName,
			}
		})
}
