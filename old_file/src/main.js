import 'babel-polyfill'
import Vue from 'vue'
import MintUI from 'mint-ui'
import mui from '../statics/js/mui'
import 'mint-ui/lib/style.css'
import '../statics/css/mui.css'
import '../statics/css/icons-extra.css'
import '../statics/css/muihead.css'

import App from './App.vue'

import VueRouter from 'vue-router'
import vueResource from 'vue-resource'

//import VueLazyload from 'vue-lazyload'

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(MintUI)  //注册全局组件
//Vue.use(VueLazyload, {
//preLoad: 1.3,
//error: 'statics/images/loading.png',
//loading: 'statics/images/loading.png',
//attempt: 1
//})

import moment from '../statics/js/moment.js'
//注册全局过滤器
Vue.filter('dateFmt',(value,formatString)=>{
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
	return moment(value).format(formatString); 
})
//注册全局变量
import {Vwaiting,Cwaiting} from '../statics/js/showWating.js'
window.app = Object.assign({}, {Vwaiting,Cwaiting});

import Home from 'comp/Home/Home'
import member from 'comp/member/member'
import car from 'comp/car/car'
import search from 'comp/search/search'
//图文资讯组件
import imgcontentnews from 'comp/news/ImgContentNew'
//图文资讯详细内容显示组件
import showNewsDetial from 'comp/news/showDetial'
//图片分享组件
import photolist from 'comp/photo/photolist'

import Vuex from 'vuex'
import appData from 'statics/js/store/app-data'
import appEvent from 'statics/js/store/app-event'
import routerStatus from 'statics/js/store/router-status'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'PRD', //在非生产环境下，使用严格模式
    modules: {
        appData, routerStatus, appEvent
    }
})
//创建路由
	const router = new VueRouter({
		linkActiveClass:'mui-active', //可以修改router-link-active 为mui-active来解决tab栏的选中bug
	    mode: 'history',  //不想看到#号则配置这个 (可以用来解决与html本身锚点冲突的问题)
	    routes: [
	   		{ path: '/', redirect:'/Home',component: Home,meta:{title:'首页',isShowHead:false,isShowFoot:true}},
	        { path: '/Home', component: Home,meta:{title:'首页',isShowHead:false,isShowFoot:true,isShowBack:false}},
	        { path: '/member', component: member,meta:{title:'会员',isShowHead:true,isShowFoot:true,isShowBack:false}},
	        { path: '/car', component: car,meta:{title:'优惠劵',isShowHead:true,isShowFoot:true,isShowBack:false}},
	        { path: '/search', component: search,meta:{title:'我的',isShowHead:true,isShowFoot:false,isShowBack:true}},
	        { path: '/news/imgcontentnews', component: imgcontentnews,meta:{title:'图文',isShowHead:true,isShowFoot:true,isShowBack:true}}, //图文资讯
	        { path: '/news/showdetial/:id', component: showNewsDetial,meta:{title:'图文详情',isShowHead:true,isShowFoot:true}}, //图文资讯详细
	        { path:'/photolist',component:photolist,meta:{title:'图片列表',isShowHead:true,isShowFoot:true}}
	        
	    ]
	});
	router.afterEach(function(to,from){
		console.log(to.meta.title,to.meta.isShowBack)
		if(to.meta.title){
			store.dispatch("updateNavbarTitle", to.meta.title);
			store.dispatch('updateNavbarStatus',{isShowHead:to.meta.isShowHead,isShowFoot:to.meta.isShowFoot,isShowBack:to.meta.isShowBack})
			document.title = "加时代-" + to.meta.title || "";
		}		
	})
//图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error:'dist/error.png',
  loading:'dist/loading.gif',
  attempt: 1,
  listenEvents: [ 'scroll', 'mousewheel' ]
});

new Vue({
  el: '#app',
  router:router, //使用路由对象实例
  store:store, 
  render: h => h(App)
})

