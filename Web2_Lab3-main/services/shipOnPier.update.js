const ShipOnPier = require('./../models/shipOnPier')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  console.log(data)
  const shipOnPier = {
    ship: data.ship,
    pier: data.pier
  }

  return new Promise((resolve, reject) => {
    ShipOnPier.findByIdAndUpdate(
      data.id,
      { $set: shipOnPier },
      { new: true },
      function (err, updatedShipOnPier) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedShipOnPier)
        }
      })
  })
}
