<template>
  <div :class="$style.list">
    <YbSongListItem
      v-for="song in songs"
      :key="song.title"
      :title="song.title"
    />
  </div>
</template>

<script>
import YbSongListItem from './YbSongListItem.vue'

export default {
  components: { YbSongListItem },

  computed: {
    songs() {
      return this.$store.state.songs
    },
  },
}
</script>

<style module>
  .list {
    width: 100%;
    height: 50%;
    overflow: hidden;
  }
</style>
