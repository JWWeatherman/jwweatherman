<template>
  <div class="section">
    <div class="container-3 w-container contact-zone">
      <div class="section-title-group">
        <h2 class="centered section-heading">Contact Form</h2>
        <div class="center section-subheading">If you cant contact me on Twitter, try the below...</div>
      </div>
      <div class="form-wrapper squeezed w-form">
        <form id="email-form" name="email-form" data-name="Email Form" @submit="sendMail($event)">
          <label for="name" class="form-label">Name:</label>
          <input v-model="name" type="text" id="name" name="name" data-name="Name" placeholder="Eg. John Ipcus" maxlength="256" class="form-field w-input">
          <label for="email" class="form-label">Email Address:</label>
          <input v-model="address" type="email" id="email" name="email" data-name="Email" placeholder="joe@shmoe.com" maxlength="256" required="" class="form-field w-input">
          <label for="field" class="form-label">MESSAGE:</label>
          <textarea v-model="message" id="field" name="field" placeholder="Example Text" maxlength="5000" class="form-field text-area w-input"></textarea>
          <input type="submit" value="Send Carrier Pigeon" data-wait="Please wait..." class="button full-width w-button">
        </form>
        <div class="success-wrapper w-form-done">
          <p class="success-message">Thank you! Your submission has been received!</p>
        </div>
        <div class="error-wrapper w-form-fail">
          <p class="error-message">Oops! Something went wrong while submitting the form :(</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Email from '../services/smtp'
  export default {
    data () {
      return {
        name: ``,
        address: ``,
        message: ``
      }
    },
    methods: {
      sendMail (evt) {
        evt.preventDefault()
        Email.send(
          'doohickeymastermind@gmail.com',
          'doohickeymastermind@protonmail.com',
          'Website message from: ' + this.name,
          this.message,
          {token: 'dd777d5c-32b3-4477-ac96-6ad512f0055c'}
        )
      }
    }
  }
</script>
