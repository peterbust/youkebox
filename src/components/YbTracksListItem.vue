<template functional>
  <div
    class="album-cover"
    :class="[
      $style['wrapper'],
      $style[props.positionClassName],
      props.positionClassName === 'is-active'
        && props.select
        && !props.disabled
        ? $style['is-selected'] : '',
      props.disabled ? $style['is-disabled'] : '',
      props.positionClassName === 'is-active'
        && props.chosen
        && props.select
        ? $style['is-chosen'] : ''
    ]"
    :style="{ backgroundImage: `url(${props.thumbnail})` }"
  />
</template>

<style lang="postcss" module>
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

  .is-chosen { animation: chosen 1000ms; }

  @keyframes chosen {
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
