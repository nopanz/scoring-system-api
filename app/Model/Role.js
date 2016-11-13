'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
  static get table () {
    return 'role'
  }
  static get primaryKey () {
    return 'role_id'
  }
  user () {
    return this.hasMany('App/Model/User')
  }
}

module.exports = Role
