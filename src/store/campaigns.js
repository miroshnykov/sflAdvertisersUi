import campaigns from '../api/campaigns'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        campaigns: [],
    },
    namespaced: true,
    mutations: {
        async saveCampaigns(state, campaigns) {
            state.campaigns = campaigns
        },

    },
    actions: {
        async saveCampaignsStore({commit}, id) {
            commit('saveCampaigns', await campaigns.campaigns())
        },
    },
    getters: {
        getCampaigns: state => state.campaigns,
    },

};
