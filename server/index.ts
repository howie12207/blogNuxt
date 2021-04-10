const express = require('express')
const app = express()
const routerSetting = require('./router')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routerSetting)

module.exports = {
  path: 'nodeApi',
  handler: app,
}
