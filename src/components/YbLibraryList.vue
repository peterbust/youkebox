<template>
  <div>
    <YbLibraryListItem
      v-for="libraryItem in library"
      :key="libraryItem.title"
      :title="libraryItem.title"
    />
  </div>
</template>

<script>
import YbLibraryListItem from './YbLibraryListItem.vue'

export default {
  components: { YbLibraryListItem },

  computed: {
    library() {
      return this.$store.state.library
    },
  },
}
</script>
