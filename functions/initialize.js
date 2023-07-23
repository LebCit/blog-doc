import { join } from "path"
import { Hono } from "hono"
import { Eta } from "eta"

export function initializeApp() {
	const app = new Hono()
	const eta = new Eta({ views: join(process.cwd(), "views") })

	return { app, eta }
}
