import Vue from 'vue'
import VueResource from 'vue-resource'
import base64 from 'js-base64'

Vue.use(VueResource)

class ConfigGen {
  /*
  * @param store {Object} - vuex instance
  * @param configsUrl {String} - url with all published threat models
  * */
  constructor ({store, configsUrl}) {
    this.$store = store
    this.configsUrl = configsUrl
  }

  /*
  * getConfigs - gets config portion of all the published repos
  * */
  getConfigs (cb) {
    Vue.http.get(this.configsUrl)
      .then(res => {
        const b64 = base64.Base64
        const blob = res.body.content
        const configs = JSON.parse(b64.decode(blob))
        this.$store.dispatch('updateDocumentConfigs', configs)
        // console.log(this.$store.getters.getDocumentConfigs)
        cb()
      })
      .catch(err => console.error(err))
  }
}

export default ConfigGen
