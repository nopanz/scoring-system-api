'use strict'

const ScoreOperation = use('App/Operations/ScoreOperation')

class ScoreController {

  * index (req, res) {
    try {
      const op = new ScoreOperation()
      op.data = req.all()
      op.data = req.params()
      const response = yield op.putScore()
      if (!response) {
        return res.status(op.error.code).json(op.error)
      }
      res.status(204).send()
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = ScoreController
