import { join } from "path"
import { LiteNode } from "litenode"
import { Eta } from "eta"

const app = new LiteNode()
const eta = new Eta({ views: join(process.cwd(), "views") })

export { app, eta }
