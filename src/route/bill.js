const { authMiddleware: middleware } = require('@app/middleware')
const { billValidator: validator } = require('@app/validator')
const { bill } = require('@app/module')

module.exports = function (router) {
  router.get('/bill', middleware.isAuth, bill.getAll)
  router.get('/bill/:id', middleware.isAuth, bill.getById)
  router.post('/bill', middleware.isAuth, validator.addBill, bill.addBill)
  router.put('/bill/:id', middleware.isAuth, bill.updateBill)
  router.patch('/bill/:id', middleware.isAuth, bill.updateBill)
  router.delete('/bill/:id', middleware.isAuth, bill.deleteBill)
  router.post('/bill/:id/pay', middleware.isAuth, validator.payBill, bill.payBill)
  router.post('/bill/upload', middleware.isAuth, bill.uploadBillFile)
}
