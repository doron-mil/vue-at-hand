import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
  events: [],
  totalEventsCount: 0
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENTS_COUNT(state, totalEventsCount) {
    state.totalEventsCount = totalEventsCount
  }
}

export const actions = {
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
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
