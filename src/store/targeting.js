import targeting from '../api/targeting'
import {reFormatJSON} from '../helpers'
import {mapState, mapGetters} from 'vuex'

const emptyTargeting = {
    user: '',
    cpc: 0.0,
    filterTypeId: 0,
    platformAndroid: 0,
    platformIos: 0,
    platformWindows: 0,
    sourceTypeSweepstakes: 0,
    sourceTypeVod: 0,
    position: 0,
    geo: ''
}

const createTargeting = (position) => {
    const filters = Object.assign(emptyTargeting, {position})
    return reFormatJSON(filters)
}

const assignPositions = xs =>
    xs.map((x, position) => Object.assign({}, x, {position}))

export default {
    state: {
        targeting: [],
        campaignId: 0,
    },
    namespaced: true,
    mutations: {
        addTargeting(state) {
            const {targeting} = state
            const {length} = targeting
            const position = length === 0 ? length : targeting[length - 1].position
            state.targeting = assignPositions([...targeting, createTargeting(position + 1)])
        },
        async saveTargeting(state, targeting) {
            state.targeting = targeting
            state.campaignId = targeting.campaignId
        },
        saveTargetingItem(state, item) {
            item[item.field] = item.fieldValue
        },
        removeTargetingItem(state, position) {
            const {targeting} = state

            let targetingFilter = targeting.filter(({position}) => position !== position)
            let positionNew = 0
            targetingFilter.forEach(item => {
                item.position = positionNew
                positionNew++
            })

            state.targeting = targetingFilter

        },
        // async saveConditions(data) {
        //     console.log(data)
        //     debugger
        //     // commit('saveConditions', state.campaign)
        // },

    },
    actions: {
        async saveTargetingStore({commit}, id) {
            let targetingData = await targeting.targeting(id)
            targetingData.campaignId = id
            commit('saveTargeting', targetingData)
        },
        async saveTargetingDb({commit}, data) {

            let state = this.state.targeting

            try {
                await targeting.del(state.campaignId)
            } catch (e) {
                console.log('err', e)
                data.$swal.fire({
                    type: 'error',
                    title: 'error in deleteSegmentConditions() ',
                    text: 'Something went wrong!',
                    footer: 'Errors '
                })
                return
            }
            for (const item of state.targeting) {
                item.campaignId = state.campaignId
                console.table('before createTargeting ')
                console.table(reFormatJSON(item))
                try {
                    await targeting.add(item)
                } catch (e) {
                    console.log('err', e)
                    data.$swal.fire({
                        type: 'error',
                        title: 'error in createTargetting()',
                        text: 'Something went wrong!',
                        footer: 'Errors '
                    })
                    return
                }
            }
            // data.$swal.fire({
            //     type: 'success',
            //     position: 'top-end',
            //     title: 'Campaign targeting has been saved',
            //     showConfirmButton: false,
            //     timer: 1000
            // })
            return true
        }

    },
    getters: {
        getTargeting: state => state.targeting,
        getCampaignId: state => state.campaignId
    },

};
