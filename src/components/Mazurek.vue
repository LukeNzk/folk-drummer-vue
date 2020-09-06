const { VTabsItems } = require("vuetify/lib");

<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-row>
        <v-col class="text-left">
          <span class="display-3 font-weight-light" v-text="tempo"></span>
          <span class="subheading font-weight-light mr-1">BPM</span>
        </v-col>
        <v-col class="text-right">
          <v-btn color="primary" fab @click="onPlayClicked">
            <v-icon x-large>
              {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-slider v-model="tempo" min="60" max="360"></v-slider>

      <p>{{ lang['shift'] }}</p>
      <v-slider v-model="shift" min="-100" max="100">
        <template v-slot:append> <span v-text="shift" /> % </template>
      </v-slider>

      <p>{{ lang['oscilation'] }}</p>
      <v-slider v-model="oscilation" min="0" max="100">
        <template v-slot:append>
          <span v-text="getOscilationStr()" />
        </template>
      </v-slider>
      <v-row>
        <v-col class="text-center" v-for="beat in 3" :key="'beat' + beat">
          <v-avatar
            :color="beat - 1 == currentBeat ? 'accent' : 'primary'"
            size="86"
          >
            <span class="display-3 font-weight-light">{{ beat }} </span>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import AudioTrackPlayer from '@/common/AudioTrackPlayer';

export default {
  props: {
    audioClips: Object,
    audioUtils: Object,
  },
  data() {
    return {
      tempo: 190,
      shift: -18,
      oscilation: 0,
      isPlaying: false,
      currentBeat: -1,
      player: null,
    };
  },
  watch: {
    tempo: function(val) {
      this.getGenerator().bpm = val;
    },
    shift: function(val) {
      this.getGenerator().setOffset(1, val / 100.0);
    },
    oscilation: function(val) {
      this.player.setTempoOscilation(val / 10.0);
    },
    currentAudioClips: {
      handler: function(val) {
        this.player.setAudioClips(val.getClips());
      },
    },
  },
  computed: {
    lang() {
      return this.$store.state.currentLanguage;
    },
    currentAudioClips() {
      return this.audioClips;
    },
  },
  mounted() {
    this.player = new AudioTrackPlayer(
      this.audioUtils,
      this.currentAudioClips.getClips()
    );
    this.getGenerator().bpm = this.tempo;
    this.getGenerator().setOffset(1, this.shift / 100.0);
    this.player.setTempoOscilation(this.oscilation / 10.0);
    this.player.setOnBeatChanged(this.onBeatChanged);
  },
  methods: {
    getGenerator() {
      return this.player.generator;
    },
    onPlayClicked() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.player.start();
      } else {
        this.player.stop();
      }
    },
    getOscilationStr() {
      return this.getOscilationValue().toFixed(2);
    },
    getOscilationValue() {
      return this.oscilation / 10.0;
    },
    onBeatChanged(beat) {
      if (beat) {
        this.currentBeat = beat.index;
      }
    },
  },
};
</script>
