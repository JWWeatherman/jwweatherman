<template>
  <div class="right-bar">
    <b-button-group vertical>
      <b-button
        v-b-tooltip.hover.auto
        title="Back to top"
        @click="scrollTop"
      ><i class="fa fa-arrow-up" aria-hidden="true"></i></b-button>
      <b-button
        v-b-tooltip.hover.auto
        title="Table of contents"
        @click="scrollTableContents"
      ><i class="fa fa-list" aria-hidden="true"></i></b-button>
      <b-button
        v-b-tooltip.hover.auto
        title="Back to JWWeatherman"
        @click="$router.push('/')"
      ></b-button>
    </b-button-group>
  </div>
</template>
<script>
  import utils from './services/utils'
  import images from '../../assets/images'

  export default {
    data () {
      return {
        images: images
      }
    },
    methods: {
      scrollTableContents () {
        utils.scrollTableContents(this)
      },
      scrollTop () {
        utils.scrollTop(this)
      },
      download () {
        return ''
      }
    },
    props: ['threatModel']
  }
</script>
<style scoped>

</style>
