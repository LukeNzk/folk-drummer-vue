<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-2 mb-2">
            <slot name="toolbar"></slot>
            <v-select              
              :label="lang['drumType']"
              v-model="drumType"
              item-value="id"
              :items="drumTypes"
            ></v-select>
          </v-card>
          <v-tabs v-model="tab" grow>
            <v-tab>Mazurek</v-tab>
            <v-tab>Polka</v-tab>
            <v-tab-item>
              <Mazurek
                :audioClips="currentDrumClips"
                :audioUtils="audioUtils"
              ></Mazurek>
            </v-tab-item>
            <v-tab-item>
              <Polka
                :audioClips="currentDrumClips"
                :audioUtils="audioUtils"
              ></Polka>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Mazurek from '@/components/Mazurek.vue';
import Polka from '@/components/Polka.vue';
import AudioUtils from '@/common/AudioUtils';
import { AudioClip, AudioClips } from '@/common/ClipProvider';

import bigSfx from '@/assets/compressed/big';
import frameSfx from '@/assets/compressed/frame';

export default {
  components: {
    Mazurek,
    Polka,
  },
  data() {
    return {
      drumType: 0,
      tab: null,
      bigDrumClips: null,
      frameDrumClips: null,
    };
  },
  computed: {
    lang() {
      return this.$store.state.currentLanguage;
    },
    audioUtils() {
      return new AudioUtils();
    },
    drumTypes() {
      return [
        {
          id: 0,
          text: this.lang['frame'],
          audioClips: new AudioClips(this.audioUtils),
        },
        {
          id: 1,
          text: this.lang['baraban'],
          audioClips: new AudioClips(this.audioUtils),
        },
      ];
    },
    currentDrumClips() {
      const drum = this.drumTypes[this.drumType];
      return drum.audioClips;
    },
  },
  beforeMount: function() {
    this.bigDrumClips = new AudioClips(this.audioUtils);
    this.bigDrumClips.loadClips(bigSfx);

    this.frameDrumClips = new AudioClips(this.audioUtils);
    this.frameDrumClips.loadClips(frameSfx);

    this.drumTypes[0].audioClips.loadClips(frameSfx);
    this.drumTypes[1].audioClips.loadClips(bigSfx);
  },
};
</script>
