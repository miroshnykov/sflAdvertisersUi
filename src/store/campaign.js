import campaign from '../api/campaign'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        campaign: [],
    },
    namespaced: true,
    mutations: {
        async saveCampaign(state, campaign) {
            state.campaign = campaign
        },

    },
    actions: {
        async saveCampaignsStore({commit}, id) {
            commit('saveCampaign', await campaign.campaign(id))
        },
        async addCampaign({commit}, data) {
            console.log('>>> addCampaign')
            console.table(reFormatJSON(data))
            return await campaign.addCampaign(data)
        },
    },
    getters: {
        getCampaign: state => state.campaign,
    },

};
