/**
 * Maps an object's keys and values into an array of objects with custom key names.
 * Internal links (keys that do not start with "http", "https", "ftp", "mailto", "tel", "file", "data", "ws", or "wss")
 * will have a leading slash added. External links will retain their original value.
 *
 * @param {Object} obj - The object to map.
 * @param {string} keyName - The name to use for the key property in the output objects.
 * @param {string} valueName - The name to use for the value property in the output objects.
 * @returns {Array<Object>} An array of objects with properties named according to keyName and valueName.
 *
 * @example
 * const settings = { menuLinks: { home: 'Home', about: 'About Us', 'http://example.com': 'Example', 'mailto:test@example.com': 'Contact Us' } };
 * const menuLinks = transformLinksToObjects(settings.menuLinks, 'linkTarget', 'linkTitle');
 * // Output: [
 * //   { linkTarget: '/home', linkTitle: 'Home' },
 * //   { linkTarget: '/about', linkTitle: 'About Us' },
 * //   { linkTarget: 'http://example.com', linkTitle: 'Example' },
 * //   { linkTarget: 'mailto:test@example.com', linkTitle: 'Contact Us' }
 * // ]
 */
export function transformLinksToObjects(obj, keyName, valueName) {
	return Object.keys(obj).map((key) => {
		const isExternal = /^(http|https|ftp|mailto|tel|file|data|ws|wss):/.test(key)
		return {
			[keyName]: isExternal ? key : `/${key}`,
			[valueName]: obj[key],
		}
	})
}
