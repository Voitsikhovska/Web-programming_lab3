const Pier = require('../models/pier')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const pier = new Pier({
    number: data.number,
    port: data.port,
    capacity: data.capacity,
    minSediment: data.minSediment
  })

  return new Promise((resolve, reject) => {
    pier.save(function (err, createdPier) {
      if (err) {
        reject(err)
      } else {
        resolve(createdPier)
      }
    })
  })
}
