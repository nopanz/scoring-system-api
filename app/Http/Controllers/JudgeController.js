'use strict'

const JudgeOperation = use('App/Operations/JudgeOperation')

class JudgeController {

  *index (request, response) {
    try {
      const data = request.all()
      const op = new JudgeOperation()
      op.data = data

      const judge = yield op.create()
      response.json(judge)
    } catch (err) {
      response.status(500).json(err.message)
    }
  }
}

module.exports = JudgeController
