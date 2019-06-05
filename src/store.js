import Vue from 'vue'
import Vuex from 'vuex'
import library from '@/state/library.json'
import queue from '@/state/queue.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    library,
    queue,
  },

  getters: {
    getSongByReference: state => songReference => ({
      ...state.library.find(track => track.title === songReference.title),
      ...songReference,
    }),
  },
})
