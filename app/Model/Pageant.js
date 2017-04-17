'use strict'

const Lucid = use('Lucid')

class Pageant extends Lucid {
  static get table () {
    return 'pageant'
  }
  static get primaryKey () {
    return 'pageant_id'
  }

  judges () {
    return this.belongsToMany('App/Model/User', 'pageant_judges', 'pageant_id', 'judge_id')
  }
  round () {
    return this.hasMany('App/Model/Round')
  }
  contestants () {
    return this.hasMany('App/Model/Contestant')
  }
}

module.exports = Pageant
