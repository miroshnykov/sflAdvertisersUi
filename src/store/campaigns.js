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
        async delCamp(state, rmId) {
            const {campaigns} = state
            state.campaigns = campaigns.filter(({id}) => id !== rmId)
        },

        addCampaign(state, data) {
            const {campaigns} = state
            state.campaigns = Object.assign(campaigns, data)
        },

    },
    actions: {
        async saveCampaignsStore({commit}, id) {
            commit('saveCampaigns', await campaigns.campaigns())
        },
        async addCampaignsStore({commit}, data) {
            let campaign = data.$store.state.campaign.campaign
            campaign[0].userName = data.$store.state.user.user[0].name
            console.log(' **** addCampaignsStore')
            console.table(reFormatJSON(campaign))
            commit('addCampaign', campaign)
        },
        async delCampaign({commit}, id) {
            commit('delCamp', id)
            return await campaigns.del(id)
        },
    },
    getters: {
        getCampaigns: state => state.campaigns,
    },

};
