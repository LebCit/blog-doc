const livereload = require("livereload")
const connectLiveReload = require("connect-livereload")
const { app } = require("../index")

module.exports = () => {
	// Create a server with livereload and fire it up
	const liveReloadServer = livereload.createServer()
	// Refresh the browser after each saved change on the server with a delay of 100 ms
	liveReloadServer.server.once("connection", () => {
		setTimeout(() => {
			liveReloadServer.refresh("/")
		}, 100)
	})
	// Add livereload script to the response
	app.use(connectLiveReload())
}
