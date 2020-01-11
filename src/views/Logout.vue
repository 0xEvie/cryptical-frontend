<template>
    <b-container>
      <h1 v-if="authenticatedSession">Logging out...</h1>
      <h1 v-if="!authenticatedSession">You're not logged in...</h1>
    </b-container>
</template>

<script>
import router from '../router'
import UserService from '../../services/UserService'
import AuthService from '../../services/AuthService'

export default {
  name: 'Logout',
  data () {
    return {
      authenticatedSession: false
    }
  },
  mounted: function () {
    AuthService.authenticated()
      .then(() => {
        this.authenticatedSession = true
      })
      .catch(() => {
        this.authenticatedSession = false
      })

    this.logout()
  },
  methods: {
    logout: function () {
      UserService.logout()
        .then(function () {
          router.push('/login')
        })
    }
  }
}
</script>

<style scoped>

</style>
