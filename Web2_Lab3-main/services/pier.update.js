const Pier = require('../models/pier')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  console.log(data)
  const pier = {
    number: data.number,
    port: data.port,
    capacity: data.capacity,
    minSediment: data.minSediment
  }

  return new Promise((resolve, reject) => {
    Pier.findByIdAndUpdate(
      data.id,
      { $set: pier },
      { new: true },
      function (err, updatedPier) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedPier)
        }
      })
  })
}
