<template>
  <social-sharing
    :url="domain"
    :title="title"
    :description="description"
    :quote="quote"
    :hashtags="hashTags"
    inline-template
  >
    <div id="social-zone">
      <network network="twitter">
        <a href="#"><i class="fa fa-twitter fa-2x"></i></a>
      </network>
      <network network="reddit">
        <a href="#"><i class="fa fa-reddit fa-2x"></i></a>
      </network>
      <network network="facebook">
        <a href="#"><i class="fa fa-facebook fa-2x"></i></a>
      </network>
      <network network="linkedin">
        <a href="#"><i class="fa fa-linkedin fa-2x"></i></a>
      </network>
    </div>
  </social-sharing>
</template>
<script>
  export default {
    data () {
      return {
        domain: 'http://jwweatherman.com/',
        title: 'J.W. Weatherman',
        description: 'Bitcoin. Economics. Government.',
        quote: 'An exploration into the state of the worlds monetary system.',
        hashTags: '#bitcoin, #btc, #blockchain, #cryptocurrency, #forex, #crypto, #free'
      }
    }
  }
</script>
<style>
  #social-zone {
    color: white;
  }

  #social-zone > span {
    margin: 10px;
  }

  #social-zone > span > a > i {
    height: 30px;
    width: 30px;
  }

  .fa:before {
    color: white;
  }

</style>
