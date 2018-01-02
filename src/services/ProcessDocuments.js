import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class ProcessDocuments {
  constructor ({store}) {
    this.$store = store
  }

  process () {
    const configs = this.$store.getters.getDocumentConfigs

    Object.keys(configs).forEach(key => {
      const config = configs[key]
      const template = this.genDocTemplates({
        heading: config.TITLE,
        description: config.DESCRIPTION,
        buttonText: 'Read the Threat Model',
        date: config.PUBLISH_DATE,
        image: config.MAIN_IMAGE,
        uri: '/#/' + key
      })
      this.$store.dispatch('updateDocParts', template)
    })
  }

  genDocTemplates ({heading, description, buttonText, date, image, uri}) {
    const template = `
          <div class="row-4 w-row medium-rotate small-rotate tiny-rotate">
            <div class="w-col w-col-2 w-col-medium-8"></div>
            <div class="w-col w-col-3 w-col-medium-8 description-content">
              <h4 class="heading tiny-h-font small-h-font medium-h-font">${heading}</h4>
              <div class="tiny-font small-font medium-font">${date}</div>
              <p class="paragraph-2 tiny-font small-font medium-font">${description}</p>
              <a href="${uri}" class="button tiny-font small-font medium-font">${buttonText}</a>
            </div>
            <div class="column-5 w-col w-col-5 w-col-medium-8">
              <img src="${image}" class="image-2 doc-image">
            </div>
            <div class="w-col w-col-2"></div>
          </div>
        `
    return template
  }
}

export default ProcessDocuments
