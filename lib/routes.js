import express from 'express'
import cors from 'cors'

import tmHandler from './model/threatModelHandler'
import vHandler from './model/videoHandler'
import keys from '../keys'

const router = express.Router()
const courseUrl = 'http://www.cypherpunku.com/index.php?threads/so-what-is-cypherpunk-university-about-heres-the-juicy-details.33'

// Threat Model Routes
router.get('/api/refreshModels', cors(), (req, res) => {
//  if (req.query.clientId === keys.api.clientId && req.query.secret === keys.api.secret) {
    tmHandler.refreshModels(req, res)
//  } else {
//    res.status(403).end('unauthorized')
//  }
})
router.get('/api/getConfigs', tmHandler.getConfigs)
router.get('/api/getConfig/:configName', tmHandler.getConfig)

// You Tube Video Routes
router.get('/api/getVideos/:amount?', vHandler.getVideos)

// Redirect for JW class
router.get('/class', (req, res) => {
  res.redirect(courseUrl)
})
router.get('/course', (req, res) => {
  res.redirect(courseUrl)
})
router.get('/forum', (req, res) => {
  res.redirect(courseUrl)
})

export default router
