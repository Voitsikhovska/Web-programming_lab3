const Pier = require('../models/pier')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Pier.find({})
      .populate('pier')
      .exec(function (err, piers) {
        if (err) {
          reject(err)
        } else {
          console.log(piers)
          resolve(piers)
        }
      })
  })
}
