<template>
  <b-modal id="editEventModal" refs="editmodal" v-model="showModalBool" title="Edit an Event" @ok="editEvent">
    <b-form @submit.stop.prevent="submit">
      <b-alert dismissible fade variant="danger" @dismissed="removeErrors()" :show="showError"> {{ error }}</b-alert>
      <b-form-input id="eventTitle" type="text" placeholder="Event Title" v-model="input.title" required></b-form-input>
      <br>
      <b-form-row>
        <b-col>
          <b-form-group
            id="startDateLabel"
            label="Start Date"
            label-for="startDate">
            <b-form-input id="startDate" type="date" v-model="input.startDate" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="startTimeLabel"
            label="Start Time"
            label-for="startTime">
            <b-form-input id="startTime" type="time" v-model="input.startTime" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <br>
      <b-form-row>
        <b-col>
          <b-form-group
          id="endDateLabel"
          label="End Date"
          label-for="endDate">
          <b-form-input id="startDate" type="date" v-model="input.endDate" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="endTimeLabel"
            label="End Time"
            label-for="endTime">
            <b-form-input id="endTime" type="time" v-model="input.endTime" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <br>
    </b-form>

    <b-row class="ml-2 mr-2"><b-button variant="danger" :block=true @click="deleteEvent()">DELETE</b-button></b-row>
  </b-modal>
</template>

<script>
import router from '../router'
import moment from 'moment'
import EventService from '../../services/EventService'

export default {
  name: 'EditEventDialog',
  data () {
    return {
      error: '',
      showError: false,
      showModalBool: false,
      eventid: '',
      input: {
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
      }
    }
  },
  methods:
  {
    showErrors () {
      this.showError = true
    },
    removeErrors () {
      this.showError = false
    },
    showModal: function () {
      this.showModalBool = true
    },
    getEvent: function (eventid) {
      this.eventid = eventid
      EventService.getEvent(eventid)
        .then((response) => {
          // console.log(response.data)
          var title = response.data.title
          var start = new Date(response.data.start)
          var end = new Date(response.data.end)

          var startDate = moment(start).format('YYYY-MM-DD')
          var startTime = moment(start).format('HH:MM')
          var endDate = moment(end).format('YYYY-MM-DD')
          var endTime = moment(end).format('HH:MM')

          this.input.title = title
          this.input.startDate = startDate
          this.input.startTime = startTime
          this.input.endDate = endDate
          this.input.endTime = endTime

          // console.group('edit event dialog: edit')
          // console.log('start: ' + start)
          // console.log('end: ' + end)
          // console.groupEnd()
        })
        .catch((errors) => {
          // console.log(errors)
          router.push('/login')
        })
    },
    editEvent (e) {
      var title = this.input.title
      var startDate = this.input.startDate
      var startTime = this.input.startTime
      var endDate = this.input.endDate
      var endTime = this.input.endTime

      var dateRegEx = new RegExp('/(\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\dZ)/')

      var startisodate = startDate + ' ' + startTime
      var endisodate = endDate + ' ' + endTime

      // Validation
      if (dateRegEx.test(startisodate) || dateRegEx.test(endisodate) | title.length < 1 | startDate.length < 1 | endDate.length < 1 | startTime.length < 1 | endTime.length < 1 | endDate.length < 1) {
        console.log('Error')
        this.error = 'Please fill in all fields correctly!'
        this.showError = true
        e.preventDefault()
      } else {
        var start = moment(startisodate, 'yyyy-MM-DD hh:mm').toISOString()
        var end = moment(endisodate + ' ' + endTime, 'yyyy-MM-DD hh:mm').toISOString()

        let event = {
          title: title,
          start: start,
          end: end
        }
        // console.log(event)
        EventService.editEvent(this.eventid, event)
          .then((response) => {
            // console.log(response)
            this.$parent.getEvents()
          })
      }
    },
    deleteEvent (e) {
      var title = this.input.title
      var startDate = this.input.startDate
      var startTime = this.input.startTime
      var endDate = this.input.endDate
      var endTime = this.input.endTime

      var start = moment(startDate + ' ' + startTime, 'yyyy-MM-DD hh:mm').toISOString()
      var end = moment(endDate + ' ' + endTime, 'yyyy-MM-DD hh:mm').toISOString()

      let event = {
        title: title,
        start: start,
        end: end
      }
      console.log(event)
      EventService.deleteEvent(this.eventid)
        .then((response) => {
          // console.log(response)
          this.showModalBool = false
          this.$parent.getEvents()
        })
        .catch((err) => {
          this.error = err
        })
    }
  }
}
</script>

<style scoped>

</style>
