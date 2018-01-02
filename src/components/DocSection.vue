<template>
  <div id="doc-section" class="section" v-if="docParts.length">
    <h1 class="heading-2">Latest Documents</h1>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide
        class="swipe-content"
        v-for="(item, ind) in docParts"
        :key="'video' + ':' + ind"
        v-html="item"
      >
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="docParts.length > 1"></div>
      <div class="swiper-button-prev" slot="button-prev" v-if="docParts.length > 1"></div>
      <div class="swiper-button-next" slot="button-next" v-if="docParts.length > 1"></div>
    </swiper>
    <spacer></spacer>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Spacer from '@/components/Spacer'

  export default {
    computed: {
      docParts () {
        return this.$store.getters.getDocParts
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
<style>
</style>

