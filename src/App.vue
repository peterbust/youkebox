<template>
  <div id="app">
    <!-- <YbPlayer /> -->
    <!-- <YbQueueList /> -->
    <YbTracksList />
  </div>
</template>

<script>
import YbTracksList from '@/components/YbTracksList.vue'
// import YbPlayer from '@/components/YbPlayer.vue'
// import YbQueueList from '@/components/YbQueueList.vue'

export default {
  components: {
    YbTracksList,
    // YbPlayer,
    // YbQueueList,
  },
}
</script>

<style>
:root {
  --color-blue: #182645;
  --color-red: #ed6a54;
  --color-green: #37c882;
}

body {
  overflow: hidden;
  background: var(--color-blue);
  font-family: Helvetica, Arial, 'sans-serif';
  font-size: 1rem;
  line-height: 1.25rem;
}
</style>
