<template lang="pug">
  div
    #content.routerview.viewMargin
      header.mui-bar.mui-bar-nav
        a.mui-action-back.mui-icon.mui-icon-left-nav.mui-pull-left
        h1.mui-title 测试
      transition(name='fade' mode="out-in")
        router-view
    nav.mui-bar.mui-bar-tab
      .mui-tab-item(v-for="item in footerMenu",@tap="goTo(item)",:class="{'mui-active':true}")
        span.iconfont.mui-icon(:class="item.icon")
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
        router:'/Home'
      },
        {
          icon:'icon-More-normal',
          iconActive:'icon-More-press',
          name:'会员',
          router:'/member'
        },
        {
          icon:'icon-youhuijuan-xianxing',
          iconActive:'icon-youhuijuan',
          name:'优惠劵',
          router:'/car'
        },
        {
          icon:'icon-Username',
          iconActive:'icon-Username-press',
          name:'我的',
          router:'/search'
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
      if(item.name == '会员'){
        this.$router.push('/home')
      }
      if(item.name == '首页'){
        this.$router.push('/index')
      }
      if(item.name == '优惠劵'){
      	this.$router.push('/find')
      }
    }
  }
}
</script>

<style>
	@import '../static/css/muihead.css';
/*body {
  background-color: #ebebeb;
}

#app {
  font-family: Arial,Helvetica,sans-serif;
}*/

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
