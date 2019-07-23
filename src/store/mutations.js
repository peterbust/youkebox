import Vue from 'vue'

export default {
  /**
   * Overwrite state type
   * @param {string} property State property to overwrite
   * @param {*} data Data to overwrite
   */
  overwriteData(state, { property, data }) {
    state.data[property] = data
    state.data.overwrittenAt[property] = Date.now()
  },

  /**
   * Disable- or enable a track
   * @param {boolean} available If available
   * @param {number} trackKey Track key to update
   * @param {number} disabledKey Disabled track key to update
   */
  setTrackAvailability(state, { available, trackKey, disabledKey }) {
    Vue.set(state.data.tracks[trackKey], 'disabled', available)
    if (!available) state.data.tracksDisabled.push({ trackKey, timestamp: Date.now() })
    else state.data.tracksDisabled.splice(disabledKey, 1)
  },

  /**
   * Toggle allowance of user interaction value
   */
  toggleInteractiveAllowance(state) {
    state.app.interactive = !state.app.interactive
  },
}
