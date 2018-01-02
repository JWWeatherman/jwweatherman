<template>
  <div class="right-bar">
    <b-button-group vertical>
      <b-button
        v-b-tooltip.hover.auto
        title="Table of contents"
        @click="scrollTop"
      ><i class="fa fa-list" aria-hidden="true"></i></b-button>
      <b-button
        v-b-tooltip.hover.auto
        title="Back to main page"
        @click="$router.push('/')"
      ><i class="fa fa-home" aria-hidden="true"></i></b-button>
    </b-button-group>
  </div>
</template>
<script>
  import utils from './services/utils'

  export default {
    methods: {
      scrollTop () {
        utils.scrollTop(this)
      },
      download () {
        return ''
      }
    },
    props: ['state', 'threatModel']
  }
</script>
<style scoped>

</style>
