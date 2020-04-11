import campaign from '../api/campaign'
import verifyLP from '../api/verifyLP'
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
        updateField(state, data) {
            state.campaign[0][data.field] = data.value
        },
        // async saveConditions(state, data) {
        //     debugger
        //     console.log(state)
        //     console.log(data)
        //     console.log(`before save campaign`)
        //     console.table(reFormatJSON(state.campaign.campaign[0]))
        //
        //     let response =  await campaign.updateCampaign(state.campaign.campaign[0])
        //     debugger
        //     if (response.id){
        //         data.$swal.fire({
        //             type: 'success',
        //             position: 'top-end',
        //             title: 'Campaign data has been saved',
        //             showConfirmButton: false,
        //             timer: 1000
        //         })
        //     }
        //     return response
        //     commit('saveConditions', state.campaign)
        // },

    },
    actions: {
        async saveCampaignsStore({commit}, id) {
            commit('saveCampaign', await campaign.campaign(id))
        },
        updateFieldAction({commit}, data) {
            commit('updateField', data)
        },
        async addCampaign({commit}, data) {
            return await campaign.addCampaign(data)
        },
        async saveConditionsAction({commit}) {
            console.log(`before save campaign`)
            console.table(reFormatJSON(this.state.campaign.campaign[0]))
            return await campaign.updateCampaign(this.state.campaign.campaign[0])
        },
        async updCampaignName({commit}, data) {
            return await campaign.updateCampaignName(data)
        },
        async validateLandingPage({commit}, lp) {
            return await verifyLP.verifyLP(lp)
        },
    },
    getters: {
        getCampaign: state => state.campaign,
    },

};
