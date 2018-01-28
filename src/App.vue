<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    beforeMount () {
      /*
      * gets all the threat model configs and videos
      * */

      axios.all([
        axios.get('/api/getConfigs'),
        axios.get('/api/getVideos')
      ])
        .then(axios.spread((res1, res2) => {
          const tmConfigs = res1.data
          const videos = res2.data
          this.$store.dispatch('updateDocumentConfigs', tmConfigs)
          tmConfigs.forEach(config => this.$store.dispatch('updateDocParts', config.LIST_TEMPLATE))
          videos.forEach(vid => this.$store.dispatch('updateVidParts', vid.LIST_TEMPLATE))
        }))
        .catch(error => {
          console.log(error)
        })
    },
    name: 'app'
  }
</script>

