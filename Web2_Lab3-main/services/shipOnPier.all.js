const ShipOnPier = require('./../models/shipOnPier')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    ShipOnPier.find({})
      .populate('ship')
      .populate('pier')
      .exec(function (err, shipOnPiers) {
        if (err) {
          reject(err)
        } else {
          console.log(shipOnPiers)
          resolve(shipOnPiers)
        }
      })
  })
}
