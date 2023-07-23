// Internal Modules
import { promisify } from "util"
import { exec } from "child_process"
import { readFileSync, unlinkSync } from "fs"
import { join } from "path"

// Internal Functions
import { createZipArchive } from "../../functions/zipSite.js"
import { initializeApp } from "../../functions/initialize.js"
const { app } = initializeApp()

export const adminBuildRoute = app.get("/build", async (c) => {
	try {
		// Execute the build command using exec and wait for it to finish
		const { stdout, stderr } = await promisify(exec)("npm run build")

		if (stderr) {
			console.error(`Error: ${stderr}`)
			return c.text(stderr, 500)
		}

		console.log(`Build successful: ${stdout}`)

		// Create the zip archive
		createZipArchive()

		const zippedFilePath = join(process.cwd(), "site.zip")

		// Set appropriate headers for the download
		c.header("Content-Disposition", 'attachment; filename="site.zip"')
		c.header("Content-Type", "application/zip")

		// Get the zipped file contents
		const content = readFileSync(zippedFilePath)

		// Remove the zipped file from the app
		unlinkSync(zippedFilePath)

		// Send the zipped file to the client
		return c.body(content)
	} catch (err) {
		console.error(`Error: ${err.message}`)
		return c.text(err.message, 500);
	}
})
