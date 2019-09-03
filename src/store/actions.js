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
   * Checks if queued and current tracks are disabled in the state
   * Required for when back end auto starts a track or
   * system reboot and front is out of sync with back
   */
  checkInQueueForUndisabled({ commit, getters, state }) {
    const tracks = []

    // Add queued tracks
    for (let i = 0; i < state.data.queue.queue.length; i += 1) {
      tracks.push(getters.getTrackKeyByTitle(state.data.queue.queue[i].title))
    }

    // Add current track
    tracks.push(getters.getTrackKeyByTitle(state.data.queue.current.title))

    // Disable if not already disabled
    for (let i = 0; i < tracks.length; i += 1) {
      if (!Object.keys(state.data.tracksDisabled).map(Number).includes(tracks[i])) {
        commit('setTrackStatus', { key: tracks[i], status: 'isDisabled' })
        commit('disabledTrackRegister', { key: tracks[i] })
      }
    }
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
