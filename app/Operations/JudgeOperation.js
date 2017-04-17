'use strict'

const Operation = use('App/Operations/Operation')

const Judge = use('App/Model/Judge')

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

}

module.exports = JudgeOperation
