<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-toolbar>
            <slot name="toolbar"></slot>
          </v-toolbar>
          <v-tabs v-model="tab" grow>
            <v-tab>Mazurek</v-tab>
            <v-tab>Polka</v-tab>
            <v-tab-item>
              <Mazurek></Mazurek>
            </v-tab-item>
            <v-tab-item>
              <Polka></Polka>
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

export default {
  components: {
    Mazurek,
    Polka,
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>
