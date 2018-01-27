import tm from './model/threatModel'
import BuildPage from './pageBuilder'

import base64 from 'js-base64'
import axios from 'axios'

const CONFIGS_URL = 'https://api.github.com/repos/JWWeatherman/published_threat_models/contents/configs.json'

function makeThreatModel ({configs}, cb) {
  const configKeys = Object.keys(configs)
  configKeys.forEach((key, ind) => {
    const config = configs[key]
    const builtPage = new BuildPage({config: config})
    builtPage.initializeState(template => {
      config.TM_TEMPLATE = template
      tm.update({TITLE: config.TITLE}, config, {upsert: true})
        .then(() => {
          if (ind === configKeys.length - 1) cb(configs)
        })
        .catch(err => {
          console.error(err)
          cb(err)
        })
    })
  })
}

function makeTemplate ({NAME, TITLE, PUBLISH_DATE, DESCRIPTION, MAIN_IMAGE}) {
  return `
          <div class="row-4 w-row medium-rotate small-rotate tiny-rotate">
            <div class="w-col w-col-2 w-col-medium-8"></div>
            <div class="w-col w-col-3 w-col-medium-8 description-content">
              <h4 class="heading tiny-h-font small-h-font medium-h-font">${TITLE}</h4>
              <div class="tiny-font small-font medium-font">${PUBLISH_DATE}</div>
              <p class="paragraph-2 tiny-font small-font medium-font">${DESCRIPTION}</p>
              <a href="#/${NAME}" class="button tiny-font small-font medium-font">Read ${TITLE}</a>
            </div>
            <div class="column-5 w-col w-col-5 w-col-medium-8">
              <img src="${MAIN_IMAGE}" class="image-2 doc-image">
            </div>
            <div class="w-col w-col-2"></div>
          </div>
        `
}

function refreshTemplate (configs, res) {
  const configKeys = Object.keys(configs)
  const added = configKeys.map(key => configs[key].TEMPLATE)
  added.unshift(`<h1>Added Models...</h1><br/><hr/><br/><p>(Links won't work here)</p>`)
  res.write(added.join(''))
}

function insertConfigs ({configs, cb}) {
  const configKeys = Object.keys(configs)
  configKeys.forEach((key, ind) => {
    const config = configs[key]
    config.NAME = key
    config.TEMPLATE = makeTemplate(config)
    tm.update({TITLE: config.TITLE}, config, {upsert: true})
      .then(() => {
        if (ind === configKeys.length - 1) makeThreatModel({configs}, cb)
      })
      .catch(err => {
        console.error(err)
        cb(err)
      })
  })
}

function configGen (cb) {
  axios.get(CONFIGS_URL)
    .then(res => {
      const b64 = base64.Base64
      const blob = res.data.content
      const configs = JSON.parse(b64.decode(blob))
      insertConfigs({configs: configs, cb: cb})
    })
    .catch(err => {
      console.error(err)
      cb(null)
    })
}

function updateModels (res) {
  configGen((configs) => {
    refreshTemplate(configs, res)
  })
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
