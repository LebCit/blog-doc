import { getFiles } from "./getFiles.js"
import { processImages } from "./processImages.js"

export async function getImages(dir) {
	let imagesArray = await getFiles(dir)

	let images = processImages(imagesArray)

	return images
}
