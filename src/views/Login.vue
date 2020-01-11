<template>
  <b-container>
    <h1>Login</h1>
    <br>
    <b-col md="6" class="mx-auto">
      <p>Don't have an account? Register <router-link to="/register" id="register-link">here</router-link></p>
      <b-form v-on:submit="login">
        <b-alert dismissible fade variant="danger" @dismissed="removeErrors()" :show="showError"> {{ error }}</b-alert>
        <b-form-input id="email" type="email" placeholder="Email" required v-model="input.email" ></b-form-input>
        <br>
        <b-form-input id="password" type="password" placeholder="Password" required v-model="input.password"></b-form-input>
        <br>
        <b-button type="submit" id="submit">Login</b-button>
      </b-form>
    </b-col>
  </b-container>
</template>

<script>
import router from '../router'
import UserService from '../../services/UserService'

export default {
  name: 'Login',
  data () {
    return {
      error: 'e',
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
    login () {
      let credentials = {
        email: this.input.email,
        password: this.input.password
      }
      UserService.login(credentials)
        .then((response) => {
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
