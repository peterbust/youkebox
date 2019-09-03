<template>
  <div>
    <TransitionFade>
      <div
        v-show="show"
        class="text-wrapper"
      >
        <p
          v-for="(message, i) in messages"
          :key="i"
          class="text"
        >
          {{ message }}
        </p>
      </div>
    </TransitionFade>
  </div>
</template>

<script>
import TransitionFade from '@/components/TransitionFade.vue'

export default {
  components: {
    TransitionFade,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },

    messages: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped>
.text-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 19%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.text {
  color: var(--color-white);
  font-family: var(--font-semibold);
  font-size: var(--font-size-m);

  &:nth-child(2) {
    font-family: var(--font-regular);
  }
}
</style>
