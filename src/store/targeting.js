import targeting from '../api/targeting'
import {reFormatJSON} from '../helpers'
import {mapState, mapGetters} from 'vuex'

const emptyTargeting = {
    user: '',
    cpc: 0.0,
    filterTypeId: 0,
    platformAndroid: false,
    platformIos: false,
    platformWindows: false,
    sourceTypeSweepstakes: false,
    sourceTypeVod: false,
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
        removeTargetingItem(state, rmPosition) {
            const {targeting} = state

            let targetingFilter = targeting.filter(({position}) => position !== rmPosition)
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
                let response = await targeting.del(state.campaignId, true)
                if (!response.id) {
                    throw new Error('delete targeting backend error')
                }

                for (const item of state.targeting) {
                    item.campaignId = state.campaignId
                    console.table('before createTargeting ')
                    console.table(reFormatJSON(item))
                    try {
                        let res = await targeting.add(item)
                        if (!res.id) {
                            throw new Error('add targeting backend error')
                        }
                    } catch (err) {
                        await targeting.restoreSoftDelete(state.campaignId)
                        console.log('err', err)
                        data.$swal.fire({
                            type: 'error',
                            title: 'error in createTargeting()',
                            text: `Something went wrong!${JSON.stringify(err)}`,
                            footer: 'Errors '
                        })
                        return
                    }
                }

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

            await targeting.del(state.campaignId)
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
