import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    documentConfigs: {},
    docParts: [],
    vidParts: []
  },
  mutations: {
    UPDATE_DOCUMENT_CONFIGS (state, configs) {
      state.documentConfigs = configs
    },
    UPDATE_DOC_PARTS (state, template) {
      state.docParts.push(template)
    },
    UPDATE_VID_PARTS (state, template) {
      state.vidParts.push(template)
    }
  },
  actions: {
    updateDocumentConfigs ({commit}, configs) {
      commit('UPDATE_DOCUMENT_CONFIGS', configs)
    },
    updateDocParts ({commit}, template) {
      commit('UPDATE_DOC_PARTS', template)
    },
    updateVidParts ({commit}, template) {
      commit('UPDATE_VID_PARTS', template)
    }
  },
  getters: {
    getDocumentConfigs: state => state.documentConfigs,
    getDocParts: state => state.docParts,
    getVidParts: state => state.vidParts
  }
})
