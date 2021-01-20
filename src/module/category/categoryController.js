const HttpStatus = require('http-status-codes')
const CategoryModel = require('@app/module/category/category')

const categoryController = {
  getAll: async (req, res) => {
    const categories = await CategoryModel.find({})
      .sort([['name', 1]])
      .exec()

    return res.status(HttpStatus.OK).json(categories)
  },
  getById: async (req, res) => {
    let category
    try {
      category = await CategoryModel.findById(req.params.id)
      if (category === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category not found' })
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(category)
  },
  addCategory: async (req, res) => {
    let newCategory = new CategoryModel({
      name: req.body.name
    })
    try {
      await CategoryModel.create(newCategory)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(newCategory)
  },
  updateCategory: async (req, res) => {
    let category
    try {
      category = await CategoryModel.findById(req.params.id)
      if (category === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category not found' })
      } else {
        category.name = req.body.name
        await category.save()
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(category)
  },
  deleteCategory: async (req, res) => {
    let category
    try {
      category = await CategoryModel.findById(req.params.id)
      if (category === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category not found' })
      } else {
        await category.deleteOne()
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json({ success: true, data: category })
  }
}

module.exports = categoryController
