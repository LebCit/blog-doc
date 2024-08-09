import AdmZip from "adm-zip"
import { join } from "node:path"
import { existsSync } from "node:fs"

export async function createZipArchive() {
	const sourceFolder = join(process.cwd(), "_site")

	if (!existsSync(sourceFolder)) {
		console.error("Source folder does not exist.")
		return false
	}

	try {
		const zip = new AdmZip()
		const outputFile = "site.zip"
		zip.addLocalFolder(sourceFolder)
		zip.writeZip(outputFile)
		console.log(`Created temporary file ${outputFile} successfully`)
		return outputFile
	} catch (e) {
		console.error("Error occurred while creating the ZIP archive:", e.message)
		return false
	}
}
