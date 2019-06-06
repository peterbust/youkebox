import Vue from 'vue'
import Vuex from 'vuex'
import tracks from '@/state/tracks.json'
import queue from '@/state/queue.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tracks,
    queue,
  },

  getters: {
    getTrackByReference: state => trackReference => ({
      ...state.tracks.find(track => track.title === trackReference.title),
      ...trackReference,
    }),
  },
})
