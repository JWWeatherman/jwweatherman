import Ddos from 'ddos'
import express from 'express'
import serveStatic from 'serve-static'
import parser from 'body-parser'

import keys from '../keys'
import routes from './routes'
import { videoCheckInterval } from './videoServices'

const app = express()
const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'

/*
* Ddos protection
* **/
const ddos = new Ddos()
app.use(ddos.express)

/*
* middleware
**/
// app.use(morgan('dev'));
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))

/*
* server front end static assets
**/
app.use(serveStatic(__dirname))

/*
* router
**/
app.use((req, res, next) => {
  const headers = req.headers
  if (headers.clientid === keys.api.clientId && headers.secret === keys.api.secret) {
    next()
  } else if (req.query.clientId === keys.api.clientId && req.query.secret === keys.api.secret) {
    next()
  } else {
    res.status(403).end('unauthorized')
  }
})
app.use(routes)

/*
* expose port
**/
app.listen(port, host, () => {
  console.log(`App running at http://${host}:${port}`)
  videoCheckInterval()
})
