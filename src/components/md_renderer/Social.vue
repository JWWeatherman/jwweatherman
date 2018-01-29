<template>
  <social-sharing
    :url="this.url"
    :title="titleAndSubtitle"
    :description="description"
    :quote="quote"
    :hashtags="hashTags"
    inline-template
  >
    <div>
      <network network="reddit">
        <i class="fa fa-reddit"
           title="Reddit"
        >
          <!--v-b-tooltip.hover-->
        </i>
      </network>
      <network network="twitter">
        <i class="fa fa-twitter"
           title="Twitter"
        ></i>
        <!--v-b-tooltip.hover-->
      </network>
      <network network="linkedin">
        <i class="fa fa-linkedin"
           title="Linkedin"
        ></i>
        <!--v-b-tooltip.hover-->
      </network>
      <network network="facebook">
        <i class="fa fa-facebook"
           title="Facebook"
        ></i>
        <!--v-b-tooltip.hover-->
      </network>
    </div>
  </social-sharing>
</template>
<script>
  import utils from './services/utils'
  export default {
    mounted () {
      this.$root.$on('social_shares_open', function (network, url) {
        this.$root.$emit('bv::hide::popover')
      })
    },
    computed: {
      url () {
        return window.location.href
      },
      titleAndSubtitle () {
        const subTitle = $('#' + this.id).text()
        return utils.makeTitle(this.title, subTitle === 'Bitcoin Security Threat Model' ? '' : subTitle)
      },
      description () {
        return this.config.DESCRIPTION
      },
      title () {
        return this.config.TITLE
      },
      quote () {
        return this.config.QUOTE
      },
      hashTags () {
        return this.config.HASHTAGS
      }
    },
    props: ['id', 'config']
  }
</script>
