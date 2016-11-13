'use strict'

const Lucid = use('Lucid')

class Judge extends Lucid {
  static get table () {
    return 'judge'
  }
  static get primaryKey () {
    return 'judge_id'
  }
  score () {
    return this.hasMany('App/Model/Score')
  }
  pageant () {
    return this.belongsTo('App/Model/Pageant')
  }
}

module.exports = Judge
