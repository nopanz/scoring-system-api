'use strict'

const Operation = use('App/Operations/Operation')
const User = use('App/Model/User')
const Role = use('App/Model/Role')
const Hash = use('Hash')

const _ = require('lodash')

class UserOperation extends Operation {
  constructor (props) {
    super(props)
    this.email = null
    this.password = null
    this.firstName = null
    this.lastName = null
    this.role = null
    this.scenario = this.scenarios.DEFAULT
  }

  get rules () {
    let {DEFAULT, CREATE} = this.scenarios
    let rules = {
      password: 'required'
    }
    const customRules = {
      [DEFAULT]: {
        email: 'required|email'
      },
      [CREATE]: {
        email: 'required|email|unique:user',
        firstName: 'required',
        lastName: 'required'
      }
    }
    return this.setRules(rules, customRules)
  }

  get messages () {
    return {
      required: `{{field}} is requird`,
      unique: `{{field}} should be unique`
    }
  }

  get scenarios () {
    return {
      DEFAULT: 'auth',
      CREATE: 'create-user'
    }
  }

  set data (data) {
    _.merge(this, data)
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

  * create () {
    this.scenario = this.scenarios.CREATE
    let isValid = yield this.validate()
    if (!isValid) {
      return false
    }
    try {
      let role = yield Role.query().where({role: this.role}).first()
      if (!role) {
        this.errors.push({code: 403, message: 'Role Not Found'})
        return false
      }
      const user = new User()
      user.password = this.password
      user.email = this.email
      user.firstName = this.firstName
      user.lastName = this.lastName
      yield user.save()

      yield role.user().save(user)
      return user
    } catch (error) {
      this.errors.push({code: 500, message: error.message})
      return false
    }
  }

}

module.exports = UserOperation
