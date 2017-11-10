<template>
  <div id="doc-section" class="section" v-if="parts.length">
    <h1 class="heading-2">Latest Documents</h1>
    <swiper
      :parts="parts"
      :type="type"
    ></swiper>
  </div>
</template>
<script>
  import Swiper from '@/components/Swiper'

  export default {
    data () {
      return {
        parts: [
          this.genTemplates({
            heading: 'Bitcoin Threat Model',
            description: 'The bitcoin threat model is intended to help developers, investors and users better understand the security of bitcoin.',
            buttonText: 'Read the Threat Model',
            images: {
              '500': 'http://res.cloudinary.com/doohickey/image/upload/v1510254013/bc-background-p-500_rcvu42.png',
              '800': 'http://res.cloudinary.com/doohickey/image/upload/v1510259478/bc-background-p-800_foxmgl.png',
              '1020': 'http://res.cloudinary.com/doohickey/image/upload/v1510254024/bc-background_q8whzr.png'
            }
          })
        ],
        type: 'video'
      }
    },
    methods: {
      genTemplates ({heading, description, buttonText, images}) {
        const template = `
          <div class="slider-container w-container">
            <div class="row-6 w-row">
              <div class="content-column w-col w-col-1">
              <div></div>
              </div>
              <div class="image-column w-col w-col-5">
                <h2 class="heading">${heading}</h2>
                <p class="paragraph-2">${description}</p>
                <a href="https://gateway.ipfs.io/ipfs/QmSJm9XGHXyxRaMFfLN2scunbMyopCU7xPxz3WQHLfLKQy/" class="button" target="_blank">${buttonText}</a>
              </div>
              <div class="w-col w-col-5">
                <img src="${images['1020']}" width="388" :srcset="${images['500']} 500w, ${images['800']} 800w, ${images['1020']} 1020w" sizes="(max-width: 479px) 78vw, (max-width: 767px) 60vw, (max-width: 991px) 31vw, 34vw" class="image-2">
              </div>
              <div class="w-col w-col-1">
              <div></div>
              </div>
            </div>
          </div>
        `
        return template
      }
    },
    components: {
      Swiper
    }
  }
</script>
<style scoped>
  #doc-section > h1 {
    text-align: center;
    text-decoration: underline;
  }
</style>

