import targeting from '../api/targeting'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        targeting: [],
    },
    namespaced: true,
    mutations: {
        async saveTargeting(state, targeting) {
            state.targeting = targeting
        },
        // async saveConditions(data) {
        //     console.log(data)
        //     debugger
        //     // commit('saveConditions', state.campaign)
        // },

    },
    actions: {
        async saveTargetingStore({commit}, id) {
            commit('saveTargeting', await targeting.targeting(id))
        }

    },
    getters: {
        getTargeting: state => state.targeting,
    },

};
