'use strict'

const Schema = use('Schema')

class ContestantTableSchema extends Schema {

  up () {
    this.create('contestant', (table) => {
      table.increments('contestant_id').primary()
      table.string('firstName')
      table.string('lastName')
      table.string('image_url')
      table.string('gender')
      table.integer('queue_number')
      table.timestamps()
      table.integer('pageant_id')
    })
  }

  down () {
    this.drop('contestant')
  }

}

module.exports = ContestantTableSchema
