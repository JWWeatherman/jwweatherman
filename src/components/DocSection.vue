<template>
  <div id="doc-section" class="section" v-if="parts.length">
    <h1 class="heading-2">Latest Documents</h1>
    <swiper
      :parts="parts"
      :type="type"
    ></swiper>
    <spacer></spacer>
  </div>
</template>
<script>
  import Swiper from '@/components/Swiper'
  import Spacer from '@/components/Spacer'
  import images from '../assets/images'

  export default {
    data () {
      return {
        parts: [
          this.genTemplates({
            heading: 'Bitcoin Threat Model',
            description: 'The bitcoin threat model is intended to help developers, investors and users better understand the security of bitcoin.',
            buttonText: 'Read the Threat Model',
            date: 'October 2017',
            images: images.bitcoin_vortex
          })
        ],
        type: 'video'
      }
    },
    methods: {
      genTemplates ({heading, description, buttonText, date, images}) {
        const template = `
          <div class="row-6 w-row medium-rotate small-rotate tiny-rotate">
            <div class="w-col w-col-2 w-col-medium-8"></div>
            <div class="w-col w-col-3 w-col-medium-8 description-content">
              <h4 class="heading tiny-h-font small-h-font medium-h-font">${heading}</h4>
              <div class="tiny-font small-font medium-font">${date}</div>
              <p class="paragraph-2 tiny-font small-font medium-font">${description}</p>
              <a href="https://gateway.ipfs.io/ipfs/QmSJm9XGHXyxRaMFfLN2scunbMyopCU7xPxz3WQHLfLKQy/" class="button tiny-font small-font medium-font" target="_blank">${buttonText}</a>
            </div>
            <div class="column-5 w-col w-col-5 w-col-medium-8">
              <img src="${images['1020']}" width="388" :srcset="${images['500']} 500w, ${images['800']} 800w, ${images['1020']} 1020w" sizes="(max-width: 479px) 78vw, (max-width: 767px) 60vw, (max-width: 991px) 31vw, 34vw" class="image-2">
            </div>
          </div>
        `
        return template
      }
    },
    components: {
      Swiper,
      Spacer
    }
  }
</script>
<style>
</style>

