export const adminMenuItems = [
	{
		key: "Pages",
		values: [
			{ item: "All Pages", href: "get/all-pages" },
			{ item: "Add new", href: "add/new-page" },
		],
	},
	{
		key: "Posts",
		values: [
			{ item: "All Posts", href: "get/all-posts" },
			{ item: "Add new", href: "add/new-post" },
		],
	},
	{
		key: "Images",
		values: [
			{ item: "Gallery", href: "set/images" },
			{ item: "Routes", href: "set/routes-images" },
		],
	},
	{
		key: "Appearance",
		values: [
			{ item: "Themes", href: "set/theme" },
			{ item: "Menu", href: "set/menu" },
		],
	},
	{
		key: "Settings",
		values: [{ item: "Site", href: "set/site-settings" }],
	},
	{
		key: "Generate",
		values: [{ item: "Static Site", href: "build/static-site" }],
	},
]
