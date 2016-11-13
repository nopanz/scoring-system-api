'use strict'

const Lucid = use('Lucid')

class Round extends Lucid {
  static get table () {
    return 'round'
  }
  static get primaryKey () {
    return 'round_id'
  }
  score () {
    return this.hasMany('App/Model/Score')
  }
  average () {
    return this.hasMany('App/Model/Average')
  }
}

module.exports = Round
