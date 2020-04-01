import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import googleAuth from './googleAuth'

export default new Vuex.Store({
    state: {
        firstName: '',
        lastName: '',
    },
    modules: {
        googleAuth,
    }
})