import axios from 'axios'
import api from '@/config/api'
import { millisecondsToMinutes } from '@/utils'

export default {
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

  /**
   * Checks if disabled tracks can be enabled again (after one hour)
   */
  checkDisabledTracks({ commit, state }) {
    state.data.tracksDisabled.forEach((obj, i) => {
      const minutesPassed = millisecondsToMinutes((Date.now() - obj.timestamp))
      if (minutesPassed > 60) {
        commit('setTrackAvailability', {
          available: false,
          trackKey: obj.trackKey,
          disabledKey: i,
        })
      }
    })
  },
}
