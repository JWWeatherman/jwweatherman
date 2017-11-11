<template>
  <div id="contact-section" class="section">
    <div class="container-3 w-container contact-zone">
      <div class="section-title-group">
        <h2 class="centered section-heading">Contact Form</h2>
        <div class="center section-subheading">If you can't contact me on Twitter, try the below...</div>
      </div>
      <div class="form-wrapper squeezed w-form">
        <form id="email-form" name="email-form" data-name="Email Form" @submit="sendMail($event)" v-if="success === null">
          <label for="name" class="form-label">Name:</label>
          <input v-model="name" type="text" id="name" name="name" data-name="Name" placeholder="Eg. John Ipcus" maxlength="256" class="form-field w-input">
          <label for="email" class="form-label">Email Address:</label>
          <input v-model="email" type="email" id="email" name="email" data-name="Email" placeholder="joe@shmoe.com" maxlength="256" required="" class="form-field w-input">
          <label for="email" class="form-label">SUBJECT:</label>
          <input v-model="subject" type="text" id="subject" name="subject" data-name="Subject" placeholder="Keepen' it classy!" maxlength="256" required="" class="form-field w-input">
          <label for="field" class="form-label">MESSAGE:</label>
          <textarea v-model="message" id="field" name="field" placeholder="I don't mind being a symbol but I don't want to become a monument. There are monuments all over the Parliament Buildings and I've seen what the pigeons do to them." maxlength="5000" class="form-field text-area w-input"></textarea>
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
<style>
  #contact-section h2 {
    text-decoration: underline;
  }
</style>
