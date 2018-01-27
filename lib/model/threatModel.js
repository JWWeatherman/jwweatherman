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
  TEMPLATE: {
    type: String,
    required: true
  },
  TM_TEMPLATE: {
    type: String,
    required: true
  },
  STYLE: {
    'heading-page-background-color': {
      type: String
    },
    'heading-page-h1-color': {
      type: String
    },
    'heading-page-h2-color': {
      type: String
    },
    'heading-page-h3-color': {
      type: String
    },
    'heading-page-h4-color': {
      type: String
    },
    'heading-page-jumbotron-color': {
      type: String
    },
    'page-background-color': {
      type: String
    },
    'page-color': {
      type: String
    },
    'page-h1-color': {
      type: String
    },
    'page-h2-color': {
      type: String
    },
    'page-h3-color': {
      type: String
    },
    'page-h4-color': {
      type: String
    },
    'page-bold-color': {
      type: String
    },
    'page-page-header-background-color': {
      type: String
    },
    'page-page-header-color': {
      type: String
    },
    'page-page-footer-background-color': {
      type: String
    },
    'page-page-footer-color': {
      type: String
    },
    'page-page-footer-resources-color': {
      type: String
    }
  }
})

const ThreatModel = db.model('threat_model', ThreatModelSchema)

module.exports = ThreatModel
