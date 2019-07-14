<template functional>
  <div>
    <transition name="fade">
      <div
        v-show="props.show"
        :class="$style['text-wrapper']"
      >
        <p
          v-for="(message, i) in props.messages"
          :key="i"
          :class="$style.text"
        >
          {{ message }}
        </p>
      </div>
    </transition>
  </div>
</template>

<style lang="postcss" module>
.text-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 18%;
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
