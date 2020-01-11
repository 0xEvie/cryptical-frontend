<template>
  <b-navbar toggleable="md" variant="dark" type="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">CryptiCal</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav pills>
        <b-nav-item to="/#" id="home-link"><font-awesome-icon icon="home"></font-awesome-icon> Home</b-nav-item>
        <b-nav-item to="/about" id="about-link"><font-awesome-icon icon="info-circle"></font-awesome-icon> About</b-nav-item>
        <b-nav-item v-if="authenticatedSession" to="/events" id="manageevents-link"><font-awesome-icon icon="calendar"></font-awesome-icon> Manage Events</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!authenticatedSession" to="/login" id="login-link"><font-awesome-icon icon="sign-in-alt"></font-awesome-icon> Login</b-nav-item>
        <b-nav-item v-if="authenticatedSession" to="/logout" id="logout"><font-awesome-icon icon="sign-out-alt"></font-awesome-icon> Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import AuthService from '../../services/AuthService'

export default {
  name: 'Navbar',
  data () {
    return {
      authenticatedSession: false
    }
  },
  watch: {
    '$route': function () {
      AuthService.authenticated()
        .then(() => {
          this.authenticatedSession = true
        })
        .catch(() => {
          this.authenticatedSession = false
        })
    }
  }
}
</script>

<style scoped>

</style>
