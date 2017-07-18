'use strict'

const Lucid = use('Lucid')

class Score extends Lucid {

  static get table () {
    return 'score'
  }
  static get primaryKey () {
    return 'score_id'
  }
  round () {
    return this.belongsTo('App/Model/Round')
  }
  judge () {
    return this.belongsTo('App/Model/User')
  }
  contestant () {
    return this.belongsTo('App/Model/Contestant')
  }
}

module.exports = Score
