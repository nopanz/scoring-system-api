const Operation = use('App/Operations/Operation')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserOperation extends Operation {
  constructor (props) {
    super(props)
    this.email = null
    this.password = null
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    return {
      required: '{{field}} is required'
    }
  }

  * getUser () {
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
