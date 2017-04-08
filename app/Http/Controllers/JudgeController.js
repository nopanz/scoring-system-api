'use strict'

const UserOperation = use('App/Operations/UserOperation')

class JudgeController {

  *index (request, response) {
    try {
      const data = request.all()
      const op = new UserOperation()
      op.data = data

      const judge = yield op.create()
      if (!judge) {
        return response.status(op.error.code).json(op.error)
      }
      response.json(judge)
    } catch (err) {
      response.status(500).json(err.message)
    }
  }
}

module.exports = JudgeController
