/**
 * Renames a key in an object if it exists and keeps the original key order.
 *
 * @param {Object} obj - The object containing the key to rename.
 * @param {string} oldKey - The key to be renamed.
 * @param {string} newKey - The new key name.
 * @returns {Object} - The object with the renamed key.
 */
export function renameKey(obj, oldKey, newKey) {
	const newObj = {}
	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			if (key === oldKey) {
				newObj[newKey] = obj[oldKey]
			} else {
				newObj[key] = obj[key]
			}
		}
	}
	return newObj
}
