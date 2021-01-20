const validator = require('validator')
const HttpStatus = require('http-status-codes')

const categoryValidator = {
  addCategory: async (req, res, next) => {
    let {
      body: { name }
    } = req

    if (!name) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: name' })
    }
    name = validator.trim(name)

    Object.assign(req.body, { name })

    return next()
  },
  updateCategory: async (req, res, next) => {
    let {
      params: { id }
    } = req

    let {
      body: { name }
    } = req

    if (!id) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: id' })
    }

    if (!name) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: name' })
    }
    name = validator.trim(name)

    Object.assign(req.body, { name })

    return next()
  }
}

module.exports = categoryValidator
