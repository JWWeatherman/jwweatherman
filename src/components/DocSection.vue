<template>
  <div id="doc-section" class="section" v-if="parts.length">
    <h1 class="heading-2">Latest Documents</h1>
    <swiper
      :parts="parts"
      :type="'document'"
    ></swiper>
    <spacer></spacer>
  </div>
</template>
<script>
  import Swiper from '@/components/Swiper'
  import Spacer from '@/components/Spacer'

  export default {
    props: ['parts'],
    components: {
      Swiper,
      Spacer
    }
  }
</script>
<style>
</style>

