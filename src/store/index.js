import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import tracks from '@/state/tracks.json'
import queue from '@/state/queue.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
      interactive: true,
      localEnv: window.location.host === 'localhost:8080',
    },
    data: {
      tracks,
      tracksDisabled: [],
      queue,
      overwrittenAt: {},
    },
  },
  getters,
  actions,
  mutations,
})
