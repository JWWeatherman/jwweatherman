<template>
  <div id="contact-section" class="section">
    <div class="container-3 w-container contact-zone">
      <div class="section-title-group">
        <h2 class="centered section-heading tiny-h-font small-h-font medium-h-font">Contact Form</h2>
        <div class="center section-subheading tiny-font small-font medium-font">If you can't contact me on Twitter, try the below...</div>
      </div>
      <div class="form-wrapper squeezed tiny-squeezed small-squeezed medium-squeezed w-form">
        <form id="email-form" name="email-form" data-name="Email Form" @submit="sendMail($event)" v-if="success === null">
          <label for="name" class="form-label tiny-font small-font medium-font">Name:</label>
          <input v-model="name" type="text" id="name" name="name" data-name="Name" placeholder="Eg. Nom De Plume" maxlength="256" class="form-field w-input tiny-height small-height medium-height">
          <label for="email" class="form-label tiny-font small-font medium-font">Email Address:</label>
          <input v-model="email" type="email" id="email" name="email" data-name="Email" placeholder="trust@theforce.com" maxlength="256" required="" class="form-field w-input tiny-height small-height medium-height">
          <label for="email" class="form-label tiny-font small-font medium-font">SUBJECT:</label>
          <input v-model="subject" type="text" id="subject" name="subject" data-name="Subject" placeholder="Brief summary please" maxlength="256" required="" class="form-field w-input tiny-height small-height medium-height">
          <label for="field" class="form-label tiny-font small-font medium-font">MESSAGE:</label>
          <textarea v-model="message" id="field" name="field" placeholder="If you can say the same thing with fewer words, please do - its kind to my brain." maxlength="5000" class="form-field text-area w-input tiny-height small-height medium-height"></textarea>
          <vue-recaptcha sitekey="6LdJRjgUAAAAAIhw9H11svo239OEge9vVtyEg26Y" @verify="verifyCaptcha" v-if="captchaShowing"></vue-recaptcha>
          <input type="submit" :value="sending ? 'Pigeon on it\'s way...' : 'Send Carrier Pigeon'" class="button full-width w-button" v-else>
        </form>
        <div class="success-wrapper" v-else-if="success">
          <p class="success-message">Thank you! The pigeon has landed safely at the destination!</p>
        </div>
        <div class="error-wrapper" v-else>
          <p class="error-message">Oops! Something went terribly wrong, I think the pigeon came across some hunters!</p>
          <p>Please try to reach me on Twitter instead.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueRecaptcha from 'vue-recaptcha'
  export default {
    data () {
      return {
        name: ``,
        email: ``,
        subject: ``,
        message: ``,
        success: null,
        sending: false,
        captchaShowing: true
      }
    },
    methods: {
      verifyCaptcha (res) {
        if (res !== null) this.captchaShowing = false
      },
      sendMail (evt) {
        evt.preventDefault()
        const SERVICE = 'default_service'
        const TEMPLATE_ID = 'jwweatherman'
        this.sending = true
        window.emailjs.send(SERVICE, TEMPLATE_ID, {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message
        })
          .then(() => {
            this.sending = false
            this.success = true
          }, (err) => {
            this.sending = false
            this.success = false
            console.error(err)
          })
      }
    },
    components: {
      VueRecaptcha
    }
  }
</script>
