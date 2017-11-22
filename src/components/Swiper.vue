<template>
  <div>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide
        class="swipe-content"
        v-for="(item, ind) in parts"
        :key="type + ':' + ind"
        v-html="item"
      >
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="parts.length > 1"></div>
      <div class="swiper-button-prev" slot="button-prev" v-if="parts.length > 1"></div>
      <div class="swiper-button-next" slot="button-next" v-if="parts.length > 1"></div>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
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
      swiperSlide
    },
    props: ['parts', 'type']
  }
</script>
