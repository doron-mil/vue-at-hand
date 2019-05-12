import Vue from 'vue'
import Vuex from 'vuex'
import * as user from './modules/user'
import * as event from './modules/event'
import * as notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, // Include this module
    event,
    notification
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
    ]
  }
})
