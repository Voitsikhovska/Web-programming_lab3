const ShipOnPier = require('./../models/shipOnPier')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const shipOnPier = new ShipOnPier({
    ship: data.ship,
    pier: data.pier
  })

  return new Promise((resolve, reject) => {
    shipOnPier.save(function (err, createdShipOnPier) {
      if (err) {
        reject(err)
      } else {
        resolve(createdShipOnPier)
      }
    })
  })
}
