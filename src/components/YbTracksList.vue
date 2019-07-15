<template>
  <div :class="$style.wrapper">
    <YbTracksListItem
      v-for="(track, i) in tracks"
      :key="i"
      :thumbnail="track['thumbnail_url']"
      :position-class-name="positionsGetClassName(i)"
      :select="select"
      :disabled="track.disabled"
    />
    <button
      :class="[
        $style.button,
        select ? $style['is-active'] : '',
        tracks[positions.active].disabled ? $style['is-disabled'] : '',
      ]"
      @click="select = !select"
    />
    <YbTrackListMessage
      :show="!select && !tracks[positions.active].disabled"
      :messages="[tracks[positions.active].title, tracks[positions.active].artist]"
    />
    <YbTrackListMessage
      :show="select"
      :messages="['Add to queue?']"
    />
    <YbTrackListMessage
      :show="tracks[positions.active].disabled"
      :messages="['Available again later']"
    />
  </div>
</template>

<script>
import axios from 'axios'
import TransitionFade from './TransitionFade.vue'
import YbTrackListMessage from './YbTrackListMessage.vue'
import YbTracksListItem from './YbTracksListItem.vue'
import { addToEachInArray, getKeyByValue, makeKeyupEvent } from '@/utils'
import api from '@/config/api'

let timeout

export default {
  components: {
    TransitionFade, // eslint-disable-line
    YbTracksListItem,
    YbTrackListMessage,
  },

  data() {
    return {
      select: false,
      positions: {
        active: 0,
        next: [],
        previous: [],
      },
    }
  },

  computed: {
    disabled() {
      return this.$store.state.disabled
    },

    firstTrackTitle() {
      return this.tracks[0].title
    },

    tracks() {
      return this.$store.state.tracks
    },
  },

  watch: {
    firstTrackTitle() {
      this.$store.commit('clearDisabledTracks')
      this.positionsInit()
    },

    select() {
      if (this.select) {
        timeout = setTimeout(() => this.toggleSelected(false), 5000)
      } else window.clearTimeout(timeout)
    },
  },

  created() {
    this.positionsInit()
    makeKeyupEvent('Space', () => this.handleUserSelect())
    makeKeyupEvent('ArrowLeft', () => this.positionsNavigate(-1))
    makeKeyupEvent('ArrowRight', () => this.positionsNavigate(1))
  },

  methods: {
    /**
     * Handles user selection of a track
     * @returns {undefined}
     */
    handleUserSelect() {
      if (!this.select) {
        if (!this.tracks[this.positions.active].disabled) this.toggleSelected()
      } else this.trackSubmit(this.tracks[this.positions.active].file)
    },

    /**
     * Posts a track to add to the queue
     * (Works on local environment without submitting to server)
     * @param {string} file Track property to post
     * @returns {undefined}
     */
    trackSubmit(file) {
      const submitSuccess = () => {
        this.$store.commit('setTrackAvailability', {
          trackKey: this.positions.active,
          value: true,
        })
        this.toggleSelected(false)
      }

      if (!this.$store.state.localEnv) {
        axios.post(api.post.queue, { file })
          .then(() => { submitSuccess() })
          .catch(() => {
            console.error('Oops, something went wrong submitting a song.')
          })
      } else submitSuccess()
    },

    /**
     * Adds a given number to positions object (component logic)
     * @param {object} positions Positions to handle
     * @param {number} add Number to add
     * @param {number} max Maximum value
     * @returns {object} Updated positions
     */
    positionsAdd(positions, add, max) {
      positions.active += add
      if (positions.active < 0) positions.active += max
      if (positions.active >= max) positions.active -= max

      positions.next = addToEachInArray(positions.next, add, 0, max)
      positions.previous = addToEachInArray(positions.previous, add, 0, max)

      return positions
    },

    /**
     * Return related position classname of given track
     * @param {number} i Index of the track
     * @returns {string} Class name || null
     */
    positionsGetClassName(i) {
      if (this.positions.active === i) return 'is-active'

      if (this.positions.next.includes(i)) {
        return `is-next-${getKeyByValue(this.positions.next, i) + 1}`
      }

      if (this.positions.previous.includes(i)) {
        return `is-previous-${getKeyByValue(this.positions.previous, i) + 1}`
      }

      return null
    },

    /**
     * Set default track positions
     * @returns {undefined}
     */
    positionsInit() {
      this.positions.active = 0
      this.positions.next = [1, 2, 3, 4]
      this.positions.previous = [-1, -2, -3, -4]

      this.positions.previous.forEach((val, i) => {
        this.positions.previous[i] += this.tracks.length
      })
    },

    /**
     * Navigate number of tracks
     * @param {number} request Number to handle in positions
     * @returns {undefined}
     */
    positionsNavigate(request) {
      this.toggleSelected(false)
      this.positions = this.positionsAdd(this.positions, request, this.tracks.length)
    },

    /**
     * Toggle selected value
     * @returns {undefined}
     */
    toggleSelected(value = !this.select) {
      this.select = value
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 55%;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 85%;
    opacity: .6;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--color-red) 100%);
  }
}

.button {
  z-index: 1;
  position: absolute;
  display: block;
  right: 0;
  bottom: 18%;
  left: 0;
  width: 5%;
  padding-bottom: 5%;
  border: none;
  border-radius: 50%;
  outline: none;
  margin: 0 auto;
  background-color: var(--color-green);
  cursor: pointer;
  transition: all 320ms cubic-bezier(.25, .46, .45, .94);

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 6%;
    height: 35%;
    margin: auto;
    background-color: var(--color-blue);
    transition: all 180ms cubic-bezier(.25, .46, .45, .94);
  }

  &:after {
    transform: rotate(90deg);
  }

  &.is-active {
    transform: scale(1.25);

    &:before {
      left: 11%;
      transform: rotate(45deg);
    }

    &:after {
      top: 11%;
      right: 19%;
      height: 16%;
      transform: rotate(-45deg);
    }
  }

  &.is-disabled {
    transform: rotate(45deg);
    background-color: var(--color-red);
  }
}
</style>
