<template lang="pug">
div.mui-slider
	.top(v-show="showIs") 推荐个性定制，点看看！
	transition(name="fade")
		.box(v-show="showIs")
			ul
				li(v-for="(item,index) in testItems",@tap="change(item,index)",:class="{changeS:item.sets}")
					.test {{item.name}}
	transition(name="fade")
		.tip(@tap="goIn",v-show="!showIs") 进入
	#slider.mui-slider(@slide="changeTab")
		.mui-slider-group.mui-slider-loop
			.mui-slider-item.mui-slider-item-duplicate
				a(href="#")
					img(:src="logo2")
			.mui-slider-item(v-for="item in items")
				a(href="#")
					img(:src="item.src")
			.mui-slider-item.mui-slider-item-duplicate
				a(href="#")
					img(:src="logo1")
		.mui-slider-indicator
			.mui-indicator(v-for='(item,index) in items', :class="{'mui-active ':index===0}")
</template>

<script>
	import mui from 'static/js/mui'
	import item1 from './img/item1.jpg'
	import item2 from './img/item2.jpg'
	export default{
		data(){
			return{
				items:[{
					src:item1
				},{
					src:item2
				}],
				logo1:item1,
				logo2:item2,
				testItems:[{
					name:'男',
					sets:false,
					id:'m'
				},
				{
					name:'女',
					sets:false,
					id:'w'
				},{
					name:'购物比较多',
					sets:false,
					id:'buy'
				},
				{
					name:'住酒店多',
					sets:false,
					id:'hotal'
				}],
				setindex:-1,
				showIs:true
			}
		},
		mounted(){
			//获得slider插件对象
				var gallery = mui('.mui-slider');
				gallery.slider({
				  interval:0//自动轮播周期，若为0则不自动播放，默认为0；
				});
		},
		methods:{
			change(item,index){							
				item.sets = !item.sets
			},
			goIn(){				
				//获取个性化信息
				var that = this;
				var a = '';
				var getSets = this.testItems.filter(function(v,i){
					return v.sets
				}).forEach(function(v,i){
						a += v.id+','
				})
				if(a){
					console.log(a.substring(0,a.length-1));
					if(MtaH5) MtaH5.clickStat('1003',{'1004':a.substring(0,a.length-1)});					
					localStorage.setItem('firstIn','first');
					that.$router.push('/home')
				}else{
					mui.confirm('还没设置标签？','商城',['跳过吧','去设置'],function(e){
						if(e.index == 0){
							that.$router.push('/home')	
						}else{
							//回到第一页
							var gallery = mui('.mui-slider');
							gallery.slider().gotoItem(0);							
						}
					})
				}		
				
			},
			changeTab(e){
				console.log(e.detail.slideNumber)
					this.showIs = !this.showIs
			}
		}
	}
</script>

<style scoped>
	.mui-slider-indicator .mui-active.mui-indicator {
    	background: #f0ad4e;
	}
	.mui-slider{
		position:absolute;
		top:0;
		bottom:0
	}
	.mui-slider-group,.mui-slider-item,.mui-slider-item a,.mui-slider-item a img{
		height:100%
	}
	.tip{
		z-index:99;
		width:4rem;
		height:2rem;		
		background:#41a961;
		text-align:center;
		line-height:2rem;
		position:absolute;
		bottom:5rem;
		left:50%;
		margin-left:-2rem;
		color:#fff;
		border-radius:0.9rem
	}
	.box{
		z-index:99;
		width:4rem;
		height:11.5rem;		
		text-align:center;
		position:absolute;
		top:5rem;
		left:50%;
		margin-left:-2rem	
	}
	.top{
		z-index:99;
		width:8rem;
		height:2rem;		
		text-align:center;
		position:absolute;
		top:0.5rem;
		left:50%;
		margin-left:-4rem;
		line-height:2rem;
		background:rgba(240, 173, 78,0.8);
		color: #9e2222;
		font-size: 12px		
	}
	.test{
		width:4rem;
		height:2.5rem;
		line-height:2.5rem;
		background:rgba(77, 197, 170, 0.8);
		color:#555;
		margin-bottom:0.4rem;
		font-size:0.6rem
	}
	.changeS{
		background:rgba(243, 203, 8, 0.98);		
	}
	.changeS .test{
		background:rgba(243, 203, 8, 0.98);
		color:#fff
	}
	.fade-enter-active,.fade-leave-active {
	    transition: all 3s ease;
	    opacity: 1
	}
	
	.fade-enter, .fade-leave-to {
	    opacity: 0;
	    transform: translate3d(100%, 0, 0);
	}	 
</style>