const Validator = use('Validator')

/**
 * Operation Base Class
 *
 * @author reyaleonar <reyaleonar@gmail.com>
 */
class Operation {

  constructor (params) {
    this.validator = Validator
    this.errors = []
  }

  /**
   * Get the validation rules
   * @returns {{}}
   */
  get rules () {
    return {}
  }

  /**
   * Get the error messages for each rules
   * @returns {{}}
   */
  get messages () {
    return {}
  }

  /**
   *  Validate the properties
   * @returns {boolean}
   */
  *validate (obj = null, rules = null) {
    let model = obj ? obj : this
    let validatorRules = rules ? rules : this.rules

    let validation = yield this.validator.validate(model, validatorRules, this.messages)
    if (validation.fails()) {
      this.errors = validation.messages().map(error => {
        return {
          code: 400,
          message: error.message
        }
      })

      return false
    }

    return true
  }

  /**
   * Get the error messages
   * @returns {Array}
   */
  getFirstError () {
    return this.errors[0]
  }
}

module.exports = Operation
