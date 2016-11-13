'use strict'

const Schema = use('Schema')

class AverageTableSchema extends Schema {

  up () {
    this.create('average', (table) => {
      table.increments('average_id').primary()
      table.decimal('average')
      table.integer('round_id')
      table.integer('contestant_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('average')
  }

}

module.exports = AverageTableSchema
