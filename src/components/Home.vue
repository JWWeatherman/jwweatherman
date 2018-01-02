<template>
  <div id="home">
    <top-section></top-section>
    <doc-section></doc-section>
    <video-section></video-section>
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

  export default {
    components: {
      TopSection,
      DocSection,
      VideoSection,
      FooterSection,
      ContactSection
    }
  }
</script>
