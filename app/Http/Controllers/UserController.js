'use strict'
const Hash = use('Hash')
class UserController {
  static get inject () {
    return ['App/Model/User']
  }

  constructor (User) {
    this.User = User
  }

  * index (request, response) {
    try {
      const data = request.all()
      let user = yield this.User.query().where({email: data.email}).first()
      let userHashPass = user.password
      const verify = yield Hash.verify(data.password, userHashPass)

      if (verify) {
        response.json(user)
      } else {
        response.unautorized('Invalid Credentaials')
      }
    } catch (error) {
      // response.status(404).json(error)
    }
  }
}

module.exports = UserController
