const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
  data: Buffer,
  contentType: String
})

module.exports = mongoose.model('File', fileSchema)
