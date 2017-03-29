'use strict'

const PageantOperation = use('App/Operations/PageantOperation')

class PageantController {

  * index (req, res) {
    try {
      const data = req.all()
      const op = new PageantOperation()
      op.datas = data

      const pageant = yield op.create()
      if (pageant) {
        res.json(pageant)
      } else {
        res.status(op.error.code).json(op.error.message)
      }
    } catch (error) {
      res.status(404).json(error.message)
    }
  }

  * getPageants (req, res) {
    try {
      const op = new PageantOperation()
      const pageants = yield op.getPageants()
      if (!pageants) {
        return res.status(op.error.code).json(op.error.message)
      }
      res.json(pageants)
    } catch (err) {
      res.status(err.code).json(err.message)
    }
  }

  * getPageant (req, res) {
    try {
      const pageantId = req.param('pageantId')
      const op = new PageantOperation()

      op.pageantId = pageantId

      let pageant = yield op.getPageant()

      if (!pageant) {
        return res.status(op.error.code).json(op.error.message)
      }
      res.json(pageant)
    } catch (err) {
      res.status(err.code).json(err.message)
    }
  }
}

module.exports = PageantController
