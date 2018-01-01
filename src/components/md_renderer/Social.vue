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
        </i>
      </network>
      <network network="twitter">
        <i class="fa fa-twitter"
           title="Twitter"
        ></i>
      </network>
      <network network="linkedin">
        <i class="fa fa-linkedin"
           title="Linkedin"
        ></i>
      </network>
      <network network="facebook">
        <i class="fa fa-facebook"
           title="Facebook"
        ></i>
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
      titleAndSubtitle () {
        const subTitle = $('#' + this.id).text()
        return utils.makeTitle(this.title, subTitle === 'Bitcoin Security Threat Model' ? '' : subTitle)
      },
      url () {
        return this.domain + this.id
      },
      domain () {
        return this.state.config.DOMAIN
      },
      description () {
        return this.state.config.DESCRIPTION
      },
      title () {
        return this.state.config.TITLE
      },
      quote () {
        return this.state.config.QUOTE
      },
      hashTags () {
        return this.state.config.HASHTAGS
      }
    },
    props: ['id', 'state']
  }
</script>
