'use strict'

const Schema = use('Schema')

class JudgeTableSchema extends Schema {

  up () {
    this.create('judge', (table) => {
      // alter judge table
      table.integer('pageant_id')
      table.increments('judge_id').primary()
      table.string('firstName')
      table.string('lastName')
      table.string('email').unique()
      table.string('password', 60)
      table.timestamps()
    })
  }

  down () {
    this.table('judge', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = JudgeTableSchema
