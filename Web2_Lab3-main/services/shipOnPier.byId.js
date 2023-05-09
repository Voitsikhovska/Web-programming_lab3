const ShipOnPier = require('./../models/shipOnPier')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    ShipOnPier.findById(id, function (err, shipOnPier) {
      if (err) {
        reject(err)
      } else {
        resolve(shipOnPier)
      }
    })
  })
}
