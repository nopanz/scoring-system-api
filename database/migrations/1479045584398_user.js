'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('user', (table) => {
      table.increments('user_id').primary()
      table.timestamps()
      table.string('firstName')
      table.string('lastName')
      table.string('email').unique()
      table.string('password', 60)
      table.integer('role_id')
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
