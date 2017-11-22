<template>
  <div class="accent footer">
    <div class="w-container">
      <div class="w-row">
        <div class="column-9 w-col w-col-2 w-col-medium-2 w-col-small-small-stack w-col-tiny-tiny-stack"><img src="http://res.cloudinary.com/doohickey/image/upload/v1510257592/chewie_365_nz7hew.png" width="54">
          <h5 class="footer-brand-text">JW Weatherman</h5>
        </div>
        <div class="column-10 w-col w-col-5 w-col-medium-5 w-col-small-small-stack w-col-tiny-tiny-stack">
          <p class="paragraph">Bitcoin. <br>Economics. <br>Government.</p>
        </div>
        <div class="w-col w-col-2 w-col-medium-2 w-col-small-small-stack w-col-tiny-tiny-stack"></div>
        <div class="w-col w-col-3 w-col-medium-3 w-col-small-small-stack w-col-tiny-tiny-stack">
          <social></social>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Social from '@/components/Social'
  export default {
    components: {
      Social
    }
  }
</script>
