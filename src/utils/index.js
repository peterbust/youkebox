/**
 * Adds a given number to each array value within a minimum- and maximum value
 * @param {array} array Array to handle
 * @param {number} add Number to add
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {array} Updated array
 */
const addToEachInArray = (array, add, min, max) => {
  array.forEach((val, i) => {
    array[i] += add
    if (array[i] >= max) array[i] -= max
    if (array[i] < min) array[i] += max
  })
  return array
}

/**
 * Sets a minimum of x digits
 * @param {number} n Number to handle
 * @param {number} minimumDigits Number of minimum digits
 * @returns {string} Minimum digit string
 */
const enforceMinimumDigits = (n, minimumDigits) => {
  let digitsToAdd = ''
  for (let i = 0; i < minimumDigits; i += 1) digitsToAdd += '0'
  return n.toString().length < minimumDigits
    ? (digitsToAdd + n).slice(-minimumDigits)
    : n.toString()
}

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

/**
 * Calculate milliseconds to minutes
 * @param {number} milliseconds Value to calculate to minutes
 * @returns {number} Calculated minutes
 */
const millisecondsToMinutes = milliseconds => ((milliseconds / 1000) / 60)

export {
  addToEachInArray,
  enforceMinimumDigits,
  getKeyByValue,
  millisecondsToMinutes,
}
