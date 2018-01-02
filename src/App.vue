<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import images from './assets/images'
  import ConfigGen from '@/services/ConfigGen'

  import ProcessVideos from '@/services/ProcessVideos'
  import ProcessDocuments from '@/services/ProcessDocuments'

  export default {
    beforeMount () {
      /*
      * gets all the threat model configs and stores them in the store.
      * */
      const configGen = new ConfigGen({store: this.$store, configsUrl: 'https://api.github.com/repos/JWWeatherman/published_threat_models/contents/configs.json'})
      configGen.getConfigs(() => {
        const processVideos = new ProcessVideos({store: this.$store})
        processVideos.process()
        const processDocuments = new ProcessDocuments({store: this.$store})
        setTimeout(() => processDocuments.process(), 500)
      })
    },
    mounted () {
      /*
      * adds favicons
      * */
      const icons = [
        `<link href="${images.favicon}" rel="shortcut icon" type="image/x-icon">`,
        `<link rel="apple-touch-icon" sizes="57x57" href="${images.appleTouchIcons['57']}">`,
        `<link rel="apple-touch-icon" sizes="114x114" href="${images.appleTouchIcons['114']}">`,
        `<link rel="apple-touch-icon" sizes="72x72" href="${images.appleTouchIcons['72']}">`,
        `<link rel="apple-touch-icon" sizes="144x144" href="${images.appleTouchIcons['144']}">`,
        `<link rel="apple-touch-icon" sizes="60x60" href="${images.appleTouchIcons['60']}">`,
        `<link rel="apple-touch-icon" sizes="120x120" href="${images.appleTouchIcons['120']}">`,
        `<link rel="apple-touch-icon" sizes="76x76" href="${images.appleTouchIcons['76']}">`,
        `<link rel="apple-touch-icon" sizes="152x152" href="${images.appleTouchIcons['152']}">`,
        `<link rel="apple-touch-icon" sizes="180x180" href="${images.appleTouchIcons['180']}">`
      ]
      icons.forEach(i => $('head').prepend($(i)))
    },
    name: 'app'
  }
</script>
<style lang="css">
  @import './css/normalize.css';
  @import './css/weather-the-storm.webflow.css';
  @import './css/webflow.css';
</style>
