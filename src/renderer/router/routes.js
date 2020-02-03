import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})

export default router
