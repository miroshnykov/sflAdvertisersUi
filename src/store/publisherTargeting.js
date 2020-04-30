import publisherTargeting from '../api/publisherTargeting'

export default {
    state: {
        publisherTargeting:[]
    },
    namespaced: true,
    mutations: {
        async savePublisherTargeting(state, publisherTargeting) {
            state.publisherTargeting = publisherTargeting
        },
    },
    actions: {
        async savePublisherTargetingStore ({ commit }) {
            commit('savePublisherTargeting', await publisherTargeting.publisherTargeting())
        },
    },
    getters: {
        getPublisherTargeting: state => state.publisherTargeting,
    },
}
