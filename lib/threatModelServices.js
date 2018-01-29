import tm from './model/threatModel'
import keys from '../keys.js'

import base64 from 'js-base64'
import axios from 'axios'

const CONFIGS_URL = 'https://api.github.com/repos/JWWeatherman/published_threat_models/contents/configs.json'

function makeListTemplate ({NAME, TITLE, PUBLISH_DATE, DESCRIPTION, MAIN_IMAGE}) {
  return `
          <div class="row-4 w-row medium-rotate small-rotate tiny-rotate">
            <div class="w-col w-col-2 w-col-medium-8"></div>
            <div class="column-5 w-col w-col-5 w-col-medium-8">
              <img src="${MAIN_IMAGE}" class="image-2 doc-image">
            </div>
            <div class="w-col w-col-3 w-col-medium-8 description-content">
              <h4 class="heading tiny-h-font small-h-font medium-h-font">${TITLE}</h4>
              <div class="tiny-font small-font medium-font">${PUBLISH_DATE}</div>
              <p class="paragraph-2 tiny-font small-font medium-font">${DESCRIPTION}</p>
              <a href="#/${NAME}" class="button tiny-font small-font medium-font">Read ${TITLE}</a>
            </div>
            <div class="w-col w-col-2"></div>
          </div>
        `
}

function refreshTemplate (res) {
  tm.find({})
    .then(data => {
      res.end(data.map(c => c.LIST_TEMPLATE).join(''))
    })
}

function getMarkdown ({config, done, res}) {
  axios.get(config.REPO_URL + '?client_id=' + keys.github.clientId + '&client_secret=' + keys.github.secret)
    .then(response => {
      const b64 = base64.Base64
      const blob = response.data.content
      const md = b64.decode(blob)
      config.TM_MARKDOWN = md
      tm.update({NAME: config.NAME}, config, {upsert: true})
        .then(() => {
          refreshTemplate(res)
        })
        .catch(err => {
          console.error(err)
          res.status(500).end(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).end(err)
    })
}

function insertConfigs ({configs, res}) {
  const configKeys = Object.keys(configs)
  configKeys.forEach((key, ind) => {
    const config = configs[key]
    config.NAME = key
    config.LIST_TEMPLATE = makeListTemplate(config)
    tm.update({NAME: config.NAME}, config, {upsert: true})
      .then(() => {
        getMarkdown({config: config, done: ind === configKeys.length - 1, res: res})
      })
      .catch(err => {
        console.error(err)
        res.status(500).end(err)
      })
  })
}

function configGen (res) {
  axios.get(CONFIGS_URL + '?client_id=' + keys.github.clientId + '&client_secret=' + keys.github.secret)
    .then(response => {
      const b64 = base64.Base64
      const blob = response.data.content
      const configs = JSON.parse(b64.decode(blob))
      insertConfigs({configs: configs, res: res})
    })
    .catch(err => {
      console.error(err)
      res.status(500).end(err)
    })
}

function updateModels (res) {
  configGen(res)
}

function allConfigs (res) {
  tm.find({})
    .then(data => res.end(JSON.stringify(data)))
    .catch(err => res.status(500).end(err))
}

function aConfig ({configName, res}) {
  tm.find({NAME: configName})
    .then(data => res.end(JSON.stringify(data[0])))
    .catch(err => res.status(500).end(err))
}

export { updateModels, allConfigs, aConfig }
