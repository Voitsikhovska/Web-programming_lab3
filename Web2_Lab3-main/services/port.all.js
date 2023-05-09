const Port = require('../models/port')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Port.find({})
      .exec(function (err, ports) {
        if (err) {
          reject(err)
        } else {
          resolve(ports)
        }
      })
  })
}
