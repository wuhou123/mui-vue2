<template lang="pug">
  div
    #content.routerview.viewMargin
      header.mui-bar.mui-bar-nav(v-if="$store.state.appData.isShowHead")
        a.mui-action-back.mui-icon.mui-icon-left-nav.mui-pull-left(v-show="$store.state.appData.isShowBack")
        h1.mui-title {{$store.state.appData.navbarTitle}}
      transition(:name='$store.state.routerStatus.transition',mode="out-in")
        router-view
    nav.mui-bar.mui-bar-tab(v-if="$store.state.appData.isShowFoot")
      .mui-tab-item(v-for="item in footerMenu",@tap="goTo(item)",:class="{'mui-active':item.name==$store.state.appData.navbarTitle}")
        span.iconfont.mui-icon(:class="item.name==$store.state.appData.navbarTitle?item.iconActive:item.icon")
        span.mui-tab-label {{item.name}}
</template>

<script>
 import mui from 'static/js/mui'
 import store from './store'
export default {
  components: {},
  name: 'app',
  data(){
    return{
      title:'标题',
      footerMenu:[{
        icon:'icon-home-normal',
        iconActive:'icon-home-press',
        name:'首页',
        router:'/home'
      },
        {
          icon:'icon-More-normal',
          iconActive:'icon-More-press',
          name:'会员',
          router:'/index'
        },
        {
          icon:'icon-youhuijuan-xianxing',
          iconActive:'icon-youhuijuan-copy',
          name:'优惠劵',
          router:'/find'
        },
        {
          icon:'icon-Username',
          iconActive:'icon-Username-press',
          name:'我的',
          router:'/mine'
        }
      ]
    }
  },
  created (){
  	var that = this;
  	console.log('初始进入')
  	//当app.vue创建完成以后，自动加载Home.vue模块
  	if(!localStorage.firstIn){
  		this.$router.push('/guide');
  		return;
  	}
  	//初始化等待框
  	mui.plusReady(function(){
  		plus.nativeUI.showWaiting('初始化')	
  	}  		
  	)
  	setTimeout(function(){
  		mui.plusReady(function(){
  			plus.nativeUI.closeWaiting();		
  		}  		
  	)
  		that.$router.push('/home')
  	},1000)
		 	
  },
  methods:{
    goTo(item){
      console.log(item,this.$store.state.routerStatus.transition);      
    	this.$router.push(item.router)
    }
  }
}
</script>

<style scoped>
@import '~static/common/common.css';
@import '~static/css/muihead.css';
/*body{
  background-color:white;
}*/
.mint-tab-item-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 5px
}
/*.routerview{
	margin-top: 45px;
}*/
.fade-enter-active {
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    opacity: 1
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}
/*过渡动画*/
/*下一页*/
.next-enter-active {
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    opacity: 1;
    position: fixed;
    width:100vw;
}

.next-enter, .next-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(50%, 0, 0);
    transform: translate3d(50%, 0, 0);
}

.next-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
/*上一页*/
.prev-enter-active {
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    width:100vw;
}

.prev-enter, .prev-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
}

.prev-active {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
.mui-bar.mui-bar-tab .mui-tab-item.mui-active {
  color: #FF5E52;
}
.mui-bar-nav + div{
  margin-top: 30px;
}
</style>
