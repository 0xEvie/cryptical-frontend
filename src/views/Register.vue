<template>
  <b-container>
    <h1>Register</h1>
    <br>
    <b-col md="6" class="mx-auto">
      <b-alert dismissible fade variant="danger" @dismissed="removeErrors()" :show="showError"> {{ error }}</b-alert>
      <b-form v-on:submit="register">
        <p>Have an account? Login <router-link to="/login" id="login-link">here</router-link></p>
        <b-form-input id="email" type="email" placeholder="Email" required v-model="input.email"></b-form-input>
        <br>
        <b-form-input id="password" type="password" placeholder="Password" required v-model="input.password"></b-form-input>
        <br>
        <b-button type="submit">Register</b-button>
      </b-form>
    </b-col>
  </b-container>
</template>

<script>
import router from '../router'
import UserService from '../../services/UserService'

export default {
  name: 'Register',
  data () {
    return {
      error: '',
      input: {
        email: '',
        password: ''
      },
      showError: false
    }
  },
  methods: {
    showErrors () {
      this.showError = true
    },
    removeErrors () {
      this.showError = false
    },
    register () {
      let credentials = {
        email: this.input.email,
        password: this.input.password
      }
      UserService.register(credentials)
        .then((response) => {
          console.log('Registered')
          console.log(response)
          router.push('/events')
        })
        .catch((err) => {
          this.error = err.message
          this.showErrors()
        })
    }
  }
}
</script>

<style scoped>

</style>
