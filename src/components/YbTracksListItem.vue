<template functional>
  <div
    class="wrapper album-cover"
    :class="[
      props.positionClassName,
      props.track.isSelected ? 'is-selected' : '',
      props.track.isDisabled ? 'is-disabled' : '',
      props.animating && props.track.isSelected ? 'is-animating' : '',
    ]"
    :style="{ backgroundImage: `url(${props.track.thumbnail_url})` }"
  />
</template>

<style lang="postcss" scoped>
  .wrapper {
    position: absolute;
    bottom: -175%;
    left: 42.5%;
    width: 15%;
    padding-bottom: 15%;
    transition: all 500ms cubic-bezier(.25, .46, .45, .94);
  }

  .is-active {
    z-index: 1;
    transform: translate(0, -440%) scale(1.5);
  }

  .is-disabled {
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url('/assets/images/static.gif');
      background-size: 100%;
      opacity: .8;
    }
  }

  .is-selected { transform: translate(0, -457%) scale(1.85); }

  .is-animating { animation: submit 1000ms; }

  @keyframes submit {
    0% { transform: translate(0, -457%) scale(1.85); }
    30% { transform: translate(0, -440%) scale(1); }
    100% { transform: translate(0, -457%) scale(1.85); }
  }

  .is-previous-1 { transform: translate(-140%, -420%); }
  .is-previous-2 { transform: translate(-245%, -400%); }
  .is-previous-3 { transform: translate(-350%, -380%); }
  .is-previous-4 { transform: translate(-455%, -180%); }

  .is-next-1 { transform: translate(140%, -420%); }
  .is-next-2 { transform: translate(245%, -400%); }
  .is-next-3 { transform: translate(350%, -380%); }
  .is-next-4 { transform: translate(455%, -180%); }
</style>
