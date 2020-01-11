import Api from './api.js'

export default {
  getAllEvents () {
    return Api().get('/events')
  },
  getEvent (id) {
    return Api().get(`/events/${id}`)
  },
  addEvent (event) {
    return Api().post('/events/add', event,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteEvent (id) {
    return Api().delete(`/events/delete/${id}`)
  },
  editEvent (id, newEvent) {
    return Api().put(`/events/edit/${id}`, newEvent,
      { headers: {'Content-type': 'application/json'} })
  }
}
