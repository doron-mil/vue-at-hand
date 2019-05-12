import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '../services/EventService'
import * as user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user // Include this module
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    totalEventsCount: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS_COUNT(state, totalEventsCount) {
      state.totalEventsCount = totalEventsCount
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_TOTAL_EVENTS_COUNT', response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response) // Logs out the error
        })
    },
    fetchEvent({ commit, getters }, id) {
      if (!getters.getEventById(id)) {
        EventService.getEvent(id)
          .then(response => {
            commit('ADD_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response) // Logs out the error
          })
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
