'use strict'

const Lucid = use('Lucid')

class PageantJudges extends Lucid {

  static get table () {
    return 'pageant_judges'
  }

}

module.exports = PageantJudges
