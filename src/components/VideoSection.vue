<template>
  <div id="video-section" class="section" v-if="parts.length">
    <h1 class="heading-2">Latest Videos</h1>
    <swiper
      :parts="parts"
      :type="'video'"
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
