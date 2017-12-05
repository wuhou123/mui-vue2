<!-- 发现 -->
<template>
	<div class="mui-scroll-wrapper">
		<div class="mui-scroll">
		  <div class="find">
		    <div v-for="item in findListData">
		      <find-item :data="item"></find-item>
		    </div>    
		  </div>			
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import TabBar from '@/components/base/tab-bar/tab-bar'
import FindItem from '@/components/base/find-item/find-item'
import importUrl from '../../../mock/find-list'
import mui from 'static/js/mui'

export default {
  components: {
    TabBar,
    FindItem
  },
  data () {
    return {
      findListData: []
    }
  },
  props: {},
  watch: {},
  methods: {
    _initFindListData () {
    	console.log(importUrl)
    	if(process.env.NODE_ENV == 'production'){
    		this.findListData = importUrl.data
    		return;
    	}    	    	
      axios.get('/api/findList').then(res => {
        if (res.data.code === 0) {
          this.findListData = res.data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {},
  computed: {},
  created () {
    this._initFindListData()
  },
  mounted () {
  	//初始滚动
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			indicators: false //是否显示滚动条
		});  	
  },
  destroyed () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.find {
  margin-bottom: 50px;
}
</style>
