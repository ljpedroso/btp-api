const { authMiddleware: middleware } = require('@app/middleware')
const { categoryValidator: validator } = require('@app/validator')
const { category } = require('@app/module')

module.exports = function (router) {
  router.get('/category', middleware.isAuth, category.getAll)
  router.get('/category/:id', middleware.isAuth, category.getById)
  router.post('/category', middleware.isAuth, validator.addCategory, category.addCategory)
  router.put('/category/:id', middleware.isAuth, validator.updateCategory, category.updateCategory)
  router.patch(
    '/category/:id',
    middleware.isAuth,
    validator.updateCategory,
    category.updateCategory
  )
  router.delete('/category/:id', middleware.isAuth, category.deleteCategory)
}
