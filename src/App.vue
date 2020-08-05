<template>
  <v-app>
    <Player>
      <template #toolbar>
        <v-col class="text-center">
          <v-btn @click="() => setLanguage('pl')">PL</v-btn>
          <v-btn @click="() => setLanguage('en')">EN</v-btn>
        </v-col>
      </template>
    </Player>
    <v-bottom-navigation>
      <v-card outlined color="rgb(0, 0, 0, 0)">
        <v-card-text>Łukasz Nizik @ 2020</v-card-text>
      </v-card>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Player from '@/components/Player.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: { Player },
  methods: {
    ...mapActions(['changeLanguage']),
    setLanguage(lang) {
      this.changeLanguage(lang);
    },
  },
};
</script>
