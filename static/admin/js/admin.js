if (window.location.pathname === "/admin-create") {
	await import("./adminCreate.js")
} else if (window.location.pathname === "/admin-config-site") {
	await import("./adminConfigSite.js")
} else if (window.location.pathname === "/admin-config-menu") {
	await import("./adminConfigMenu.js")
} else if (window.location.pathname.startsWith("/admin-pages")) {
	await import("./pagesTable.js")
} else if (window.location.pathname.startsWith("/admin-posts")) {
	await import("./postsTable.js")
} else {
	await import("./adminUpdate.js")
}
