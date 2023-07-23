import AdmZip from "adm-zip"
import { join } from "path"
import fs from "fs"

export async function createZipArchive() {
	const sourceFolder = join(process.cwd(), "_site")

	if (!fs.existsSync(sourceFolder)) {
		console.error("Source folder does not exist.")
		return
	}

	try {
		const zip = new AdmZip()
		const outputFile = "site.zip"
		zip.addLocalFolder(sourceFolder)
		zip.writeZip(outputFile)
		console.log(`Created ${outputFile} successfully`)
	} catch (e) {
		console.error("Error occurred while creating the ZIP archive:", e.message)
	}
}
