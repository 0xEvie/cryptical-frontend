<template>
    <b-container>
      <h1>Logging out...</h1>
    </b-container>
</template>

<script>
import router from '../router'
import UserService from '../../services/UserService'

export default {
  name: 'Logout',
  methods: {
    logout: function () {
      UserService.logout()
        .then(function (response) {
          router.push('/login')
        })
    }
  },
  mounted () {
    this.logout()
  }
}
</script>

<style scoped>

</style>
