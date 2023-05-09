const Pier = require('../models/pier')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Pier.findByIdAndDelete(data.id, function (err, deletedPier) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedPier)
      }
    })
  })
}
