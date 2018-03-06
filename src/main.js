// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// vue-resource
// 在服务器通讯方面，在升级到 vue 2.0 后，官方已经取消对 vue-resource 的更新而是转推 Axios
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

// 将全局样式文件写在 main.js
import '@/assets/scss/reset.scss'
import '@/assets/scss/iconfont.scss'
import '@/assets/ali-fonts/iconfont.css'
import '../static/css/mui.css'

// 全局引入 mui.js
import '../static/js/mui'  

// Mint UI
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('static/loading-bars.svg')
  // loading: require('@/assets/img/logo.png')
})
//定义全局加载组件
import {Vwaiting,Cwaiting} from 'static/js/showWating.js'
window.app = Object.assign({},{Vwaiting,Cwaiting})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
