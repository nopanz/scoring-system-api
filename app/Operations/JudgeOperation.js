'use strict'

const Operation = use('App/Operations/Operation')

const Judge = use('App/Model/Judge')
const _ = require('lodash')
const Hash = use('Hash')

class JudgeOperation extends Operation {

  constructor (props) {
    super(props)
    this.scenario = this.scenarios.DEFAULT

    this.firstName = null
    this.lastName = null
    this.pageant_id = null
    this.password = null
    this.email = null
  }

  get rules () {
    let {DEFAULT, AUTH} = this.scenarios

    const customRules = {
      [DEFAULT]: {
        firstName: 'required',
        lastName: 'required',
        password: 'required',
        email: 'required|unique:judge',
        pageant_id: 'required'
      },
      [AUTH]: {
        email: 'required',
        password: 'required'
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
      DEFAULT: 'default',
      AUTH: 'auth-judge'
    }
  }

  * create () {
    let isValid = yield this.validate()
    if (!isValid) {
      return false
    }

    try {
      const judge = new Judge()
      judge.firstName = this.firstName
      judge.lastName = this.lastName
      judge.password = this.password
      judge.pageant_id = this.pageant_id
      judge.email = this.email

      yield judge.save()
      if (!judge) {
        return false
      }
      return judge
    } catch (error) {
      this.errors.push({code: 500, message: error.message})
      return false
    }
  }

  set data (data) {
    _.merge(this, data)
  }

  * authorize () {
    this.scenario = this.scenarios.AUTH
    let isValid = this.validate()
    if (!isValid) {
      return false
    }
    try {
      let judge = yield Judge.query().where({email: this.email}).first()
      if (!judge) {
        this.errors.push({code: 401, message: 'Email Not Found'})
        return false
      }
      let judgeHashPass = judge.password

      const verify = yield Hash.verify(this.password, judgeHashPass)
      if (!verify) {
        this.errors.push({code: 401, message: 'Invalid Credential'})
        return false
      }
      return judge
    } catch (error) {
      this.errors.push({code: 401, message: error.message})
      return false
    }
  }

}

module.exports = JudgeOperation
