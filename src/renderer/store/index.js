import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'
import drawModule from "./modules/draw";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    drawModule
  },
})
