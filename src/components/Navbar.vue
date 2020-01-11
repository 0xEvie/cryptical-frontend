<template>
  <b-navbar toggleable="md" variant="dark" type="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <!--<img src="./assets/logo.png" class="img-circle" style="padding: 5px">-->
    <b-navbar-brand to="/">CryptiCal</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/#" id="home-link"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
        <b-nav-item to="/events" id="manageevents-link"><i class="fa fa-list" style="padding: 5px"> Manage Events</i></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/about" id="about-link"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
        <b-nav-item to="/contact" id="contact-link"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
        <b-nav-item to="/login" id="login-link"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
        <b-nav-item to="/logout" id="logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
        <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>

</style>
