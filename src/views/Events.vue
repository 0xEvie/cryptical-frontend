<template>
  <b-container>
    <h1>Events</h1>
    <edit-event-dialog ref="editdialog" v-bind:event="eventid"></edit-event-dialog>
    <add-event-dialog></add-event-dialog>
    <b-col md="12" class="mx-auto">
      <v-client-table :columns="vuetables.columns" :data="events" :options="vuetables.options">
        <a slot="remove" slot-scope="props" @click="deleteEvent(props.row._id)">REMOVE</a>
        <a slot="edit" slot-scope="props" @click="launchEditModal(props.row._id)" v-b-modal.editEventModal>Edit</a>
      </v-client-table>
    </b-col>

    <fab
      :position="fab.position"
      :bg-color="fab.bgColor"
      v-b-modal.addEventModal
    ></fab>
  </b-container>
</template>

<script>
import router from '../router'
import moment from 'moment'
import fab from 'vue-fab'
import AddEventDialog from '../components/AddEventDialog'
import EditEventDialog from '../components/EditEventDialog'
import EventService from '../../services/EventService'

export default {
  name: 'Events',
  components: {
    fab,
    AddEventDialog,
    EditEventDialog
  },
  data () {
    return {
      events: [],
      errors: [],
      eventid: 'notset',
      fab: {
        bgColor: '#17A2B8',
        position: 'bottom-right'
      },
      vuetables: {
        columns: ['_id', 'title', 'startDate', 'endDate', 'startTime', 'endTime', 'remove', 'edit'],
        options: {
          headings: {
            _id: 'ID',
            title: 'Title',
            startDate: 'Start Date',
            endDate: 'End Date',
            startTime: 'Start Time',
            endTime: 'End Time'
          }
        }
      }
    }
  },
  props: ['_id'],
  methods: {
    launchEditModal: (id) => {
      this.eventid = id
    },
    getEvents: function () {
      EventService.getAllEvents()
        .then((response) => {
          for (var i in response.data) {
            var startDateTime = new Date(response.data[i].startdatetime)
            var endDateTime = new Date(response.data[i].enddatetime)

            var startDate = moment(startDateTime).format('DD/MM/YYYY')
            var startTime = moment(startDateTime).format('HH:MM')
            var endDate = moment(endDateTime).format('DD/MM/YYYY')
            var endTime = moment(endDateTime).format('HH:MM')

            response.data[i].startDate = startDate
            response.data[i].startTime = startTime
            response.data[i].endDate = endDate
            response.data[i].endTime = endTime
          }
          this.events = response.data
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/login')
        })
    },
    deleteEvent: function (id) {
      EventService.deleteEvent(id)
        .then((response) => {
          console.log('deleted')
          this.getEvents()
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/events')
        })
    }
  },
  mounted () {
    this.getEvents()
  }
}
</script>

<style scoped>

</style>
