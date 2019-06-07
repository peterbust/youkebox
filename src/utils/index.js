/**
 * Returns the key of a requested value in an object
 * @param {object} object Object to search in
 * @param {string} value Value to look for
 * @returns {number || string} Key of requested value
 */
const getKeyByValue = (object, value) => {
  const result = Object.keys(object).find(key => object[key] === value)
  return Number.isNaN(result) ? result : parseInt(result, 10)
}

export default getKeyByValue
