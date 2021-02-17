<template>
  <v-app>
    <Players>
      <template #toolbar>
        <v-col class="text-center">
          <v-btn @click="() => setLanguage('pl')">PL</v-btn>
          <v-btn @click="() => setLanguage('en')">EN</v-btn>
        </v-col>
      </template>
    </Players>
    <v-bottom-navigation>
      <v-card outlined color="rgb(0, 0, 0, 0)">
        <v-card-text>
          <v-btn icon href="https://www.facebook.com/bebnistapl"
            ><v-icon>mdi-facebook</v-icon></v-btn
          >
          <span id="version">v 1.1</span>
        </v-card-text>
      </v-card>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Players from '@/components/Players.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: { Players },
  methods: {
    ...mapActions(['changeLanguage']),
    setLanguage(lang) {
      this.changeLanguage(lang);
    },
  },
};
</script>
