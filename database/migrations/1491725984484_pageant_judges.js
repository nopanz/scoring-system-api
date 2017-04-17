'use strict'

const Schema = use('Schema')

class PageantJudgesTableSchema extends Schema {

  up () {
    this.create('pageant_judges', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pageant_id')
      table.integer('judge_id')
    })
  }

  down () {
    this.drop('pageant_judges')
  }

}

module.exports = PageantJudgesTableSchema
