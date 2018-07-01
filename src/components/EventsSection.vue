<template>
<div id="video-section" class="section">
  <h1 class="heading-2">Cryptocurrency Investing and Trading Course</h1>
  <h3 class="heading-2">Get the foundation in economics and technology you need to win big.</h3>
  <button type="button" class="btn btn-success btn-lg" @click="scrollToEle('#contact-section')" >Contact Us to Learn More</button>
</div>
</template>

<script>
  import animations from '../services/animations'
  export default {
    name: 'EventsSection',
    methods: {
      scrollToEle: animations.scrollToEle
    }
  }
</script>

<style scoped>
#video-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
