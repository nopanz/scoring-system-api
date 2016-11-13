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

  role () {
    return this.belongsTo('App/Model/Role')
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }
}

module.exports = User
