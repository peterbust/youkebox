<template>
  <div class="wrapper">
    <YbTracksListItem
      v-for="(track, i) in tracks"
      :key="i"
      :animating="animating"
      :full-queue="fullQueue"
      :position-class-name="positionsGetClassName(i)"
      :track="track"
    />
    <button
      class="button"
      :class="buttonModifierClass"
    />
    <YbTrackListMessage
      :show="!activeTrack.isSelected && !activeTrack.isDisabled"
      :messages="[activeTrack.title, activeTrack.artist]"
    />
    <YbTrackListMessage
      :show="fullQueue && activeTrack.isSelected && !activeTrack.isDisabled"
      :messages="['Queue is full, wait a bit']"
    />
    <YbTrackListMessage
      :show="!fullQueue && !animating && activeTrack.isSelected"
      :messages="['Add to queue?']"
    />
    <YbTrackListMessage
      :show="activeTrack.isDisabled"
      :messages="['Available again later']"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { addToEachInArray, getKeyByValue } from '@/utils'
import api from '@/config/api'
import store from '@/store'
import TransitionFade from '@/components/TransitionFade.vue'
import YbTrackListMessage from '@/components/YbTrackListMessage.vue'
import YbTracksListItem from '@/components/YbTracksListItem.vue'

let selectTimeout = null

export default {
  components: {
    TransitionFade, // eslint-disable-line
    YbTracksListItem,
    YbTrackListMessage,
  },

  data() {
    return {
      animating: false,
      positions: {
        active: 0,
        next: [],
        previous: [],
      },
    }
  },

  computed: {
    allowUserInteraction() { return store.state.app.interactive },
    buttonModifierClass() {
      if (this.animating) return 'is-hidden'
      if (this.activeTrack.isDisabled) return 'is-disabled'
      if (this.activeTrack.isSelected && this.fullQueue) return 'is-full-queue'
      if (this.activeTrack.isSelected && !this.fullQueue) return 'is-selected'
      return ''
    },
    fullQueue() { return store.getters.fullQueue },
    activeTrack() { return this.tracks[this.positions.active] },
    tracks() { return store.state.data.tracks },
    tracksOverwrittenAt() { return store.state.data.overwrittenAt.tracks },
  },

  watch: {
    tracksOverwrittenAt() {
      this.$store.commit('overwriteData', { property: 'tracksDisabled', data: [] })
      this.positionsInit()
    },
  },

  created() {
    this.positionsInit()
    this.keyEventsInit()
  },

  methods: {
    /**
     * Handles key events only if interaction is allowed
     */
    keyEventsInit() {
      document.addEventListener('keyup', (evt) => {
        if (!this.allowUserInteraction) return
        if (evt.code === 'Space' && !this.activeTrack.isDisabled) {
          if (this.activeTrack.isSelected && !this.fullQueue) {
            this.trackSubmit(this.tracks[this.positions.active].file)
          } else {
            this.trackSelect(!this.activeTrack.isSelected)
          }
        }
        if (evt.code === 'ArrowLeft') this.positionsNavigate(-1)
        if (evt.code === 'ArrowRight') this.positionsNavigate(1)
      })
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
     */
    positionsNavigate(request) {
      this.trackSelect(false)
      this.positions = this.positionsAdd(this.positions, request, this.tracks.length)
    },

    /**
     * Disable a track
     */
    trackDisable() {
      store.commit('setTrackStatus', {
        key: this.positions.active,
        status: 'isDisabled',
      })
      store.commit('disabledTrackRegister', { key: this.positions.active })
    },

    /**
     * Select a track (if not already selected)
     * Handle selection timeout
     * @param {boolean} value Select value (default true)
     */
    trackSelect(value = true) {
      if (this.activeTrack.isSelected !== value) {
        store.commit('setTrackStatus', {
          key: this.positions.active,
          status: 'isSelected',
          value,
        })
      }

      if (value) selectTimeout = setTimeout(() => this.trackSelect(false), 5000)
      else window.clearTimeout(selectTimeout)
    },

    /**
     * Posts track to add to queue
     * (Else handles mock response for local development)
     * @param {string} file Track property to post
     */
    trackSubmit(file) {
      store.commit('toggleInteractiveAllowance')
      window.clearTimeout(selectTimeout)

      if (!store.state.app.localEnv) {
        axios.get(api.get.postToQueue, { params: { file } })
          .then((data) => {
            this.trackSubmitHandleResponse(data.data.response)
          })
          .catch(() => {
            console.error('Oops, something went wrong submitting a song.')
            this.trackSubmitHandleResponse('error')
          })
      } else {
        this.trackSubmitHandleResponse('success')
      }
    },

    /**
     * Handle possible submit responses
     * @param {string} response Response value from server
     */
    trackSubmitHandleResponse(response) {
      if (response === 'success') {
        this.animating = true
        this.$root.$emit('LottieConfirmed')
        setTimeout(() => {
          this.trackSelect(false)
          this.trackDisable()
          store.commit('toggleInteractiveAllowance')
          this.animating = false
          store.dispatch('fetchData', { type: 'queue' })
        }, 2000)
      }

      if (response === 'recentlyPlayed') {
        this.trackSelect(false)
        this.trackDisable()
        store.commit('toggleInteractiveAllowance')
      }

      if (response === 'queueFull' || response === 'error') {
        this.trackSelect(false)
        store.commit('toggleInteractiveAllowance')
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
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

  &.is-selected {
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

  &.is-hidden {
    transform: scale(0) rotate(0deg);
  }

  &.is-disabled {
    transform: scale(1) rotate(45deg);
    background-color: var(--color-red);
  }

  &.is-full-queue {
    transform: scale(1.25) rotate(45deg);
    background-color: orange;
  }
}
</style>
