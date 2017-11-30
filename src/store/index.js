import appData from './app-data'
import appEvent from './app-event'
import routerStatus from './router-status'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

 const store = new Vuex.Store({
    strict: debug, //在非生产环境下，使用严格模式
    modules: {
        appData, routerStatus, appEvent
    }
})
export default store