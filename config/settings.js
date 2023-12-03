import { readFile } from "node:fs/promises"
const settings = JSON.parse(await readFile(new URL("./settings.json", import.meta.url)))
Object.hasOwn(settings, "favicon") ? settings : (settings.favicon = "/static/icons/favicon.ico")
export { settings }
