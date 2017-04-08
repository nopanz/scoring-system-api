'use strict'
const UserOperation = use('App/Operations/UserOperation')
const UserResponse = use('App/Response/UserResponse')

class UserController {

  * index (request, response) {
    try {
      const data = request.all()
      let op = new UserOperation()
      op.email = data.email
      op.password = data.password

      const user = yield op.authenticateUser()

      if (user) {
        let {token} = yield request.auth.generate(user)
        response.json({token})
      } else {
        response.status(op.error.code).json(op.error.message)
      }
    } catch (error) {
      response.status(404).json(error.message)
    }
  }

  * getUser (request, response) {
    yield request.auth.user.related('role').load()
    response.json(request.auth.user)
  }
}

module.exports = UserController
