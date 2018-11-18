<template>
  <div class="fixed-image-section">
    <img class="starry-background-image" :src="starryNight" alt="Starry background...">
    <nav class="navbar navbar-expand-lg text-white">
      <a @click="scrollToEle('#app')" class="navbar-brand tiny-font small-font medium-font" href="#"><img :src="images.chewie" width="65" class="image-3"/><span>J.W. Weatherman</span></a>
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a href="https://www.youtube.com/channel/UCkaB2u7zG4uSCL5Hws3X1jw" class="nav-link w-nav-link text-white tiny-font small-font medium-font" target="_blank">YouTube</a>
        </li>
        <li class="nav-item">
          <a href="#" @click="scrollToEle('#contact-section')" class="nav-link w-nav-link text-white tiny-font small-font medium-font">Contact</a>
        </li>
        <li class="nav-item">
          <a href="http://darksidebtc.com" class="nav-link w-nav-link text-white tiny-font small-font medium-font" target="_blank">Darkside</a>
        </li>
	<li>
	  <a href="/course" class="nav-link w-nav-link text-white tiny-font small-font medium-font" target="_blank">Course</a>
        </li>
      </ul>
    </nav>
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
