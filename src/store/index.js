import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import campaigns from './campaigns'
import campaign from './campaign'
import targeting from './targeting'
import publisherTargeting from './publisherTargeting'
import countries from './countries'

import { getUserStore } from 'am-components-front'
const user = getUserStore(
    process.env.SSO_API,
    process.env.SFL_CORE_CONDITION,
    'sflAdv'
)
console.log('process.env.SSO_API:', process.env.SSO_API)
console.log('process.env.SFL_CORE_CONDITION:', process.env.SFL_CORE_CONDITION)

export default new Vuex.Store({
    state: {
        firstName: '',
        lastName: '',
    },
    modules: {
        campaigns,
        campaign,
        targeting,
        publisherTargeting,
        user,
        countries
    }
})