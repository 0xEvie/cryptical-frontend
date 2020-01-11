<template>
  <b-modal id="editEventModal" title="Edit an Event" @ok="editEvent">
    <b-form @submit.stop.prevent="submit">
      <b-form-input id="eventTitle" type="text" placeholder="Event Title" :value="eventdetails.title" v-model="input.title"></b-form-input>
      <br>
      <b-form-row>
        <b-col>
          <b-form-group
            id="startDateLabel"
            label="Start Date"
            label-for="startDate">
            <b-form-input id="startDate" type="date" v-model="input.startDate"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="startTimeLabel"
            label="Start Time"
            label-for="startTime">
            <b-form-input id="startTime" type="time" v-model="input.startTime"></b-form-input>
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
            <b-form-input id="endDate" type="date" v-model="input.endDate"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="endTimeLabel"
            label="End Time"
            label-for="endTime">
            <b-form-input id="endTime" type="time" v-model="input.endTime"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <br>

      <b-form-textarea id="notes"
                       placeholder="Notes"
                       :rows="3"
                       :max-rows="6" v-model="input.notes">
      </b-form-textarea>
    </b-form>
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
      eventdetails: {
        title: 'notset',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        notes: ''
      },
      input: {
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        notes: ''
      }
    }
  },
  props: ['event'],
  methods:
  {
    getEvent: function () {
      EventService.getEvent(this.event)
        .then((response) => {
          console.log('event')
          var startDateTime = new Date(response.data.startdatetime)
          var endDateTime = new Date(response.data.enddatetime)

          var startDate = moment(startDateTime).format('yyyy-MM-dd')
          var startTime = moment(startDateTime).format('HH:MM')
          var endDate = moment(endDateTime).format('yyyy-MM-dd')
          var endTime = moment(endDateTime).format('HH:MM')

          this.eventdetails.startDate = startDate
          this.eventdetails.startTime = startTime
          this.eventdetails.endDate = endDate
          this.eventdetails.endTime = endTime
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/login')
        })
    },
    editEvent (e) {
      //   var title = this.input.title
      //   var startDate = this.input.startDate
      //   var startTime = this.input.startTime
      //   var endDate = this.input.endDate
      //   var endTime = this.input.endTime
      //   var notes = this.input.notes
      //
      //   var startDateTime = moment(startDate + ' ' + startTime, 'yyy-mm-DD hh:mm').toISOString()
      //   var endDateTime = moment(endDate + ' ' + endTime, 'yyy-mm-DD hh:mm').toISOString()
      //
      //   let event = {
      //     title: title,
      //     startdatetime: startDateTime,
      //     enddatetime: endDateTime,
      //     notes: notes
      //   }
      //   console.log(event)
      //   EventService.editEvent(this.props.eventID, event)
      //     .then((response) => {
      //       console.log(response);
      //       this.$parent.getEvents()
      //     })
      //     .catch((err) => {
      //       this.error = err
      //     })
    }
  }
}
</script>

<style scoped>

</style>
