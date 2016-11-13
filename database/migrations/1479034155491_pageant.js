'use strict'

const Schema = use('Schema')

class PageantTableSchema extends Schema {

  up () {
    this.create('pageant', (table) => {
      table.increments('pageant_id').primary()
      table.string('name')
      table.date('date')
      table.string('where')
      table.integer('number_of_round')
      table.integer('number_of_judge')
      table.timestamps()
    })
  }

  down () {
    this.drop('pageant')
  }

}

module.exports = PageantTableSchema
