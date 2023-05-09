const Port = require('../models/port')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Port.findByIdAndDelete(data.id, function (err, deletedPort) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedPort)
      }
    })
  })
}
