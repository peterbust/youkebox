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
  --color-green: #37c882;
  --color-red: #ed6a54;
  --font-light: 'Graphik Light', Helvetica, Arial, sans-serif;
  --font-regular: 'Graphik Regular', Helvetica, Arial, sans-serif;
  --font-semibold: 'Graphik Semibold', Helvetica, Arial, sans-serif;
}

@font-face {
  font-family: 'Graphik Light';
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
  src: local('Graphik Light'),
    url('./assets/fonts/light.woff2') format('woff2'),
    url('./assets/fonts/light.woff') format('woff');
}

@font-face {
  font-family: 'Graphik Regular';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
  src: local('Graphik Regular'),
    url('./assets/fonts/regular.woff2') format('woff2'),
    url('./assets/fonts/regular.woff') format('woff');
}

@font-face {
  font-family: 'Graphik Semibold';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
  src: local('Graphik Semibold'),
    url('./assets/fonts/semibold.woff2') format('woff2'),
    url('./assets/fonts/semibold.woff') format('woff');
}

body {
  overflow: hidden;
  background: var(--color-blue);
  background-image: url("./assets/pattern.png");
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
