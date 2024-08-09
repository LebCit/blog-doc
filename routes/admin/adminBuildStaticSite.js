import { unlinkSync } from "node:fs"
import { promisify } from "node:util"
import { exec } from "node:child_process"
import { adminMenuItems } from "./adminMenuItems.js"
import { createZipArchive } from "./utils/zipSite.js"

export const adminBuildStaticSite = async (app, settings, marked, join) => {
	app.get("/bd-admin/build/static-site", async (req, res) => {
		const parsedAdminBuildStaticSite = await app.parseMarkdownFile("themes/admin/pages/admin-build-static-site.md")
		const { title, description } = parsedAdminBuildStaticSite.frontmatter
		const html_admin_content = marked.parse(parsedAdminBuildStaticSite.content)

		res.render("themes/admin/layouts/index.html", {
			title,
			description,
			menu: adminMenuItems,
			html_admin_content,
			siteTitle: settings.siteTitle,
			buildStaticSite: true,
		})
	}).get("/build", async (req, res) => {
		try {
			// Execute the build command using exec and wait for it to finish
			const { stdout, stderr } = await promisify(exec)("npm run build")

			if (stderr) {
				console.error(`Error: ${stderr}`)
				return res.txt(stderr, 500)
			}

			console.log(`Build successful: ${stdout}`)

			const outputFile = await createZipArchive()

			if (!outputFile) {
				return res.status(500).send("Failed to create ZIP archive.")
			}

			const zippedFilePath = join(process.cwd(), outputFile)

			// Set appropriate headers for the download
			res.setHeader("Content-Disposition", 'attachment; filename="site.zip"')

			// Send the zipped file to the client
			res.sendFile(zippedFilePath)

			// Remove the zipped file from the app after sending
			res.on("finish", () => {
				unlinkSync(zippedFilePath)
				console.log(`Deleted temporary file: ${zippedFilePath}`)
			})
		} catch (err) {
			console.error(`Error: ${err.message}`)
			return res.txt(err.message, 500)
		}
	})
}
