import Vue from 'vue'

export default {
  /**
   * Register track as disabled
   * @param {number} key Track key to handle
   */
  disabledTrackRegister(state, { key }) {
    state.data.tracksDisabled[key] = Date.now()
  },

  /**
   * Remove registered disabled track
   * @param {number} key Track key to handle
   */
  disabledTrackUnregister(state, { key }) {
    delete state.data.tracksDisabled[key]
  },

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
   * Set a status for a track
   * @param {string} status Status to set
   * @param {boolean} value Value to set (default true)
   * @param {number} key Track key to handle
   */
  setTrackStatus(state, { status, value = true, key }) {
    const track = state.data.tracks[key]
    Vue.set(track, status, value)
  },

  /**
   * Toggle allowance of user interaction value
   */
  toggleInteractiveAllowance(state) {
    state.app.interactive = !state.app.interactive
  },
}
