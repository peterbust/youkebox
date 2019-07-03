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
 * Sets up an event listener for 'keyup'
 * @param {string || number} code Key code
 * @param {function} action Function to execute on event
 * @returns {event} Event listener 'keyup'
 */
const makeKeyupEvent = (code, action) => {
  const type = typeof code === 'string' ? 'code' : 'keyCode'
  return document.addEventListener('keyup', (evt) => {
    if (evt[type] === code) action()
  })
}

export {
  addToEachInArray,
  getKeyByValue,
  makeKeyupEvent,
}
