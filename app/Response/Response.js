'use strict'

const _ = require('lodash')

class Response {
  constructor (props) {
    this.object = null
  }

  get rules () {
    return []
  }

  * execute () {
    return _.omit(this.object, this.rules)
  }
}

module.exports = Response
