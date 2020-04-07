import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import googleAuth from './googleAuth'
import campaigns from './campaigns'
import campaign from './campaign'
import targeting from './targeting'
import user from './user'
import countries from './countries'

export default new Vuex.Store({
    state: {
        firstName: '',
        lastName: '',
    },
    modules: {
        googleAuth,
        campaigns,
        campaign,
        targeting,
        user,
        countries
    }
})