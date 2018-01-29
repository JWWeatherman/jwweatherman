import db from './db_config.js'

// You Tube Video Schema
const VideoSchema = new db.Schema({
  TITLE: {
    type: String,
    required: true,
    unique: true
  },
  DATE: String,
  DESCRIPTION: String,
  EMBEDDED_URL: String,
  TEMPLATE: String
})

const Video = db.model('video', VideoSchema)

module.exports = Video
