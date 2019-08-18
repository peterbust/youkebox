import axios from 'axios'
import api from '@/config/api'
import { millisecondsToMinutes } from '@/utils'

export default {
  /**
   * Checks if disabled tracks can be enabled again (after one hour)
   */
  checkDisabledTracks({ commit, state }) {
    const tracks = Object.keys(state.data.tracksDisabled)
    tracks.forEach((track) => {
      const minutesPassed = millisecondsToMinutes((Date.now() - state.data.tracksDisabled[track]))
      if (minutesPassed > 60) {
        commit('setTrackStatus', { key: track, status: 'isDisabled', value: false })
      }
    })
  },

  /**
   * Fetch data from API and commit mutation to update state
   * @param {string} payload.type Type of data to fetch
   */
  fetchData({ commit }, payload) {
    axios.get(api.get[payload.type])
      .then((response) => {
        commit('overwriteData', { property: payload.type, data: response.data })
      })
      .catch(() => {
        console.error(`Oops, something went wrong requesting ${payload.type}.`)
      })
  },
}
