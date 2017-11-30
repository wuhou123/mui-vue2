<template lang="pug">
  div
    #content.routerview.viewMargin
      header.mui-bar.mui-bar-nav(v-if="$store.state.appData.isShowHead")
        a.mui-action-back.mui-icon.mui-icon-left-nav.mui-pull-left(v-show="$store.state.appData.isShowBack")
        h1.mui-title {{$store.state.appData.navbarTitle}}
      transition(name='fade' mode="out-in")
        router-view
    nav.mui-bar.mui-bar-tab(v-if="$store.state.appData.isShowFoot")
      .mui-tab-item(v-for="item in footerMenu",@tap="goTo(item)",:class="{'mui-active':item.name==$store.state.appData.navbarTitle}")
        span.iconfont.mui-icon(:class="item.name==$store.state.appData.navbarTitle?item.iconActive:item.icon")
        span.mui-tab-label {{item.name}}
</template>

<script>	
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
        router:'/index'
      },
        {
          icon:'icon-More-normal',
          iconActive:'icon-More-press',
          name:'会员',
          router:'/home'
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
  	console.log('jinrule')
  	//当app.vue创建完成以后，自动加载Home.vue模块
		 this.$router.push('/index')
  },
  methods:{
    goTo(item){
      console.log(item);
    	this.$router.push(item.router)
    }
  }
}
</script>

<style>
@import '~static/common/common.css';
@import '~static/css/muihead.css';
body{
  background-color:white;
}
.mint-tab-item-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 5px
}
/*.routerview{
	margin-top: 45px;
}*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.mui-bar-tab .mui-tab-item.mui-active {
  color: #FF5E52;
}
.mui-bar-nav + div{
  margin-top: 30px;
}
</style>
