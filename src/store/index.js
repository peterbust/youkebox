import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '@/config/api'
import tracks from '@/state/tracks.json'
import queue from '@/state/queue.json'
import { millisecondsToMinutes } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    updatedAt: {
      tracks: null,
      queue: null,
    },
    tracks,
    queue,
    disabled: [],
    localEnv: window.location.host === 'localhost:8080',
  },

  mutations: {
    /**
     * Clear disabled tracks
     */
    clearDisabledTracks(state) {
      state.disabled = []
    },

    /**
     * Overwrite state type
     * @param {string} property State property to overwrite
     * @param {object} data Data to overwrite
     */
    set(state, { property, data }) {
      state[property] = data
      state.updatedAt[property] = Date.now()
    },

    /**
     * Set track disabled property
     * @param {number} track Track key to update
     * @param {boolean} value Value to set
     */
    setTrackAvailability(state, { disabledKey, trackKey, value }) {
      Vue.set(state.tracks[trackKey], 'disabled', value)

      if (value) state.disabled.push({ trackKey, timestamp: Date.now() })
      else state.disabled.splice(disabledKey, 1)
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
     * Checks if disabled tracks can be enabled again
     * If disabled longer ago than one hour
     */
    checkDisabledTracks({ commit, state }) {
      state.disabled.forEach((obj, i) => {
        if (millisecondsToMinutes((Date.now() - obj.timestamp)) > 60) {
          commit('setTrackAvailability', {
            disabledKey: i,
            trackKey: obj.trackKey,
            value: false,
          })
        }
      })
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
