export default {
  /**
   * Finds a track by title and returns given- and state data combined
   */
  getTrackByReference: state => trackReference => ({
    ...trackReference,
    ...state.data.tracks.find(track => track.title === trackReference.title),
  }),
}
