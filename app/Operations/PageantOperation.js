'use strict'

const Operation = use('App/Operations/Operation')
const Pageant = use('App/Model/Pageant')
const _ = require('lodash')

class PageantOperation extends Operation {
  constructor (props) {
    super(props)
    this.scenario = this.scenarios.DEFAULT
    this.pageantId = null
  }

  get rules () {
    let {DEFAULT, GET_PAGEANT} = this.scenarios
    const customRules = {
      [DEFAULT]: {
        name: `required`,
        date: `required|date`,
        where: `required`,
        number_of_round: `required|integer`,
        number_of_judge: `required|integer`
      },
      [GET_PAGEANT]: {
        pageantId: 'required'
      }
    }

    return this.setRules(null, customRules)
  }

  get messages () {
    return {
      required: `{{field}} is required`,
      integer: '{{field}} is  not  a number',
      date: 'Invalid Date Format'
    }
  }

  get scenarios () {
    return {
      DEFAULT: 'default',
      GET_PAGEANT: 'get-pageant'
    }
  }

  set datas (data) {
    this.params = data
    _.merge(this, data)
  }

  * create () {
    let isValid = yield this.validate()
    if (!isValid) {
      return false
    }

    try {
      const pageant = yield Pageant.create(this.params)
      return pageant
    } catch (error) {
      this.errors.push({code: 401, message: error.message})
    }
  }

  * getPageants () {
    try {
      const pageants = yield Pageant.all()
      return pageants
    } catch (error) {
      this.errors.push({code: 401, message: error.message})
    }
  }

  * getPageant () {
    this.scenario = this.scenarios.GET_PAGEANT
    try {
      let isValid = yield this.validate()

      if (!isValid) return false

      let pageant = yield Pageant.find(this.pageantId)
      if (!pageant) {
        this.errors.push({code: 404, message: 'Pageant Not Found'})
        return false
      }

      return pageant
    } catch (error) {
      this.errors.push({code: 500, message: error.message})
      return false
    }
  }

  * getJudges () {
    this.scenario = this.scenarios.GET_PAGEANT

    try {
      let isValid = yield this.validate()
      if (!isValid) {
        return false
      }

      const pageant = yield Pageant.find(this.pageantId)
      if (!pageant) {
        this.errors.push({code: 404, message: 'Pageant Not Found'})
        return false
      }

      const judges = yield pageant.judges().fetch()
      return judges
    } catch (error) {
      this.errors.push({code: 500, message: error.message})
      return false
    }
  }

}

module.exports = PageantOperation
