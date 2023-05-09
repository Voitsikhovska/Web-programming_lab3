const Port = require('../models/port')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    Port.findById(id, function (err, port) {
      if (err) {
        reject(err)
      } else {
        resolve(port)
      }
    })
  })
}
