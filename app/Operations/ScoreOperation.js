'use strict'

const Operation = use('App/Operations/Operation')
const Score = use('App/Model/Score')
const Contestant = use('App/Model/Contestant')
const Judge = use('App/Model/User')
const Pageant = use('App/Model/Pageant')
const Event = use('Event')

const Database = use('Database')

class ScoreOperation extends Operation {
  constructor (props) {
    super(props)
    this.score = null
    this.round = null
    this.contestantId = null
    this.judgeId = null
    this.scenario = this.scenarios.DEFAULT
  }

  get rules () {
    let {DEFAULT} = this.scenarios

    const customRules = {
      [DEFAULT]: {
        score: 'required',
        round_number: 'required',
        contestantId: 'required',
        judgeId: 'required',
        pageantId: 'required'
      }

    }
    return this.setRules(null, customRules)
  }

  get messages () {
    return {
      required: `{{field}} is requird`,
      unique: `{{field}} should be unique`
    }
  }

  get scenarios () {
    return {
      DEFAULT: 'score'
    }
  }

  * putScore () {
    let isValid = yield this.validate()

    if (!isValid) return false

    let trx = yield Database.beginTransaction()
    try {
      let pageant = yield Pageant.find(this.pageantId)

      if (!pageant) {
        this.errors.push({code: 403, message: 'Pageant not found'})
        return false
      }

      let contestant = yield Contestant.find(this.contestantId)

      if (!contestant) {
        this.errors.push({code: 403, message: 'Contestant not found'})
        return false
      }

      let judge = yield Judge.find(this.judgeId)

      if (!judge) {
        this.errors.push({code: 403, message: 'Judge  not found'})
        return false
      }

      let score = new Score()

      score.useTransaction(trx)

      score.score = this.score
      score.round_number = this.round_number

      yield contestant.score().save(score)
      yield judge.score().save(score)

      trx.commit()
      Event.fire('score.added', {pageantId: this.pageantId, round: this.round_number, contestantId: this.contestantId})
      return score
    } catch (error) {
      this.errors.push({code: 500, message: error.message})
      trx.rollback()
      return false
    }
  }
}

module.exports = ScoreOperation
