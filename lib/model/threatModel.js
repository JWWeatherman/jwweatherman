import db from './db_config.js'

// Threat Model Schema
const ThreatModelSchema = new db.Schema({
  NAME: {
    type: String,
    required: true,
    unique: true
  },
  TITLE: {
    type: String,
    required: true
  },
  COMPANY_NAME: {
    type: String,
    required: true
  },
  PUBLISH_DATE: {
    type: String,
    required: true
  },
  DESCRIPTION: {
    type: String,
    required: true
  },
  FAVICON: {
    type: String,
    required: true
  },
  QUOTE: {
    type: String,
    required: true
  },
  HASHTAGS: {
    type: String,
    required: true
  },
  MAIN_IMAGE: {
    type: String,
    required: true
  },
  REPO_URL: {
    type: String,
    required: true
  },
  LIST_TEMPLATE: {
    type: String,
    required: true
  },
  TM_MARKDOWN: String,
  STYLE: {
    'heading-page-background-color': String,
    'heading-page-h1-color': String,
    'heading-page-h2-color': String,
    'heading-page-h3-color': String,
    'heading-page-h4-color': String,
    'heading-page-jumbotron-color': String,
    'page-background-color': String,
    'page-color': String,
    'page-h1-color': String,
    'page-h2-color': String,
    'page-h3-color': String,
    'page-h4-color': String,
    'page-bold-color': String,
    'page-page-header-background-color': String,
    'page-page-header-color': String,
    'page-page-footer-background-color': String,
    'page-page-footer-color': String,
    'page-page-footer-resources-color': String
  }
})

const ThreatModel = db.model('threat_model', ThreatModelSchema)

module.exports = ThreatModel
