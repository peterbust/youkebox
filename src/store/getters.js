export default {
  /**
   * Checks if the queue is full
   * @returns {boolean}
   */
  fullQueue: (state) => {
    for (let i = 0; i < 3; i += 1) {
      const track = state.data.queue.queue[i]
      if (!track) return false
      if (Object.keys(track).length === 0 && track.constructor === Object) return false
    }
    return true
  },

  /**
   * Finds a track by title and returns given- and state data combined
   */
  getTrackByReference: state => trackReference => ({
    ...trackReference,
    ...state.data.tracks.find(track => track.title === trackReference.title),
  }),
}
