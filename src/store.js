import Vue from 'vue'
import Vuex from 'vuex'
import tracks from '@/state/tracks.json'
import queue from '@/state/queue.json'
import queue2 from '@/state/queue2.json'

Vue.use(Vuex)

let interval

export default new Vuex.Store({
  state: {
    tracks,
    queue,
  },

  mutations: {
    updateCurrentRemainingTime(state) {
      state.queue.current.remaining += (1 / 60) // eslint-disable-line
    },

    setQueue(state, { newQueue }) {
      state.queue = newQueue // eslint-disable-line
    },
  },

  actions: {
    checkQueue({ commit, state }) {
      window.clearInterval(interval)
      commit('setQueue', { newQueue: queue2 })
      interval = window.setInterval(() => {
        if (state.queue.current.remaining < state.queue.current.duration) {
          commit('updateCurrentRemainingTime')
        } else window.clearTimeout(interval)
      }, 1000)
    },
  },

  getters: {
    getTrackByReference: state => trackReference => ({
      ...state.tracks.find(track => track.title === trackReference.title),
      ...trackReference,
    }),
  },
})
