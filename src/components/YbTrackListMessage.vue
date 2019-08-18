<template functional>
  <div>
    <TransitionFade>
      <div
        v-show="props.show"
        class="text-wrapper"
      >
        <p
          v-for="(message, i) in props.messages"
          :key="i"
          class="text"
        >
          {{ message }}
        </p>
      </div>
    </TransitionFade>
  </div>
</template>

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
