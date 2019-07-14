import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '@/config/api'
import tracks from '@/state/tracks.json'
import queue from '@/state/queue.json'

Vue.use(Vuex)

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

    /**
     * Set track disabled property
     * @param {number} track Track key to update
     * @param {boolean} value Value to set
     */
    trackSetDisabled(state, { track, value }) {
      Vue.set(state.tracks[track], 'disabled', value)
    },
  },

  actions: {
    /**
     * Fetch data from API and commit mutation to update state
     * @param {string} payload.type Type of data to fetch
     */
    dataGet({ commit }, payload) {
      axios.get(api.get[payload.type])
        .then((response) => {
          commit('set', { property: payload.type, data: response.data })
        })
        .catch(() => {
          console.error(`Oops, something went wrong requesting the ${payload.type}.`)
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
