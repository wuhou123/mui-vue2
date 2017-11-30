<template lang='pug'>
.mui-content
  #slider.mui-slider.mui-fullscreen(@slide='changeTab')
    .mui-input-row.mui-search.muiIput
      input.mui-input-clear(type='search', placeholder='购物先搜劵，年省能过万', disabled='')
    .shopping
      i.iconfont.icon-shangchangtubiao-6
    #sliderSegmentedControl.mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control.mui-segmented-control-inverted
      #scrollM.mui-scroll
        template(v-for='(nav,index) in menus')
          a.mui-control-item.getScrolls(:href="'#'+nav.nav", :class="{'mui-active':index==0}", @tap.native='alert(index,$event)')
            span.getScroll {{nav.name}}
    .checkHome(@tap='showPopover')
      i.iconfont(:class='classChange')
    .hideMenus(:class='{menuShow:IsShow,menuHidden:!IsShow}')
      ul
        li.menuFont(v-for='(item,index) in menus', :class='{changeCheck:index==setIndex}', @tap='setIdex(index)') {{item.name}}
    .mui-slider-group.muiMargin
      template(v-for='(item,index) in menus')
        .mui-slider-item.mui-control-content(:id='item.nav', :class="{'mui-active':index==0}")
          #scroll1.mui-scroll-wrapper
            .mui-scroll(v-if='index==0')
              // 精选内容
              #slider.mui-slider
                .mui-slider-group.mui-slider-loop
                  // 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播)
                  .mui-slider-item.mui-slider-item-duplicate
                    a(href='#')
                      img(src='../../../statics/images/yuantiao.jpg')
                  // 轮播图
                  template(v-for='item in items')
                    .mui-slider-item
                      a(:href='item.href')
                        img(v-lazy='item.src')
                  // 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播)
                  .mui-slider-item.mui-slider-item-duplicate
                    a(href='#')
                      img(src='../../../statics/images/shuijiao.jpg')
                .mui-slider-indicator
                  .mui-indicator(v-for='(item,index) in items', :class="{'mui-active ':index===0}")
              ul.mui-table-view.mui-grid-view.mui-grid-9(style='margin:5px 0px;background-color:#FFFFFF;')
                template(v-for='(item,index) in navs')
                  li.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3.fenleilist(style='border-right:none;border-bottom:none;width:20%;padding:11px;font-size:12px;')
                    a(name='item.name', :href='item.href')
                      span.mui-icon.iconfont.iconColor(:class='item.icon')
                      .mui-media-body(style='font-size:12px;')
                        | {{item.name }}
              div.biqiang
                span.fontToday 今日必抢
                span.fontTime 每天9:00
                span.fontPro
                  | 爆款天天好货
                  i.iconfont.icon-xiayibu
              .mui-slider
                .mui-slider-group
                  .mui-slider-item(v-for='(n,index) in 2' :class="{'mui-active':index==0}")
                    ul.mui-table-view.mui-grid-view
                      li.mui-table-view-cell.mui-media.mui-col-xs-4.repairPadding
                        a(href='#')
                          img.mui-media-object(:src='test')
                          .mui-media-body Color of SIP CBD
                          div
                            span.fontR ￥12
                            span.fontCard 劵后价
                      li.mui-table-view-cell.mui-media.mui-col-xs-4.repairPadding
                        a(href='#')
                          img.mui-media-object(src='../../../statics/images/yuantiao.jpg')
                          .mui-media-body 静静看这世界
                          div
                            span.fontR ￥12
                            span.fontCard 劵后价
                      li.mui-table-view-cell.mui-media.mui-col-xs-4.repairPadding
                        a(href='#')
                          img.mui-media-object(src='../../../statics/images/yuantiao.jpg')
                          .mui-media-body 静静看这世界
                          div
                            span.fontR ￥12
                            span.fontCard 劵后价
              ul.mui-table-view.sub-table(style='background-color:transparent;')
                // 分类区域
                ul.mui-table-view.mui-grid-view(style='margin-top:7px;background-color:#fff;padding:0 6px 2px 0;')
                  li.mui-table-view-cell.mui-media.mui-col-xs-6(style='padding:7px 0 0 13px;')
                    a(href='#')
                      img.mui-media-object(style='border-radius:5px', src='../../../statics/images/ad1.jpg')
                  li.mui-table-view-cell.mui-media.mui-col-xs-6(style='padding:7px 0 0 13px;')
                    a(href='#')
                      img.mui-media-object(style='border-radius:5px', src='../../../statics/images/ad2.jpg')
                  li.mui-table-view-cell.mui-media.mui-col-xs-6(style='padding:7px 0 0 13px;')
                    a(href='#')
                      img.mui-media-object(style='border-radius:5px', src='../../../statics/images/ad3.jpg')
                  li.mui-table-view-cell.mui-media.mui-col-xs-6(style='padding:7px 0 0 13px;')
                    a(href='#')
                      img.mui-media-object(style='border-radius:5px', :src="imgad4")
                // 上新区域
                #banner
                  span
                    i.iconfont.icon-shangchangtubiao-
                    | 实时上新
                  span
                    i.iconfont.icon-shangchangtubiao-7
                    | 独家优惠
                  span
                    i.iconfont.icon-shangchangtubiao-14
                    | 全场包邮
                  canvas#myCanvas(width='100%', height='100%')
                template(v-for='data in item.contentData')
                  li.mui-media.viewBody(style='margin:3px 0;background-color:#ffffff;')
                    a(href='javascript:;')
                      img.mui-media-object.mui-pull-left(v-lazy='lazyImg', style='border-radius:4px;')
                      .mui-media-body(style='font-size:14px;')
                        span.mui-badge.mui-badge-danger.muiBadge 天猫
                        p.pageTwo 泰国正品Sivanna思薇娜化妆套刷粉底初学者彩妆工具12件套套装的好
                        p(style='margin-top:24px')
                          span.mui-ellipsis(style='font-size:12px;text-decoration:line-through;color:#888888') ￥12
                          span.mui-ellipsis(style='font-size:12px;margin:0 0 12px 10px;color:#888888')
                            | 劵后价 
                            span(style='font-size:14px;color:#FF5E52;') ￥10
                        span.mui-badge.mui-badge-danger(style='float:left;') 领劵立减100元
                        button.mui-btn.mui-btn-danger.mui-btn-outlined.getCard(type='button') 立即领取
              // end
            .mui-scroll(v-if='index!=0')
              ul.mui-table-view.TabMargin
                li.viewBody.mui-media.muiLi(v-for='data in item.contentData')
                  a(href='javascript:;')
                    img.mui-media-object.muiListImg(v-lazy='lazyImg', style='border-radius:4px')
                    .mui-media-body(style='font-size:14px')
                      span.mui-badge.mui-badge-danger.muiBadge 天猫
                      p.pageTwo 泰国正品Sivanna思薇娜化妆套刷粉底初学者彩妆工具12件套套装的好
                      p(style='margin-top:24px')
                        span.mui-ellipsis(style='font-size:12px;text-decoration:line-through;color:#888888') ￥12
                        span.mui-ellipsis(style='font-size:12px;margin:0 0 12px 10px;color:#888888')
                          | 劵后价 
                          span(style='font-size:14px;color:#FF5E52;') ￥10
                      span.mui-badge.mui-badge-danger(style='float:left;') 领劵立减100元
</template>
<script>
//	import 'statics/css/home.css'
	import 'src/common/common.css'
	import mui from 'statics/js/mui.js'
	import '../../../statics/js/mui.pullToRefresh.js'
	import '../../../statics/js/mui.pullToRefresh.material.js'
	var imgS = require('../../../statics/images/ad4.jpg')
	var ads1 = require('../../../statics/images/shuijiao.jpg')
	var ads2 = require('../../../statics/images/yuantiao.jpg')
	export default {
		data() {
			return {
				imgad4:require('../../../statics/images/ad4.jpg'),
				test:require('../../../statics/images/shuijiao.jpg'),
				lazyImg:'',
				setIndex: 0,
				classChange: 'icon-30-copy',
				IsShow: false,
				items: [{
					href: '#',
					src:ads1
				}, {
					href: '#',
					src:ads2
				}],
				navs: [{
						name: '女装',
						href: '#',
						icon: 'icon-nvzhuang'
					},
					{
						name: '母婴',
						href: '#',
						icon: 'icon-muying'
					},
					{
						name: '化妆品',
						href: '#',
						icon: 'icon-huazhuangpin'
					},
					{
						name: '居家',
						href: '#',
						icon: 'icon-xingzhuang33'
					},
					{
						name: '鞋包配饰',
						href: '#',
						icon: 'icon-xiebaopeishi'
					},
					{
						name: '美食',
						href: '#',
						icon: 'icon-meishi'
					},
					{
						name: '文体车品',
						href: '#',
						icon: 'icon-wenti'
					},
					{
						name: '数码家电',
						href: '#',
						icon: 'icon-jiadianshumashouji'
					},
					{
						name: '男装',
						href: '#',
						icon: 'icon-nanzhuang'
					},
					{
						name: '更多类目',
						href: '#',
						icon: 'icon-gengduo'
					},
				],
				menus: [{
						name: '精选',
						nav: 'item1mobile',
						contentData: false
					},
					{
						name: '男装',
						nav: 'item2mobile',
						contentData: false
					},
					{
						name: '女装',
						nav: 'item3mobile',
						contentData: false
					},
					{
						name: '母婴',
						nav: 'item4mobile',
						contentData: false
					},
					{
						name: '化妆品',
						nav: 'item5mobile',
						contentData: false
					},
					{
						name: '内衣',
						nav: 'item6mobile',
						contentData: false
					},
					{
						name: '配饰',
						nav: 'item7mobile',
						contentData: false
					}, {
						name: '鞋品',
						nav: 'item8mobile',
						contentData: false
					}, {
						name: '家电',
						nav: 'item9mobile',
						contentData: false
					}, {
						name: '居家',
						nav: 'item10mobile',
						contentData: false
					}, {
						name: '箱包',
						nav: 'item11mobile',
						contentData: false
					}
				],
				count: 0,
				tabsOne: [{
					name: '第一个子项'
				}],
				tabsTwo: [{
					name: '第二个子项'
				}],
				Isloading: true

			}
		},
		created() {},
		mounted() {
			mui.init();
			var that = this;
			(function($) {
				//阻尼系数
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				$('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: false, //是否显示滚动条
					deceleration: deceleration
				});
				$.ready(function(callback) {
					//循环初始化所有下拉刷新，上拉加载。
					$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
						$(pullRefreshEl).pullToRefresh({
							down: {
								callback: function() {
									var self = this;
									that.tabDown(index, self)
								}
							},
							up: {
								height: 50, //可选.默认50.触发上拉加载拖动距离
								auto: false, //可选,默认false.自动上拉加载一次
								contentrefresh: '<a class="loadingImages"></a>', //可选，正在加载状态时，上拉加载控件上显示的标题内容
								contentnomore: '已到底了', //可选，请求完毕若没有更多数据时显示的提醒内容；
								callback: function() {
									var self = this;
									that.tabUp(index, self)
								}
							}
						});
					});
				});
			})(mui);
			//加载首页数据这里是模拟ajax请求，请求完后赋值contentData就可以了
			this.menus[0].contentData = [{
				title: ''
			}, {
				title: ''
			}, {
				title: ''
			}, {
				title: ''
			}];
			//canvas背景
			this.init();
		//滑动切换		 		
        mui('.mui-slider').slider();
    //模拟图片ajax加载
        setTimeout(function(){
        	that.lazyImg = imgS
        },3000)
		},
		components: {},
		methods: {
			init() {
				var getW = document.getElementById('banner');
				var myCanvas = document.getElementById('myCanvas');
				var ctx = myCanvas.getContext('2d');
				var mW = myCanvas.width = getW.clientWidth
				var mH = myCanvas.height = getW.clientHeight
				function drawLine(x, y, color, type) {
					//ctx.clearRect(0,0,mW,mH);
					ctx.beginPath();
					ctx.lineCap = 'round'
					ctx.lineJoin = 'round'
					if(type) ctx.moveTo(0, mH / 2);
					if(!type) ctx.moveTo(mW, mH / 2);
					ctx.lineWidth = 1;
					ctx.lineTo(x, y);
					ctx.strokeStyle = color
					ctx.stroke();
					ctx.beginPath();
					ctx.lineWidth = 5;
					if(type) ctx.lineTo(x + 2, y);
					if(!type) ctx.lineTo(x - 2, y);
					ctx.stroke()
				}
				drawLine(mW / 10, mH / 2, '#d19213', true);
				drawLine(mW / 10 * 9, mH / 2, '#d19213')
				document.getElementById('banner').style.backgroundImage = 'url("' + myCanvas.toDataURL() + '")';
			},
			tabDown(index, self) {
				//下拉刷新数据这里是模拟ajax请求，请求完后赋值contentData就可以了
				console.log('刷新获取子项：' + index + '获取对象：' + self);
				var data = [{
						name: '刷新内容1'
					},
					{
						name: '刷新内容2'
					}
				];
				this.tabsOne = this.tabsOne.concat(data);
				mui.toast(this.menus[index].name + '已刷新')
				setTimeout(function() {
					self.endPullDownToRefresh();
				}, 500)
			},
			tabUp(index, self) {
				//上拉加载更多数据这里是模拟ajax请求，请求完后赋值contentData就可以了
				console.log('下拉获取子项：' + index + '获取对象：' + self)
				var data = [{
						name: '加载内容1'
					},
					{
						name: '加载内容2'
					}
				];
				this.tabsOne = this.tabsOne.concat(data)
				mui.toast(this.menus[index].name + '已加载')
				setTimeout(function() {
					self.endPullUpToRefresh();
				}, 1000)
			},
			changeTab(e) {
				var that = this;
				var index = e.detail.slideNumber;
				this.setIndex = index
				//加载初次数据这里是模拟ajax请求，请求完后赋值contentData就可以了
				if(index >= 0) {
					app.Vwaiting('加载中...')
					setTimeout(function() {
						app.Cwaiting()
						that.menus[index].contentData = [{
								name: '1'
							},
							{
								name: '1'
							}, {
								name: '1'
							}, {
								name: '1'
							}
						];
						document.querySelectorAll('.mui-pull-bottom-wrapper')[index].style.display = 'block';
					}, 1000)
				}
			},
			showPopover() {
				if(this.classChange == 'icon-30-copy') {
					this.classChange = 'icon-6';
					this.IsShow = true
				} else {
					this.classChange = 'icon-30-copy';
					this.IsShow = false
				}
			},
			setIdex(index) {
				var vm = this;
				this.setIndex = index;
				mui('#slider').slider().gotoItem(index);
				//关闭菜单
				setTimeout(function() {
					vm.showPopover()
				}, 500)
			},
			alert(index, e) {
				this.setIndex = index
				console.log('zheshi:' + index);
				console.log(e.target)
			}

		}
	}
</script>

<style>
	.mui-content,
	body,
	html {
		height: 100%!important
	}
	
	body {
		background: #fff;
		margin: 0 auto
	}
	
	.iconColor {
		color: #FF5E52
	}
	
	.mui-table-view .mui-media-object {
		line-height: 122px;
		max-width: 122px;
		height: 122px;
	}
	
	.mui-bar~.mui-content .mui-fullscreen {
		top: 44px;
		height: auto;
	}
	
	.mui-fullscreen {
		bottom: 50px;
	}
	
	.mui-pull-top-tips {
		position: absolute;
		top: -20px;
		left: 50%;
		margin-left: -25px;
		width: 40px;
		height: 40px;
		border-radius: 100%;
		z-index: 1;
	}
	
	.mui-bar~.mui-pull-top-tips {
		top: 24px;
	}
	
	.mui-pull-top-wrapper {
		width: 42px;
		height: 42px;
		display: block;
		text-align: center;
		background-color: #efeff4;
		border: 1px solid #ddd;
		border-radius: 25px;
		background-clip: padding-box;
		box-shadow: 0 4px 10px #bbb;
		overflow: hidden;
	}
	
	.mui-pull-top-tips.mui-transitioning {
		-webkit-transition-duration: 200ms;
		transition-duration: 200ms;
	}
	
	.mui-pull-top-tips .mui-pull-loading {
		/*-webkit-backface-visibility: hidden;
				-webkit-transition-duration: 400ms;
				transition-duration: 400ms;*/
		margin: 0;
	}
	
	.mui-pull-top-wrapper .mui-icon,
	.mui-pull-top-wrapper .mui-spinner {
		margin-top: 7px;
	}
	
	.mui-pull-top-wrapper .mui-icon.mui-reverse {
		/*-webkit-transform: rotate(180deg) translateZ(0);*/
	}
	
	.mui-pull-bottom-tips {
		text-align: center;
		background-color: #efeff4;
		font-size: 15px;
		line-height: 40px;
		color: #777;
	}
	
	.mui-pull-top-canvas {
		overflow: hidden;
		background-color: #fafafa;
		border-radius: 40px;
		box-shadow: 0 4px 10px #bbb;
		width: 40px;
		height: 40px;
		margin: 0 auto;
	}
	
	.mui-pull-top-canvas canvas {
		width: 40px;
	}
	
	.mui-slider-indicator.mui-segmented-control {
		background-color: #efeff4;
	}
	
	.mui-slider .mui-slider-group .mui-slider-item>a:not(.mui-control-item) {
		display: inline;
	}
	
	.mui-slider .mui-segmented-control.mui-segmented-control-inverted~.mui-slider-group .mui-slider-item {
		border-top: none;
		border-bottom: none
	}
	
	.mui-slider .mui-slider-group .mui-slider-item img {
		width: 100%;
		height: 125px;
	}
	
	.mui-slider-indicator .mui-indicator {
		width: 10px;
		height: 2px;
		border-radius: 0;
		background: rgba(255, 255, 255, 0.5);
	}
	
	.mui-slider-indicator .mui-active.mui-indicator {
		background: #FF5E52;
	}
	
	.muiTab {
		height: auto
	}
	
	.muiTab .mui-table-view {
		height: 100%
	}
	
	.muiLi {
		width: calc(50% - 2px);
		border: 1px solid #e8e8e8;
		display: inline-block;
	}
	
	.muiLi:nth-child(2n) {
		margin-left: 4px
	}
	
	.mui-table-view-cell:after {
		background-color: rgba(255, 255, 255, 0);
	}
	
	.muiBadge {
		position: absolute;
		border-radius: 5px
	}
	
	.fontR {
		color: #FF5E52;
		font-size: 15px
	}
	
	.fontCard {
		color: #c1bcbc;
		font-size: 12px
	}
	
	.fontToday {
		color: #FF5E52;
		font-size: 15px;
		margin: 10px;
		margin-bottom: -10px
	}
	
	.fontTime {
		color: 333;
		font-size: 10px
	}
	
	.fontPro {
		font-size: 10px;
		color: #FF5E52;
		float: right;
		margin-right: 10px;
	}
	
	.muiMargin {
		margin-top: 24px
	}
	
	.muiIput input[type='search'] {
		width: calc(100% - 40px);
		margin: 5px;
		height: 24px;
		font-size: 12px;
		border-radius: 12px;
		background-color: rgba(78, 65, 65, 0.1);
	}
	
	.mui-search .mui-placeholder {
		text-align: left;
		font-size: 12px;
		line-height: 12px
	}
	
	.muiIput .mui-icon-search:before {
		font-size: 14px
	}
	
	.mui-search .mui-placeholder {
		top: 6px;
		right: 0;
		bottom: 0;
		left: 8px;
	}
	/*图标*/
	
	.shopping .icon-shangchangtubiao-6 {
		font-size: 24px
	}
	
	.shopping {
		position: absolute;
		top: 6px;
		right: 6px
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
		font-size: 10px
	}
	
	.pageTwo {
		text-indent: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.fontPro .icon-xiayibu {
		margin-left: 5px;
		font-size: 12px;
	}
	
	.viewBody {
		padding: 11px 15px
	}
	
	.mui-badge {
		padding: 6px 6px
	}
	
	.getCard {
		font-size: 10px;
		float: right;
		padding: 3px;
		height: 24px
	}
	
	#banner {
		position: relative;
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #111;
		margin: 3px 0px -3px 0px;
		border-bottom: 1px dashed #e8e8e8;
		background: rgba(255, 94, 82, 0.3) no-repeat;
	}
	
	#myCanvas {
		position: absolute;
		top: 0;
		left: 0
	}
	
	.icon-shangchangtubiao- {
		color: #bfae25
	}
	
	.icon-shangchangtubiao-7 {
		color: #ec6b5d
	}
	
	.icon-shangchangtubiao-14 {
		color: #36a955
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
		height: 100px
	}
	
	.mui-slider .mui-segmented-control.mui-segmented-control-inverted .mui-control-item {
		border-bottom: 2px solid #fff
	}
	
	.mui-slider .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
		color: #FF5E52;
		border-bottom: 2px solid #FF5E52
	}
	/*第二个样式*/
	
	.muiLi .mui-media-object {
		line-height: 122px;
		max-width: 100%;
		height: 122px;
	}
	
	.mui-pull-bottom-wrapper {
		display: none
	}
	
	#item1mobile .mui-pull-bottom-wrapper {
		display: block
	}
	
	.mui-segmented-control.mui-segmented-control-inverted {
		border: 0;
		border-radius: 0;
		width: calc(100% - 40px);
	}
	
	.checkHome {
		width: 40px;
		height: 38.5px;
		line-height: 38.5px;
		position: absolute;
		top: 33.5px;
		right: 0;
		text-align: center;
		background: #fff;
		z-index: 2;
		border-left: 1px dashed #f5efef;
	}
	
	.mui-slider-indicator.mui-segmented-control {
		background-color: #fff;
	}
	
	.mui-segmented-control .mui-control-item {
		line-height: 36px;
	}
	
	.hideMenus {
		visibility: hidden;
		width: 100%;
		height: auto;
		position: absolute;
		z-index: 9;
		background: rgba(255, 255, 255, 1)
	}
	
	.hideMenus ul li {
		float: left
	}
	
	.menuFont {
		height: 25px;
		line-height: 22px;
		text-align: center;
		margin: 7px;
		border-radius: 20px;
		padding: 1px 10px;
		border: 1px solid #d8d8d8;
		color: #333;
	}
	
	.changeCheck {
		color: #fff;
		background: #FF5E52;
		border: 1px solid #FF5E52
	}
	
	.TabMargin {
		margin-top: 8px
	}
	/*菜单显示和隐藏过渡效果*/
	
	.menuShow {
		visibility: visible;
		height: 117px;
		opacity: 1;
		transition: all 0.5s
	}
	
	.menuHidden {
		visibility: hidden;
		height: 0px;
		opacity: 0;
		transition: all 0.5s
	}
	
	.mui-pull-bottom-pocket .mui-pull-loading {
		background: #FF5E52
	}
	/*加载样式修改*/
	
	.loadingImages {
		display: inline-block;
		width: 100%;
		height: 40px;
		background: url(../../../statics/images/loading2.gif) no-repeat center center;
		background-size: cover
	}
	
	.mui-pull-bottom-tips {
		background-color: #f0ad4e;
		color: #eeefdd;
	}
 /*img[lazy=loading] {
  background: url(../../../statics/images/loading.gif) no-repeat center center;
  background-size: cover
  }
  img[lazy=error] {
  background: url(../../../statics/images/loading.gif) no-repeat center center;
  background-size: cover
  }*/
  .biqiang{
  	background:#fff;
  	height:1.2rem;
  	line-height:1.2rem
  }
.mui-table-view.mui-grid-view .repairPadding{
  	padding-top:5px
  }
</style>