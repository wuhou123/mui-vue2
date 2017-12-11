<!-- 商家列表页 -->

<template>
	<div class = 'mui-scroll-wrapper Muimargin'>
		<div class = 'mui-scroll'>
		  <div class="restaurant-list">
		<!--    <header-bar @back="back"></header-bar>-->
		
		    <seller-list-item v-for="item in restaurantList"
		                      :key="item.name"
		                      :data="item"
		                      @toRestaurant="toRestaurant()"></seller-list-item>
		  </div>			
	</div>
	</div>
</template>

<script>
import SellerListItem from '@/components/base/seller-list-item/seller-list-item'
import HeaderBar from '@/components/base/header-bar/header-bar'
import axios from 'axios'
import importUrl from '../../../../mock/restaurant-list.json'
import mui from 'static/js/mui'

export default {
  components: {
    SellerListItem,
    HeaderBar
  },
  data () {
    return {
      restaurantList: []
    }
  },
  props: {},
  watch: {},
  methods: {
    _initRestaurantListData () {
    	if(process.env.NODE_ENV == 'production'){
    		this.restaurantList = importUrl.data.poilist
    		return;
    	}    	
      axios.get('/api/restaurantList').then(res => {
        if (res.data.code === 0) {
          this.restaurantList = res.data.data.data.poilist
        }
      }).catch(err => {
        console.log(err)
      })
    },
    back () {
      this.$router.push({
        path: '/index'
      })
    },
    toRestaurant () {
      this.$router.push({
        path: '/restaurant'
      })
    }
  },
  filters: {},
  computed: {},
  created () {
    // 初始化列表数据
    this._initRestaurantListData()
  },
  mounted () {
   	//初始滚动
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			indicators: false //是否显示滚动条
		}); 	
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.restaurant-list {
  background-color: #fff;
  margin-top: 42px;
}
.mui-scroll-wrapper.Muimargin{
	@include muiMargin(0px);
}
</style>
