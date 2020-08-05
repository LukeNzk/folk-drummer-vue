import Vue from 'vue';
import Vuex from 'vuex';

import * as polish from './lang/pl.json';
import * as english from './lang/en.json';

Vue.use(Vuex);

function createLanguages() {
  const result = {
    pl: polish.data,
    en: english.data,
  };
  return result;
}

const exportedState = new Vuex.Store({
  state: {
    languages: createLanguages(),
    currentLanguage: null,
  },
  mutations: {
    setLanguage(state, lang) {
      state.currentLanguage = state.languages[lang];
    },
  },
  actions: {
    changeLanguage({ commit }, lang) {
      commit('setLanguage', lang);
    },
  },
});

exportedState.dispatch('changeLanguage', 'pl');

export default exportedState;
