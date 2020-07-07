<template>
  <div>
    <Player />
  </div>
</template>

<script>
import Player from '@/components/Player.vue';

export default {
  name: 'App',
  components: { Player },
};
</script>

<style lang="scss" scoped>
.pretty-background {
  background-color: blue;
  // min-height: 100%;
  // min-width: 100%;
  position: absolute;
}
</style>
