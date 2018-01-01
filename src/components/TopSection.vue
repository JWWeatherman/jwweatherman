<template>
  <div class="fixed-image-section">
    <img class="starry-background-image" :src="starryNight" alt="Starry background...">
    <div data-collapse="medium" data-animation="default" data-duration="400" class="dark navigation-bar w-nav">
      <div class="row-7 w-row">
        <div class="column-7 w-col w-col-1"><img :src="images.chewie" width="65" class="image-3"></div>
        <div class="column-8 w-col w-col-6">
          <a href="index.html" class="brand-link left-spacing w-nav-brand">
            <h1 class="brand-text tiny-font small-font medium-font">J.W. Weatherman</h1>
          </a>
        </div>
        <div class="column-11 w-col w-col-4 w-hidden-tiny tiny-font small-font medium-font">
          <a href="https://www.youtube.com/channel/UCkaB2u7zG4uSCL5Hws3X1jw" class="navigation-link w-nav-link white" target="_blank">YouTube</a>
          <a href="#" @click="scrollToEle('#contact-section')" class="navigation-link w-nav-link white">Contact</a></div>
        <div class="column-6 w-col w-col-1"><a href="#" class="w-nav-link"></a>
          <div class="icon w-icon-nav-menu"></div>
          <nav role="navigation" class="navigation-menu w-nav-menu"></nav>
        </div>
      </div>
    </div>
    <div class="w-container">
      <h1 class="page-heading">Bitcoin. Economics. Government.</h1>
      <div class="row-5 w-row">
        <div class="column-3 w-col w-col-5"></div>
        <div class="breaker w-col w-col-2"></div>
        <div class="column-2 w-col w-col-5"></div>
      </div>
      <div class="page-subheading tiny-font small-font medium-font">Join the rebellion, learn the tools and technology, and bring freedom and prosperity to the galaxy.</div>
    </div>
  </div>
</template>
<script>
  import animations from '../services/animations'
  import images from '../assets/images'
  export default {
    mounted () {
      this.adjustBackgroundImage()
      $(window).resize(this.adjustBackgroundImage)
    },
    data () {
      return {
        starryNight: images.blurs.starryNight,
        images: images,
        velocity: 0.5
      }
    },
    methods: {
      scrollToEle: animations.scrollToEle,
      adjustBackgroundImage () {
        const width = window.innerWidth
        const height = window.innerHeight
        const heightOrWidth = width >= height
        const background = heightOrWidth ? images.starryNight.width(width) : images.starryNight.height(height)
        this.starryNight = images.blurs.starryNight
        setTimeout(() => {
          this.starryNight = background
        }, 500)
      }
    }
  }
</script>
