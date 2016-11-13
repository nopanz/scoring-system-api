'use strict'

const Lucid = use('Lucid')

class Average extends Lucid {
  static get table () {
    return 'average'
  }
  static get primaryKey () {
    return 'average_id'
  }
  round () {
    return this.belongsTo('App/Model/Round')
  }
  contestant () {
    return this.belongsTo('App/Model/Contestant')
  }
}

module.exports = Average
