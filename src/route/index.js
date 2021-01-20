const express = require('express')

const router = express.Router()

require('@app/route/auth')(router)
require('@app/route/category')(router)
require('@app/route/payee')(router)
require('@app/route/bill')(router)

module.exports = router
