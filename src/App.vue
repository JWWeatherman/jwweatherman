<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import images from './assets/images'
  import animations from './services/animations'
  import keys from '../keys'

  export default {
    beforeMount () {
      /*
      * gets all the threat model configs and videos
      * */
      const clientId = process.env.API_CLIENT_ID || keys.api.clientId
      const secret = process.env.API_SECRET || keys.api.secret
      axios.all([
        axios.get('/api/getConfigs', {
          headers: {
            clientid: clientId,
            secret: secret
          }
        }),
        axios.get('/api/getVideos/5', {
          headers: {
            clientid: clientId,
            secret: secret
          }
        })
      ])
        .then(axios.spread((res1, res2) => {
          const tmConfigs = res1.data
          const videos = res2.data
          this.$store.dispatch('updateDocumentConfigs', tmConfigs)
          tmConfigs.forEach(config => this.$store.dispatch('updateDocParts', config.LIST_TEMPLATE))
          videos.forEach(vid => this.$store.dispatch('updateVidParts', vid.TEMPLATE))
        }))
        .catch(error => {
          console.log(error)
        })
    },
    data () {
      return {
        images: images
      }
    },
    methods: {
      scrollToEle: animations.scrollToEle
    },
    name: 'app'
  }
</script>

