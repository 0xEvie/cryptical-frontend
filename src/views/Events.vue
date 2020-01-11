<template>
  <b-container fluid class="mt-5">
    <h1 class="mb-3">Events <b-button variant="primary" size="sm" @click="launchHelpModal" class="rounded-circle"><font-awesome-icon icon="question-circle"></font-awesome-icon></b-button></h1>
    <add-event-dialog></add-event-dialog>
    <edit-event-dialog ref="editdialog"></edit-event-dialog>
    <help-dialog ref="helpmodal"></help-dialog>
    <b-col md="8" class="mx-auto mb-4">
        <b-card header="Calendar Controls">
            <select class="float-left" v-model="selectedView">
              <option v-for="(options, index) in viewModeOptions" :value="options.value" :key="index">
                {{options.title}}
              </option>
            </select>

        <span @click="onClickNavi($event)">
              <b-button type="button" class="move-day" data-action="move-prev" variant="info"><font-awesome-icon icon="arrow-alt-circle-left"></font-awesome-icon> Prev</b-button>
              <b-button type="button" class="move-today" data-action="move-today">Today</b-button>
              <b-button type="button" class="move-day" data-action="move-next" variant="info">Next <font-awesome-icon icon="arrow-alt-circle-right"></font-awesome-icon></b-button>
        </span>
            <span class="render-range float-right ">{{ dateRange }}</span>
    </b-card>
    </b-col>

    <calendar style="height: 800px"
              ref="tuiCal"
              :useDetailPopup="useDetailPopup"
              :useCreationPopup="useCreationPopup"
              :view="selectedView"
              :schedules="events"
              :theme="theme"
              :taskView="false"
              :scheduleView="true"
              :month="month"
              :week="week"
              :disableDblClick="disableDblClick"
              :isReadOnly="true"
              @clickSchedule="onClickSchedule"
              @clickDayname="onClickDayname"
              @beforeDeleteSchedule="onBeforeDeleteSchedule"
              @afterRenderSchedule="onAfterRenderSchedule"
    />
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
import HelpDialog from '../components/HelpDialog'
import EventService from '../../services/EventService'
import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar'
import CalendarTheme from '../assets/calendarTheme'
import CalendarStyle from '../assets/calendarStyle.css'
import CalendarEventColours from '../assets/calenderEventColours'

export default {
  name: 'Events',
  components: {
    fab,
    AddEventDialog,
    EditEventDialog,
    Calendar,
    HelpDialog
  },
  data () {
    return {
      viewModeOptions: [
        {
          title: 'Month View',
          value: 'month'
        },
        {
          title: 'Week View',
          value: 'week'
        },
        {
          title: 'Day View',
          value: 'day'
        }
      ],
      dateRange: '',
      selectedView: 'month',
      theme: CalendarTheme,
      month: {
        startDayOfWeek: 1
      },
      week: {
        startDayOfWeek: 1
      },
      taskView: false,
      scheduleView: ['time'],
      useDetailPopup: false,
      useCreationPopup: false,
      disableDblClick: true,
      isReadOnly: false,
      events: [],
      errors: [],
      fab: {
        bgColor: '#17A2B8',
        position: 'bottom-right'
      }
    }
  },
  props: ['_id'],
  methods: {
    launchEditModal: function (id) {
      this.$refs.editdialog.getEvent(id)
      this.$refs.editdialog.showModal()
    },
    launchHelpModal: function () {
      this.$refs.helpmodal.showModal()
    },
    getEvents: function () {
      EventService.getAllEvents()
        .then((response) => {
          // console.log(response)
          for (var i in response.data) {
            response.data[i].id = response.data[i]._id
            response.data[i].category = 'time'
            response.data[i].bgColor = '#99C0FF'
            // console.group('events: getEvents')
            // console.log('startDatetime:' + response.data[i].start)
            // console.log('endDatetime:' + response.data[i].end)
            // console.groupEnd()
          }
          this.events = response.data
        })
        .catch((errors) => {
          // console.log(errors)
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
          // console.log(errors)
          router.push('/events')
        })
    },
    init () {
      this.setRenderRangeText()
    },
    setRenderRangeText () {
      const {invoke} = this.$refs.tuiCal
      const view = invoke('getViewName')
      const calDate = invoke('getDate')
      const rangeStart = invoke('getDateRangeStart')
      const rangeEnd = invoke('getDateRangeEnd')
      let year = calDate.getFullYear()
      let month = calDate.getMonth() + 1
      let date = calDate.getDate()
      let dateRangeText = ''
      let endMonth, endDate, start, end
      switch (view) {
        case 'month':
          dateRangeText = moment(`${year} ${month}`, 'YYYY-MM').format('MMMM-YYYY').toString()
          break
        case 'week':
          year = rangeStart.getFullYear()
          month = rangeStart.getMonth() + 1
          date = rangeStart.getDate()
          endMonth = rangeEnd.getMonth() + 1
          endDate = rangeEnd.getDate()
          start = `${year}-${month}-${date}`
          end = `${endMonth}-${endDate}`
          dateRangeText = `${start} ~ ${end}`
          break
        default:
          dateRangeText = `${year}-${month}-${date}`
      }
      this.dateRange = dateRangeText
    },
    onClickNavi (event) {
      if (event.target.tagName === 'BUTTON') {
        const {target} = event
        let action = target.dataset ? target.dataset.action : target.getAttribute('data-action')
        action = action.replace('move-', '')
        this.$refs.tuiCal.invoke(action)
        this.setRenderRangeText()
      }
    },
    onClickSchedule (res) {
      // console.group('onClickSchedule')
      // console.log('MouseEvent : ', res.event)
      // console.log('Calendar Info : ', res.calendar)
      // console.log('Schedule Info : ', res.schedule)
      // console.groupEnd()
      this.launchEditModal(res.schedule.id);
    },
    onClickDayname (res) {
      // view : week, day
      // console.group('onClickDayname')
      // console.log(res.date)
      // console.groupEnd()
    },
    onBeforeDeleteSchedule (res) {
      // console.group('onBeforeDeleteSchedule')
      // console.log('Schedule Info : ', res.schedule)
      // console.groupEnd()
      const idx = this.events.findIndex(item => item.id === res.schedule.id)
      this.events.splice(idx, 1)
    },
    onAfterRenderSchedule (res) {
      // console.group('onAfterRenderSchedule')
      // console.log('Schedule Info : ', res.schedule)
      // console.groupEnd()
    }
  },
  mounted () {
    this.getEvents()
    this.init()
  }
}
</script>

<style>
calendar{
  width: 90%
}

</style>
