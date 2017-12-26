<template lang='pug'>
	div
		#p 位置:
			span(v-text="positonVal")
		#mapAmap
</template>

<script>
	import mui from 'static/js/mui'
	import logo from './img/map_logo.png'
	export default{
		data(){
			return{
			Amap:''	,
			positonVal:'获取中...',
			androidV:''
			}
		},
		mounted(){
			var that = this;
			setTimeout(function(){			
			that.initAmap();
			//定位
			mui.plusReady(function(){
				console.log('ready')
				that.refreshPeoplePosition();				
			})				
			},1000)
		},
		methods:{
			initAmap:function(){
				var that = this;
			  this.Amap = new AMap.Map('mapAmap', {
			    resizeEnable: true,
			    rotateEnable:true,
			    pitchEnable:true,
			    zoom: 17,
			    pitch:80,
			    rotation:-15,
			    viewMode:'3D',//开启3D视图,默认为关闭
			    buildingAnimation:true,//楼块出现是否带动画
			    
			    expandZoomRange:true,
			    zooms:[3,20],
			    center:[121.4,31.25]
			  });
			  that.Amap.addControl(new AMap.ControlBar({
			    showZoomBar:false,
			    showControlButton:true,
			    position:{
			      right:'10px',
			      top:'70px'
			    }
			  }))  	
			  
			},
			refreshPeoplePosition(){
				var that = this;
				plus.geolocation.getCurrentPosition(function(position) {
					console.log('位置1：'+JSON.stringify(position))
					console.log(position.addresses)
					if(position.addresses == null) {
						mui.toast('获取手机位置失败，请打开网络');
						return;
					}
					if(position.coords.accuracy > 1000) {
						mui.toast('请打开定位以获取精确位置');
						return;
					}
					//显示地点
					that.positonVal = position.addresses;
					var clickS = position.coords.longitude+','+position.coords.latitude
					if(MtaH5){
						MtaH5.clickStat('1001',{'1002':clickS})	
					}					
					var pos = [position.coords.longitude, position.coords.latitude]
					that.showPosition(pos)
				}, function(e) {
					console.log('错误信息'+JSON.stringify(e))
					if(mui.os.android) {
						if(!that.getGPS_status_android()) {
							mui.toast('请打开定位');
						} else if(e.code == 1 || plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE)
							mui.toast('定位权限被拒绝，请去权限管理打开');
						else
							mui.toast('获取手机位置失败');
					} else
						mui.toast('获取手机位置失败');
				}, {
					provider: 'amap',
					timeout: 5000,
					maximumAge: 15000,
					coordsType:'gcj02'
				});
							
			},
			getGPS_status_android(){
				var context = plus.android.importClass("android.content.Context");
				var locationManager=plus.android.importClass("android.location.LocationManager");
				var main = plus.android.runtimeMainActivity();
				var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
				return mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);				
			},
			getGPS_status_ios(){
				var CLLocationManager = plus.ios.import("CLLocationManager");
				var authorizationStatus = CLLocationManager.authorizationStatus();
				return authorizationStatus >= 3;
			},
			showPosition(info){
				//检测chrome版本
				if(!this.androidV){
					this.androidV = navigator.userAgent.split('Chrome/')[1].slice(0,2)?navigator.userAgent.split('Chrome/')[1].slice(0,2):'';
					console.log('版本'+this.androidV)
				if(this.androidV<=55){					
					mui.alert('检测到手机系统webView版本较低，3D地图可能体验较差', '提示', '我知道了', function() {});	
				}
				}				
				this.Amap.setCenter([info[0],info[1]]);
			    var marker = new AMap.Marker({
			        map: this.Amap,
					position: [info[0],info[1]],
			        icon: new AMap.Icon({            
			            size: new AMap.Size(33, 40),  //图标大小
			            image: logo,
			            imageSize:new AMap.Size(33,40)
			        })        
	    		});
	 		    new AMap.Marker({
			        map: this.Amap,
					position: [info[0],info[1]],
					content: '<div class="ellipse"></div>',//自定义点标记覆盖物内容
			        offset: new AMap.Pixel(8,15) //相对于基点的偏移位置
	    		});
			    //点击图标
	           AMap.event.addListener(marker, 'click', function() {
					mui.alert('获取到您的位置信息了', '提示', '我知道了', function() {});
	        });				
			}
		}
	}
</script>

<style scoped>
	#mapAmap{
		width:100%;
		height:100%;
		position:absolute;
		top:0;
		bottom:0
	}
	#p{
	    position: absolute;
	    top: 50px;
	    left: 20px;
	    z-index: 9;		
	}
/*	消除logo*/
	#mapAmap .amap-logo{
		display:none;
		visibility:hidden;
	}
	.amap-copyright{
		display:none;
		visibility:hidden !important
	}
</style>