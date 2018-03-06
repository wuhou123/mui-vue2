<template>
	<div id="about">
		<mt-swipe :auto="4000">
		  <mt-swipe-item>
		  	<img src="./img/ad1.jpg" alt="" />
		  </mt-swipe-item>
		  <mt-swipe-item>
		  	<img src="./img/ad2.jpg" alt="" />
		  </mt-swipe-item>
		  <mt-swipe-item>
		  	<img src="./img/ad3.jpg" alt="" />
		  </mt-swipe-item>
		</mt-swipe>
		<div class="about-list">
			<h5>关注前端公众号吧！</h5>
			<img src="./img/jia.jpg" alt="" />			
		</div>
	</div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style scoped>
	#about{
		width:100%;
		height:150px;
		margin-top:30px
	}
	/*.mint-swipe-indicator.is-active{
		background:#8EE5EE
	}*/
	.mint-swipe-item img{
		width:100%;
		height:150px
	}
	.about-list{
		text-align:center
	}
</style>