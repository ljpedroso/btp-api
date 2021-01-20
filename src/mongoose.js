const mongoose = require('mongoose')
const winston = require('winston')

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(error => winston.error(error))

mongoose.connection.on('open', () => winston.info('MongoDB connected'))

module.exports = mongoose
