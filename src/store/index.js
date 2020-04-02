import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import googleAuth from './googleAuth'
import campaigns from './campaigns'
import user from './user'

export default new Vuex.Store({
    state: {
        firstName: '',
        lastName: '',
    },
    modules: {
        googleAuth,
        campaigns,
        user
    }
})