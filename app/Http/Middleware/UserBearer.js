'use strict'

class UserBearer {

  * handle (request, response, next) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      return response.unauthorized('Unauthorized')
    }
    yield next
  }

}

module.exports = UserBearer
