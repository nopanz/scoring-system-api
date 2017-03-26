'use strict'
const UserOperation = use('App/Operations/UserOperation')

class UserController {

  * index (request, response) {
    try {
      const data = request.all()
      let op = new UserOperation()
      op.email = data.email
      op.password = data.password

      const user = yield op.getUser()

      if (user) {
        let {token} = yield request.auth.generate(user)
        response.json({token})
      } else {
        response.status(op.getFirstError().code).json(op.getFirstError().message)
      }
    } catch (error) {
      response.status(404).json(error.message)
    }
  }
}

module.exports = UserController
