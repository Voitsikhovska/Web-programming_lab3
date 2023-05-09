const Ship = require('./../models/ship')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const shipData = {
    name: data.name,
    number: data.number,
    country: data.country,
    tonnage: data.tonnage,
    sediment: data.sediment
  }

  return new Promise((resolve, reject) => {
    Ship.findByIdAndUpdate(
      data.id,
      { $set: shipData },
      { new: true },
      function (err, updatedShip) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedShip)
        }
      })
  })
}
