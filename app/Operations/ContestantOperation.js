'use strict'

const Operation = use('App/Operations/Operation')
const Database = use('Database')
const Contestant = use('App/Model/Contestant')
const PageantOperation = use('App/Operations/PageantOperation')

class ContestantOperation extends Operation {
  constructor (props) {
    super(props)
    this.firstName = null
    this.lastName = null
    this.image_url = null
    this.gender = null
    this.pageantId = null
    this.queue_number = null
    this.scenario = this.scenarios.DEFAULT
  }

  get rules () {
    const {DEFAULT, GET_CONTESTANT} = this.scenarios
    const customRules = {
      [DEFAULT]: {
        'firstName': 'required',
        'lastName': 'required',
        'gender': 'required',
        'pageantId': 'required'
      },
      [GET_CONTESTANT]: {
        pageantId: 'required'
      }
    }
    return this.setRules(null, customRules)
  }

  get messages () {
    return {
      'required': `{{field}} is required`
    }
  }

  get scenarios () {
    return {
      DEFAULT: 'create',
      GET_CONTESTANT: 'get-contestant'
    }
  }

  * create () {
    let isValid = yield this.validate()
    if (!isValid) {
      return false
    }
    const pageantOp = new PageantOperation()
    pageantOp.pageantId = this.pageantId
    let pageant = yield pageantOp.getPageant()

    if (!pageant) {
      this.errors.push(pageantOp.error)
      return false
    }

    let trx = yield Database.beginTransaction()
    try {
      let contestant = new Contestant()

      contestant.useTransaction(trx)

      contestant.firstName = this.firstName
      contestant.lastName = this.lastName
      contestant.gender = this.gender
      contestant.queue_number = this.queue_number
      yield contestant.save()

      yield pageant.contestant().save(contestant)
      trx.commit()
      return contestant
    } catch (error) {
      this.errors.push({code: 500, message: error.message})
      trx.rollback()
      return false
    }
  }

  * getContestants () {
    this.scenario = this.scenarios.GET_CONTESTANT
    let isValid = yield this.validate()

    if (!isValid) return false

    try {
      const op = new PageantOperation()
      op.pageantId = this.pageantId

      let pageant = yield op.getPageant()
      if (!pageant) {
        this.errors.push(op.error)
        return false
      }

      const contestants = yield pageant.contestants().fetch()
      return contestants
    } catch (err) {
      this.errors.push({code: 500, message: err.message})
      return false
    }
  }

}

module.exports = ContestantOperation
