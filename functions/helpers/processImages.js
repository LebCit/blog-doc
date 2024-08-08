export function processImages(imagesPaths) {
	return imagesPaths
		.filter(
			(path) =>
				path !== "static/images/404-not-found-error.png" &&
				path !== "static/images/500-internal-server-error.png" &&
				path !== "static/images/chevron-left.svg" &&
				path !== "static/images/chevron-right.svg" &&
				path !== "static/images/date-post-details.svg" &&
				path !== "static/images/tag-post-details.svg"
		)
		.map((path) => {
			const pathParts = path.split("/")
			const fileName = pathParts[pathParts.length - 1]
			const baseName = fileName.split(".")[0]
			const imageName = baseName.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

			return {
				imagePath: path,
				imageMainDir: pathParts[0],
				imageBaseDir: pathParts[1],
				imageFileName: fileName,
				imageBaseName: baseName,
				imageName: imageName,
			}
		})
}
