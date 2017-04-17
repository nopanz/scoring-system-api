'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.encryptPassword')
  }

  static get table () {
    return 'user'
  }
  static get primaryKey () {
    return 'user_id'
  }

  static get hidden () {
    return ['password', '_pivot_pageant_id', '_pivot_judge_id']
  }

  role () {
    return this.belongsTo('App/Model/Role')
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  pageants () {
    return this.belongsToMany('App/Model/Pageant', 'pageant_judges', 'judge_id', 'pageant_id')
  }

  score () {
    return this.hasMany('App/Model/Score', 'user_id', 'judge_id')
  }
}

module.exports = User
