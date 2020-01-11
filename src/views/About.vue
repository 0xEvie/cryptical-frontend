<template>
  <b-container fluid class="mt-5">
    <h1>About</h1>

    <b-container class="px-3 mx-auto">
      <b-card header="About" align="left">
        <p class="card-text">
          This app was developed using VueJ, the 3rd party components/libraries used include:
          <ul>
          <li>Bootstrap (bootstrap-vue)</li>
          <li>Floating Action Button (vue-fab)</li>
          <li>Toast UI Calendar (toast-ui.vue-calendar)</li>
          </ul>
        </p>
        <p class="card-text">The github repositories are available below: <br>
        <ul>
          <li>
            <b-link href='https://github.com/conor-corcoran/Cryptical' target="_blank" variation="info">Client</b-link>
          </li>
          <li><b-link href='https://github.com/conor-corcoran/CrypticalServer' target="_blank" variation="info"> Server</b-link>
          </li>
        </ul>
        </p>
      </b-card>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
  .card-header
  {
    font-weight: bolder;
    font-size: 25px;
  }
</style>
