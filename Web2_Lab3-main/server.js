'use strict'

const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const config = require('./config')
const db = require('./db')(config)

const appLocalsStringsMiddleware = require('./middlewares/app_locals')
const notFoundMiddleware = require('./middlewares/not_found')
const errorMiddleware = require('./middlewares/error')

const indexRoutes = require('./routes')
const shipRoutes = require('./routes/ship')
const pierRoutes = require('./routes/pier')
const portRoutes = require('./routes/port')
const shipOnPierRoutes = require('./routes/shipOnPier')

const app = express()

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(__dirname))

app.use(appLocalsStringsMiddleware)

app.use('/', indexRoutes)
app.use('/ship', shipRoutes)
app.use('/pier', pierRoutes)
app.use('/port', portRoutes)
app.use('/shipOnPier', shipOnPierRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const { host, port } = config

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
