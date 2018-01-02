<template>
  <div id="video-section" class="section" v-if="vidParts.length">
    <h1 class="heading-2">Latest Videos</h1>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide
        class="swipe-content"
        v-for="(item, ind) in vidParts"
        :key="'video' + ':' + ind"
        v-html="item"
      >
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="vidParts.length > 1"></div>
      <div class="swiper-button-prev" slot="button-prev" v-if="vidParts.length > 1"></div>
      <div class="swiper-button-next" slot="button-next" v-if="vidParts.length > 1"></div>
    </swiper>
    <spacer></spacer>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Spacer from '@/components/Spacer'

  export default {
    computed: {
      vidParts () {
        return this.$store.getters.getVidParts
      }
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30
        }
      }
    },
    components: {
      swiper,
      swiperSlide,
      Spacer
    }
  }
</script>
