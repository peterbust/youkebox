<template>
  <div id="app">
    <YbPlayer />
    <YbQueueList />
    <YbLibraryList />
  </div>
</template>

<script>
import YbLibraryList from '@/components/YbLibraryList.vue'
import YbPlayer from '@/components/YbPlayer.vue'
import YbQueueList from '@/components/YbQueueList.vue'

export default {
  components: {
    YbLibraryList,
    YbPlayer,
    YbQueueList,
  },
}
/* 16:9 */
/* Left, right, space */
</script>

<style>
body {
  background: black;
  color: white;
}
</style>
