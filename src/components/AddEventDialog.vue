<template>
  <b-modal id="addEventModal" title="Add an Event" @ok="addEvent">
    <b-form @submit.stop.prevent="submit">
      <b-form-input id="eventTitle" type="text" placeholder="Event Title" v-model="input.title"></b-form-input>
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
  name: 'AddEventDialog',
  data () {
    return {
      error: '',
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
  methods: {
    addEvent (e) {
      var title = this.input.title
      var startDate = this.input.startDate
      var startTime = this.input.startTime
      var endDate = this.input.endDate
      var endTime = this.input.endTime
      var notes =  this.input.notes

      var startDateTime = moment(startDate + ' ' + startTime, 'yyy-mm-DD hh:mm').toISOString()
      var endDateTime = moment(endDate + ' ' + endTime, 'yyy-mm-DD hh:mm').toISOString()

      let event = {
        title: title,
        startdatetime: startDateTime,
        enddatetime: endDateTime,
        notes: notes
      }
      console.log(event)
      EventService.addEvent(event)
        .then((response) => {
          console.log(response)
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
