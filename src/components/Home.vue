<template>
  <div id="home">
    <top-section></top-section>
    <spacer></spacer>
    <doc-section></doc-section>
    <spacer></spacer>
    <video-section></video-section>
    <spacer></spacer>
    <spacer></spacer>
    <contact-section></contact-section>
    <footer-section></footer-section>
  </div>
</template>
<script>
  import TopSection from '@/components/TopSection'
  import DocSection from '@/components/DocSection'
  import VideoSection from '@/components/VideoSection'
  import FooterSection from '@/components/FooterSection'
  import ContactSection from '@/components/ContactSection'

  import Spacer from '@/components/Spacer'
  export default {
    components: {
      TopSection,
      DocSection,
      Spacer,
      VideoSection,
      FooterSection,
      ContactSection
    }
  }
</script>
