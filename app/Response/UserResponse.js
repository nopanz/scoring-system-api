'use strict'

const Response = use('App/Response/Response')

class UserResponse extends Response {
  constructor (object) {
    super(object)
    this.object = object
  }
  get rules () {
    return ['password']
  }
}

module.exports = UserResponse
