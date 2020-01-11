<template>
  <b-modal id="helpModal" refs="helpmodal" v-model="showModalBool" title="Help">
      <b>Adding Event</b>
      <p>
        To add an event, click the "+" icon on the bottom right of the screen. Enter the details
      </p>
      <hr>
      <b>Editing Event</b>
      <p>
        To edit an event, click the event name on the calendar. A window should appear with the current event details populated. Enter your new details, and click okay. The calendar should now be updated.
      </p>
      <hr>
      <b>Deleting Event</b>
      <p>
        To delete an event, click the event name on the calendar. A window should appear and click the delete button.
      </p>
  </b-modal>
</template>

<script>

export default {
  name: 'EditEventDialog',
  data () {
    return {
      showModalBool: false
    }
  },
  methods:
      {
        showModal: function () {
          this.showModalBool = true
        }
      }
}
</script>

<style scoped>

</style>
