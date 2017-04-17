'use strict'

const UserOperation = use('App/Operations/UserOperation')
const PageantOperation = use('App/Operations/PageantOperation')

class JudgeController {

  *index (request, response) {
    try {
      const pageantId = request.param('pageantId')
      const params = request.all()

      const pageantOp = new PageantOperation()
      pageantOp.pageantId = pageantId

      let pageant = yield pageantOp.getPageant()

      if (!pageant) {
        return response.status(pageantOp.error.code).json(pageantOp.error)
      }

      const userOp = new UserOperation()

      userOp.data = params
      const judge = yield userOp.create()

      if (!judge) {
        return response.status(userOp.error.code).json(userOp.error)
      }

      yield judge.pageants().attach([pageant.pageant_id])
      return response.json(judge)
    } catch (err) {
      response.status(500).json(err)
    }
  }

  * getJudges (request, response) {
    try {
      const pageantId = request.param('pageantId')
      const op = new PageantOperation()
      op.pageantId = pageantId
      let judges = yield op.getJudges()
      if (!judges) {
        return response.status(op.error.code).json(op.error)
      }
      response.json(judges)
    } catch (err) {
      response.status(500).json(err)
    }
  }
}

module.exports = JudgeController
