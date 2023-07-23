import { readFile } from "node:fs/promises"
export const settings = JSON.parse(await readFile(new URL("./settings.json", import.meta.url)))
