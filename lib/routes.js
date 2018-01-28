import express from 'express'
import tmHandler from './model/threatModelHandler'
import vHandler from './model/videoHandler'

const router = express.Router()

// Threat Model Routes
router.get('/api/refreshModels', tmHandler.refreshModels)
router.get('/api/getConfigs', tmHandler.getConfigs)
router.get('/api/getConfig/:configName', tmHandler.getConfig)
router.get('/api/getTm/:tmName', tmHandler.getTm)

// You Tube Video Routes
router.get('/api/getVideos', vHandler.getVideos)

export default router
