<template>
    <b-container fluid class="px-0">
      <b-jumbotron class="rounded-0" header="CryptiCal"
                   lead="Online calendar app using VueJS" bg-variant="info" text-variant="white" >
      </b-jumbotron>

      <b-container class="px-3 mx-auto">
        <b-card header="Welcome" align="left">
          <p class="card-text">
            CryptiCal is an online calendar application made with VueJS. To begin using this application, Please <b-link :to="{ path: 'login' }">Login</b-link></p>
        </b-card>
      </b-container>
    </b-container>
</template>

<script>
export default {
  name: 'Homepage'
}
</script>

<style scoped>
  .card-header
  {
    font-weight: bolder;
    font-size: 25px;
  }
</style>
