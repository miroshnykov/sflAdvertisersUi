import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import main from '../components/main'
import successLogin from '../components/successLogin'
import errorLogin from '../components/errorLogin'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/successLogin/:token',
            component: successLogin
        },
        {
            path: '/errorlogin/:email',
            component: errorLogin
        },
        {
            path: '/main',
            component: main
        }
    ]
})
