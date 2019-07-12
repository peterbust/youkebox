import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import tracks from '@/state/tracks.json'
import queue from '@/state/queue.json'

// success
// recentlyPlayed
// queueFull

// Add video
// url: 'http://192.168.1.145/queue',
// method: 'post',
// data: { file }

Vue.use(Vuex)

const API = {
  get: {
    tracks: '//192.168.1.145/api/library/index.php',
    queue: '//192.168.1.145/api/queue/index.php',
  },
  post: {
    queue: '//192.168.1.145/api/queue/index.php',
  },
}
let interval

export default new Vuex.Store({
  state: {
    tracks,
    queue,
    unavailable: [],
  },

  mutations: {
    /**
     * Adds a second to the current song remaining time
     */
    addSecondCurrentRemaining(state) {
      state.queue.current.remaining += (1 / 60)
    },

    /**
     * Overwrite state type
     * @param {string} property State property to overwrite
     * @param {object} data Data to overwrite
     */
    set(state, { property, data }) {
      state[property] = data
    },
  },

  actions: {
    /**
     * Fetch data from API and commit mutation to update state
     * @param {string} payload.type Type of data to fetch
     */
    dataGet({ commit }, payload) {
      axios.get(API.get[payload.type])
        .then((response) => {
          commit('set', { property: payload.type, data: response.data })
        })
        .catch((error) => {
          console.error(`Oops, something went wrong requesting the ${payload.type}.`)
          console.error(error)
        })
    },

    /**
     * Update current song remaining time each second
     * Break interval when done
     */
    handleRemainingTime({ commit, state }) {
      interval = window.setInterval(() => {
        if (state.queue.current.remaining < state.queue.current.duration) {
          commit('addSecondCurrentRemaining')
        } else window.clearTimeout(interval)
      }, 1000)
    },
  },

  getters: {
    /**
     * Finds a track by title and returns original and additional data
     */
    getTrackByReference: state => trackReference => ({
      ...trackReference,
      ...state.tracks.find(track => track.title === trackReference.title),
    }),
  },
})
