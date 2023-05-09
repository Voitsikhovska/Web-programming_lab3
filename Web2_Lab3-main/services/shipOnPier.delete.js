const ShipOnPier = require('../models/shipOnPier')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    ShipOnPier.findByIdAndDelete(data.id, function (err, deletedShipOnPier) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedShipOnPier)
      }
    })
  })
}
