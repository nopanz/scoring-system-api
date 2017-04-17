'use strict'

const Schema = use('Schema')

class AverageAdjustmentTableSchema extends Schema {

  up () {
    this.alterTable('average', (table) => {
      table.renameColumn('round_id', 'round_number')
      // alter average_adjustment table
    })
  }

  down () {
    this.table('average_adjustment', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = AverageAdjustmentTableSchema
