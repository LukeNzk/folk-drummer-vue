const { VTabsItems } = require("vuetify/lib");

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <!-- card text -->
              <v-card-text>
                <v-row>
                  <v-col class="text-left">
                    <span
                      class="display-3 font-weight-light"
                      v-text="tempo"
                    ></span>
                    <span class="subheading font-weight-light mr-1">BPM</span>
                  </v-col>
                  <v-col class="text-right">
                    <v-btn color="primary" fab @click="onPlay">
                      <v-icon large>{{
                        isPlaying ? 'mdi-pause' : 'mdi-play'
                      }}</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-slider
                  v-model="tempo"
                  min="60"
                  max="360"
                  @change="onTempoChanged"
                ></v-slider>

                <p>Podbicie</p>
                <v-slider v-model="shift" min="-100" max="100">
                  <template v-slot:append> <span v-text="shift" /> % </template>
                </v-slider>

                <p>Wahanie tempa</p>
                <v-slider v-model="oscilation" min="0" max="100">
                  <template v-slot:append>
                    <span v-text="getOscilationStr()" />
                  </template>
                </v-slider>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AudioTrackPlayer from '@/common/AudioTrackPlayer';
import AudioUtils from '@/common/AudioUtils';

export default {
  data() {
    return {
      tempo: 190,
      shift: -18,
      oscilation: 0,
      isPlaying: false,
    };
  },
  computed: {
    audioUtils() {
      return new AudioUtils();
    },
    player() {
      return new AudioTrackPlayer(this.audioUtils);
    },
    generator() {
      return this.player.generator;
    },
  },
  methods: {
    onTempoChanged(val) {
      this.generator.bpm = val;
    },
    onShiftChanged(val) {
      this.generator.setOffset(val);
    },
    onOscilationChanged(val) {
      this.generator.oscilation = val;
    },
    onPlay() {
      this.isPlaying = !this.isPlaying;
    },
    getOscilationStr() {
      return this.getOscilationValue().toFixed(2);
    },
    getOscilationValue() {
      return this.oscilation / 10.0;
    },
  },
};
</script>

<style lang="scss" scoped></style>
