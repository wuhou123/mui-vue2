<template>
  <div id="app">
    <!-- 为了某些页面的全屏效果，tab 栏放在各内容页 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'app',
  created (){
  	console.log('jinrule')
  	//当app.vue创建完成以后，自动加载Home.vue模块
		 this.$router.push('/index')
  }
}
</script>

<style>
body {
  background-color: #ebebeb;
}

#app {
  font-family: Arial,Helvetica,sans-serif;
}
</style>
