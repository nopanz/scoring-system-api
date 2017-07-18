'use strict'

const Score = exports = module.exports = {}

Score.computeAverage = function * (next) {
  // {this} belongs to model instance
  yield next
}
