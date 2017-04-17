'use strict'

const Lucid = use('Lucid')

class Contestant extends Lucid {
  static get table () {
    return 'contestant'
  }

  static get primaryKey () {
    return 'contestant_id'
  }
  score () {
    return this.hasMany('App/Model/Score')
  }
  average () {
    return this.hasMany('App/Model/Average')
  }

  pageant () {
    return this.belongsTo('App/Model/Pageant')
  }
}

module.exports = Contestant
