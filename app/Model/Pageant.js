'use strict'

const Lucid = use('Lucid')

class Pageant extends Lucid {
  static get table () {
    return 'pageant'
  }
  static get primaryKey () {
    return 'pageant_id'
  }
  judge () {
    return this.hasMany('App/Model/Judge')
  }
  round () {
    return this.hasMany('App/Model/Round')
  }
  contestant () {
    return this.hasMany('App/Model/contestant')
  }
}

module.exports = Pageant
