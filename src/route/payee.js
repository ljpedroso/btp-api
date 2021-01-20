const { authMiddleware: middleware } = require('@app/middleware')
const { payeeValidator: validator } = require('@app/validator')
const { payee } = require('@app/module')

module.exports = function (router) {
  router.get('/payee', middleware.isAuth, payee.getAll)
  router.get('/payee/:id', middleware.isAuth, payee.getById)
  router.post('/payee', middleware.isAuth, validator.addPayee, payee.addPayee)
  router.put('/payee/:id', middleware.isAuth, validator.updatePayee, payee.updatePayee)
  router.patch('/payee/:id', middleware.isAuth, validator.updatePayee, payee.updatePayee)
  router.delete('/payee/:id', middleware.isAuth, payee.deletePayee)
}
