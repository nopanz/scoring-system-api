'use strict'

const Schema = use('Schema')

class ScoreTableSchema extends Schema {

  up () {
    this.create('score', (table) => {
      // alter score table
      table.increments('score_id').primary()
      table.decimal('score')
      table.timestamps()
      table.integer('round_id')
      table.integer('judge_id')
      table.integer('contestant_id')
    })
  }

  down () {
    this.create('score', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ScoreTableSchema
