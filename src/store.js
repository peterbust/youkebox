import Vue from 'vue'
import Vuex from 'vuex'
import songs from '@/state/songs.json'
import queue from '@/state/queue.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs,
    queue,
  },

  getters: {
    getSongByReference: state => songReference => ({
      ...state.songs.find(song => song.title === songReference.title),
      ...songReference,
    }),
  },
})
