import express from 'express'
import serveStatic from 'serve-static'
import parser from 'body-parser'

import routes from './routes'
// import { videoCheckInterval } from './videoServices'

const app = express()
const port = process.env.PORT || 5000

/*
* middleware
**/
// app.use(morgan('dev'));
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))

/*
* router
**/
app.use(routes)

// videoCheckInterval()

/*
* server front end static assets
**/
app.use(serveStatic(__dirname))

/*
* expose port
**/
app.listen(port)
console.log('server started ' + port)
