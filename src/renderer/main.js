import Vue from 'vue'
import App from './App'

import router from './router/routes'
import store from './store/store'

//----------------------------------
// Configuration
//----------------------------------
const isDev = process.env.NODE_ENV === 'development'

Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = isDev

// tslint:disable-next-line: no-unused-expression
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
