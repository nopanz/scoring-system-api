'use strict'

const Operation = use('App/Operations/Operation')
const User = use('App/Model/User')
const Hash = use('Hash')

const SCENARIO = {
  DEFAULT: 'auth',
  USER: 'get-user'
}

class UserOperation extends Operation {
  constructor (props) {
    super(props)
    this.email = null
    this.password = null
    this.scenario = SCENARIO.DEFAULT
  }

  get rules () {
    return {
      email: `required_when:scenario,${SCENARIO.DEFAULT}|email`,
      password: `required_when:scenario,${SCENARIO.DEFAULT}`
    }
  }

  get messages () {
    return {
      required_when: '{{field}} is required'
    }
  }

  * authenticateUser () {
    let isValid = yield this.validate()
    if (!isValid) {
      return false
    }
    try {
      let user = yield User.query().where({email: this.email}).first()
      let userHashPass = user.password

      const verify = yield Hash.verify(this.password, userHashPass)

      if (!verify) {
        this.errors.push({code: 401, message: 'Invalid Credential'})
        return false
      }
      return user
    } catch (error) {
      this.errors.push({code: 401, message: error.message})
      return false
    }
  }

}

module.exports = UserOperation
