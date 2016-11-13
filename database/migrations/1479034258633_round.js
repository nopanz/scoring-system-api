'use strict'

const Schema = use('Schema')

class RoundTableSchema extends Schema {

  up () {
    this.create('round', (table) => {
      table.increments('round_id').primary()
      table.string('round_type')
      table.timestamps()
      table.integer('pageant_id')
    })
  }

  down () {
    this.drop('round')
  }

}

module.exports = RoundTableSchema
