'use strict'

const ContestantOperation = use('App/Operations/ContestantOperation')

class ContestantController {

  * index (req, res) {
    try {
      const pageantId = req.param('pageantId')
      const params = req.all()

      const contestantOp = new ContestantOperation()
      contestantOp.data = params
      contestantOp.pageantId = pageantId

      const contestant = yield contestantOp.create()
      if (!contestant) {
        return res.status(contestantOp.error.code).json(contestantOp.error)
      }

      return res.json(contestant)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  * getContestants (req, res) {
    try {
      const pageantId = req.param('pageantId')
      const op = new ContestantOperation()
      op.pageantId = pageantId

      let contestant = yield op.getContestants()
      if (!contestant) {
        return res.status(op.error.code).json(op.error)
      }

      res.json(contestant)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

}

module.exports = ContestantController
