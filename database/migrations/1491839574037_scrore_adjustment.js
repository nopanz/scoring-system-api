'use strict'

const Schema = use('Schema')

class ScroreAdjustmentTableSchema extends Schema {

  up () {
    this.alterTable('score', (table) => {
      // alter scrore_adjustment table
      table.renameColumn('round_id', 'round_number')
    })
  }

  down () {
    this.alterTable('score', (table) => {
      // opposite of up goes here
      table.renameColumn('round_number', 'round_id')
    })
  }

}

module.exports = ScroreAdjustmentTableSchema
