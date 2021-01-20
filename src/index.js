const express = require('express')
const cors = require('cors')
const HttpStatus = require('http-status-codes')

require('module-alias').addAlias('@app', `${__dirname}/`)
require('dotenv').config()

require('@app/service/logger')

const authentication = require('@app/middleware/authentication')
const routes = require('@app/route')

const app = express()

app.use(
  express.json(),
  cors({
    origin: '*',
    optionsSuccessStatus: HttpStatus.OK
  }),
  authentication
)

app.use(routes)

app.use('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND).send('404 Not Found')
})

app.listen(process.env.APP_PORT)
