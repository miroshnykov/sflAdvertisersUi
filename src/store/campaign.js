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
        // async saveConditions(data) {
        //     console.log(data)
        //     debugger
        //     // commit('saveConditions', state.campaign)
        // },

    },
    actions: {
        async saveCampaignsStore({commit}, id) {
            commit('saveCampaign', await campaign.campaign(id))
        },
        async addCampaign({commit}, data) {
            return await campaign.addCampaign(data)
        },
        async saveConditions({commit}) {
            return await campaign.updateCampaign(this.state.campaign.campaign[0])
        },
        async updCampaignName(data) {
            return await campaign.updateCampaignName(data)
        },
    },
    getters: {
        getCampaign: state => state.campaign,
    },

};
