<template>
	<div>
		<div id="box0" style="height:45px;">
			
		</div>
		<!--
        	作者：ivanyb@qq.com
        	时间：2016-12-15
        	描述：分类导航
        -->
      <div class="ul-wapper">
      	<div id="box1" class="box1" v-bind="{style:'width:'+aWidth}">
      	<div class="box1-item">
        	<a @click="changecate(0)">全部</a></div>
       <div class="box1-item" v-for="cate in imgcategory">
        	<a @click="changecate(cate.id)">{{cate.title}}</a></div>
      </div>
      </div>
      
      <!--
      	作者：ivanyb@qq.com
      	时间：2016-12-15
      	描述：图片展示区
      -->
      <div id="imgs">
      <ul id="container" v-if="images"> 
		 <li v-for="item in images">
		 	<router-link to="/photo">
				<img v-lazy="item.img_url" :key="item.img_url">
				<div class="info">
                <h2>{{item.title}}</h2>
                <p>{{item.zhaiyao}}</p>
              </div>
			</router-link>
		 </li>
	 </ul>
	 </div>
	 <!--
      	作者：ivanyb@qq.com
      	时间：2016-12-15
      	描述：回到顶部锚点
      -->
	 <a class="active" href="#box0"><span class="mui-icon-extra mui-icon-extra-top"></span></a>
	</div>
</template>

<script>
//导入vux中的scroller组件
//import {scroller} from 'vux/dist/components/scroller'
import common from 'kits/common.js'
import { Indicator } from 'mint-ui';

	export default{
		data(){
			return {
			images:[],
			imgcategory:[]
			}
		},
		components:{
			
		},created(){
			getcate(this);			
			getimages(this,0);
			
//			console.log('cateid=',this.$route.params.cateid);
		
			
		},
		methods:{
			changecate:function(cateid){
				Indicator.open('努力加载中'); 
				getimages(this,cateid)
			}
		},
		mounted(){
			
		},
		beforeDestroy(){
			//这个组件中在template中增加了一个50高度的div，用来抵消margin-top:45px,但是为了其他组件正常使用
			//所以这个组件在准备销毁的时候将app.vue中的content 对应的div移除margin-top:45px
			document.querySelector('#content').style="margin-top:45px";
		}
	}
	
	function getcate(t){
	//1.0 获取分享图片分类
		t.$http.get(common.dataApiDomain+'/api/getimgcategory')
		.then((res)=>{
			t.imgcategory=res.body.message;
			
			//动态计算滚动总宽度
		    	let totalWidth = (res.body.message.length+1) * 70;
		    
				document.querySelector('#box1').style.width=totalWidth+'px';
				
				document.querySelector('#content').style="margin-top:0px";
		});
	}
	
	function getimages(t,cateid)
	{
		//2.0 获取分享图片
			t.$http.get(common.dataApiDomain+'/api/getimages/'+cateid)
			.then((res)=>{
				
				let imgs = res.body.message;
				for(let i = 0 ;i<imgs.length;i++)
				{
					imgs[i].img_url= common.imgDomain+imgs[i].img_url;
				}
				t.images = imgs;
				
				//关闭加载提示
				Indicator.close();
			});
	}
</script>
<style scoped>

.ul-wapper{
	overflow-x:auto;
	overflow-y: hidden;
}
.box1 {
  height: 20px;
}

.box1-item {
  height: 20px;
  margin-left: 5px;
  display: inline;
  float: left;
  text-align: center;
  line-height: 20px;
}

.box1-item a{
	width: auto;
	padding: 5px;
	font-size: 14px;
}

img[lazy=loading] {
  width: 100px;
  height: 300px;
  margin: auto;
}
li{
	list-style: none;
}
#container {
	padding: 0px;
	margin-bottom: 50px;
}
#container img{
	width: 100%;
	height: 300px;
}
#container a{
	position: relative;
}
#container  div{
	background-color:rgba(0,0,0,0.4);
	position: absolute;
	left: 0px;
	bottom: 0px;
	height: 70px;
}

#container .info h2{
	font-size: 15px;
	color:white;
}

#container .info p{
	color:white;
}
.mui-icon-extra{
	font-size: 30px;
}
.active{
	position: fixed;
	bottom: 150px;
	right: 10px;
	background-color: #FFFFFF;
	
}
</style>