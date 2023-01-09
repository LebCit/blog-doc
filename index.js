const express = require("express")
const app = express()
exports.app = app

app.use(express.static("public"))
app.set("view engine", "ejs")

const liveReload = require("./functions/liveReload")
liveReload()

const router = (global.router = express.Router())
app.use(router)

app.use("/", require("./routes/mainRoute"))
app.use("/", require("./routes/filesRoute"))
app.use("/", require("./routes/archiveRoute"))
app.use("/", require("./routes/tagsRoute"))
app.use("/", require("./routes/rssRoute"))

// 404 route
app.use((req, res, next) => {
	const titles = {
		docTitle: "Page Not Found",
		docDescription: "The server cannot find the requested resource",
	}
	res.status(404).render("layouts/error", {
		titles: titles,
		headerTitle: "Page Not Found",
		headerSubtitle: "Nothing to land on here !",
		imageSrc: "/images/404-not-found-error.png",
		imageAlt: "Sailor on a 404 mast looking out to sea",
	})
})

// 500 route
app.use((err, req, res, next) => {
	console.error(err.stack)
	const titles = {
		docTitle: "Internal Server Error",
		docDescription: "The server encountered an unexpected condition that prevented it from fulfilling the request",
	}
	res.status(500).render("layouts/error", {
		titles: titles,
		headerTitle: "Internal Server Error",
		headerSubtitle: "Server is on a break here !",
		imageSrc: "/images/500-internal-server-error.png",
		imageAlt: "Sad robot in front of empty box",
	})
})

app.listen(3000, () => {
	console.log(`App 🚀 @ http://localhost:3000`)
})
