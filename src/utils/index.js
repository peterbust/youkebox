/**
 * Returns the key of a requested value in an object
 * @param {object} object Object to search in
 * @param {string} value Value to look for
 * @returns {string} Object key of requested value
 */
const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value)

export default getKeyByValue
