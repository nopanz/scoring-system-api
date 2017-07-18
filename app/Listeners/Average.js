'use strict'

const Average = exports = module.exports = {}
const AverageModel = use('App/Model/Average')
const Score = use('App/Model/Score')
const Pageant = use('App/Model/Pageant')
const Database = use('Database')

Average.computeAverage = function * (data) {
  // this.emitter gives access to the event instance
  let pageant = yield Pageant.find(data.pageantId)
  let judges = pageant.number_of_judge

  let whereQuery = {contestant_id: data.contestantId, round_number: data.round}

  let scoreCount = yield Score.query().where(whereQuery).count()
  if (judges === parseInt(scoreCount[0].count)) {
    let sum = yield Score.query().where(whereQuery).sum('score')

    const average = parseInt(sum[0].sum) / judges
    let trx = yield Database.beginTransaction()
    try {
      let op = new AverageModel()
      op.useTransaction(trx)
      op.average = average
      op.round_number = data.round
      op.contestant_id = data.contestant_id
      yield op.save()
      trx.commit()
    } catch (error) {
      console.log(error)
      trx.rollback()
    }
  }
}
