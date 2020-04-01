// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import VueCookies from 'vue-cookies'
import './style/style.sass'
import {getCookie} from './helpers'
// Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCookies)
import {mapState} from 'vuex'
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    async created() {
        await store.dispatch('googleAuth/SaveGoogleAuthUrl')
        let token = getCookie('accessToken')
        if (token) {
            await store.dispatch('googleAuth/VerifyTokenEmailSave')

            if (this.verifyTokenEmail) {
                router.push('/main')
            } else {
                console.log(' *** verifyToken is not valid *** ')
                router.push('/')
            }

        } else {
            let checkPatch = this.$root._route.path.includes('successLogin')
                || this.$root._route.path.includes('errorLogin')

            if (!checkPatch) {
                router.push('/')
            }

        }
    },
    computed: {
        ...mapState('googleAuth', ['verifyTokenEmail']),
    },
})
