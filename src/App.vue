<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import ConfigGen from '@/services/ConfigGen'

  import ProcessVideos from '@/services/ProcessVideos'
  import ProcessDocuments from '@/services/ProcessDocuments'

  export default {
    beforeMount () {
      /*
      * gets all the threat model configs and stores them in the store.
      * */
      const configGen = new ConfigGen({store: this.$store, configsUrl: 'https://api.github.com/repos/JWWeatherman/published_threat_models/contents/configs.json'})
      configGen.getConfigs((configs) => {
        const processVideos = new ProcessVideos({store: this.$store})
        processVideos.process()
        if (configs) {
          this.$store.dispatch('updateDocumentConfigs', configs)
          const processDocuments = new ProcessDocuments({store: this.$store})
          setTimeout(() => processDocuments.process(), 500)
        }
      })
    },
    name: 'app'
  }
</script>

