'use strict'

const Operation = use('App/Operations/Operation')

const Judge = use('App/Model/Judge')
const _ = require('lodash')

class JudgeOperation extends Operation {

  constructor (props) {
    super(props)
    this.scenario = this.scenarios.DEFAULT
  }

  get rules () {
    let {DEFAULT} = this.scenario

    const customRules = {
      [DEFAULT]: {
        firstName: 'required',
        lastName: 'required',
        password: 'required',
        email: 'required',
        pageant_id: 'required'
      }
    }
    return this.setRules(null, customRules)
  }

  get messages () {
    return {}
  }

  get scenarios () {
    return {
      DEFAULT: 'default'
    }
  }

  * create () {
    let isValid = yield this.validate()

    if (!isValid) return false

    try {
      const judge = new Judge()
      judge.firstName = this.firstName
      judge.lastName = this.lastName
      judge.password = this.password
      judge.pageant_id = this.pageant_id
      judge.email = this.email

      yield judge.save()
      return judge
    } catch (error) {
      this.errors.push({code: 500, message: error.message})
      return false
    }
  }

  set data (data) {
    _.merge(this, data)
  }

}

module.exports = JudgeOperation
