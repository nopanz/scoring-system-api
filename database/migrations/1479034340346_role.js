'use strict'

const Schema = use('Schema')

class RoleTableSchema extends Schema {

  up () {
    this.create('role', (table) => {
      table.increments('role_id').primary()
      table.string('role')
      table.timestamps()
    })
  }

  down () {
    this.drop('role')
  }

}

module.exports = RoleTableSchema
