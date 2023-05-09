const Pier = require('../models/pier')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    Pier.findById(id, function (err, pier) {
      if (err) {
        reject(err)
      } else {
        resolve(pier)
      }
    })
  })
}
