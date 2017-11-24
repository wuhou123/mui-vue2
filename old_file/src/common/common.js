/**
 * 时间：2016-08-11
 * 描述：app公用方法
 */
if (window.Raven) Raven.config('https://8e17a7c1ccb44b50991a96e8f56eb8e3@sentry.io/158100').install()  //收集错误
!(function(mui) {
	'use strict';
	window.app = window.app || {};
	//配置
	app.config = {
		isDebug: true, //是否调试模式，发布时为false（发布时一定要改为false）
		imgDomain: '', //图片资源域名
		apiDomain: 'http://che.ijiashequ.cn:8088/api', //API服务器域名
		flag: '9', //app身份标志,代表不同的客户
		dbName: 'comBirdshCheways', //本地存储数据库名称
		SMS: {
			upperlimit: 3, //找回密码短信发送次数上限
			seconds: 60 //发送间隔时间
		},
		alarm: {
			1: '超速报警',
			2: '终端主电源欠压',
			3: '终端主电源掉电',
			4: '移位报警',
			5: '震动报警',
			6: 'SOS报警',
			7: '鞍座报警',
			8: '碰撞告警',
			9: '喇叭告警',
			10: '终端主电源欠压',
			11: '动态侧翻',
			12: '静态侧翻',
			91: '电子围栏报警',
			99: '超级报警',
			100: '失窃报警',
			200: 'APP SOS报警',
		}
	};

	if(app.config.isDebug) {
		app.config.apiDomain = 'http://che.ijiashequ.cn:8010/loveApi';
		//app.config.apiDomain = 'http://che.ijiashequ.cn:8007/loveApi'; //API外网测试
		//app.config.apiDomain = 'http://192.168.33.241:8085/loveApi'; //API内网测试
		//app.config.apiDomain = 'http://192.168.33.81/loveApi'; //API吴长
		//app.config.apiDomain ='http://192.168.33.152:8088/api';//API刘本地
		//app.config.apiDomain ='http://192.168.33.93:8080/api';//API郑本地
		//app.config.apiDomain = 'http://192.168.33.77:8007/loveApi'; //API裴本地公版
		//app.config.apiDomain = 'http://192.168.33.114/api';//谢API本地
		//app.config.apiDomain = 'http://192.168.33.92:8080/api'; //张磊测试
	}
	//常用正则表达式
	app.Reg = {};
	app.Reg.MODULE_NAME = /([\w-]+)\.html/; //匹配模块名
	app.Reg.HTTP_URL = /^((https|http)?:\/\/)/; //校验http url
	app.Reg.IS_MOBILE = /^1[3|4|5|7|8]\d{9}$/; //手机号码
	app.Reg.EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱
	//所有api接口 http://192.168.33.8:7070/svnpro/weixin/car_guard/doc/车卫士通用版业务接口.doc
	app.api = {
		'getcaruserinfo': '/carguard/user/getCarUserInfo.do', //?name=030650611(车辆用户信息)
		'updatecaruserinfo': '/carguard/user/updateCarUserInfo.do', //?id=16775&num=15001914584&name=德忠
		'getcarusermap': '/carguard/user/getCarUserMapInfo.do', //?name=030619991(首页地理位置+幻灯片宣传信息)
		'getRealTimePosition': '/cheway/point/getRealTimePosition.do', //?cid=030650611(获取实时位置信息)
		'getcardaydistance': '/carguard/user/getCarTance.do', //?cid=030619991(今日历程<单位：千米>)
		'getlastwarninfo': '/carguard/warn/searchLastWarn.do', //?name=030619991(告警记录列表)
		'getwarninfo': '/carguard/warn/searchWarn.do', //?name=030619991&lastId=11111<告警最大内码>(告警记录列表)
		'setwarninfo': '/carguard/warn/setCarWarnByHaved.do', //?id=4907999(设置已读的告警记录)
		'getAlertsRecord': '/cheway/alert/getAlertsRecord.do', //获取一天的告警记录列表
		'saveSuperCare': '/carguard/other/saveSuperCare.do', //?cid=030619991&val=0<0 撤防 1 设防>(设置超级设防和撤防状态)
		'getSuperCare': '/carguard/other/getSuperCare.do', //?cid=030619991(獲取超级设防和撤防状态)
		'saveNormalCare': '/carguard/other/saveNormalCare.do', //?cid=030619991&type=0<0:设防,1:撤防>(设置设防和撤防状态)
		'getNormalCare': '/carguard/other/getNormalCare.do', //?cid=030619991(獲取设防和撤防状态)
		'getFances': '/cheway/fances/getFances.do', //根据设备id和类型获取电子围栏信息，参考接口.doc
		'uadateFances': '/cheway/fances/saveOrUpdateFances.do', //编辑电子围栏，参考接口.doc
		'getCarUserAddr': '/carguard/user/getCarAddrByPosition.do', //?lat=31.2486683708529&lng=121.414342818832
		'getCheList': '/carguard/user/cheList.do', //?name=上海业务
		'updatePassword': '/carguard/user/updateCarUserInfo.do',

		'validateByCodeForRes': '/cheway/mobibinding/validateByCodeForRes.do', //判断验证码是否失效信息
		'updateMobiValidateByMobi': '/cheway/mobibinding/updateMobiValidateByMobi.do', //生成手机验证码信息并验证手机号是否绑定设备
		'validateOper': '/cheway/device/validateOper.do', //手机激活操作
		'getDevicesByMobi': '/cheway/mobibinding/getDevicesByMobi.do', //根据手机号获取设备列表
		'updateMobiValidate': '/cheway/mobibinding/updateMobiValidate.do', //生成手机验证码信息
		'resetDevicePwd': '/cheway/device/updatePassword.do', //?device=030650637&pwd=1234567//重置密码操作

		'getWeather': '/cheway/login/getWeather.do', //?cityCode= 获取天气
		'getHomepageInfo': '/cheway/login/getHomepageInfo.do', //获取首页数据
		'postSafeTcpcmds': '/cheway/login/postSafeTcpcmds.do', //撤防设防 safeFlag 0表示撤防操作，1表示设防操作

		'getTrackOneDay': '/cheway/point/getDrivRecordOfOneDay.do', //参考接口文档8.6 根据日期获取某一天的历史轨迹(各条行驶记录)
		'getPointByRecord': '/cheway/point/getPointInfoByOneDrivRecord.do', //参考接口文档8.7 根据起点时间和终点时间，返回行使记录里详细的坐标点位信息
		'getLastRecord': '/cheway/point/getLastDrivRecord.do', //参考接口文档8.8 获取最新的行使轨迹
		//我的
		'getUserInfo': '/cheway/device/getUserInfo.do', //获取个人信息
		'updateInfo': '/cheway/device/updateInfo.do', //修改个人信息
		'addChewaysFeedbackInfo': '/cheway/feedback/addChewaysFeedbackInfo.do', //添加意见反馈
		'editPhoto': '/cheway/login/editPhoto.do', //修改头像
		'update': '/update/ty/'+localStorage.appId+'.json', //更新信息
		//服务
		'getParamsAll': '/cheway/params/getParamsAll.do', //获取设备参数
		'getParamsName': '/cheway/params/getParamsName.do', //获取设备参数
		'postTcpcmds': '/cheway/tcpcmds/postTcpcmds.do', //下发指令
		'postAndGetTcpcmds': '/cheway/tcpcmds/postAndGetTcpcmds.do', //下发指令并获取结果
		'getTcpcmds': '/cheway/tcpcmds/getTcpcmds.do', //根据id获取指令数据
		'getInsuranceinfo': '/carguard/user/getInsuranceInfo.do', //(获取保险列表信息)
		'getInsuranceDetailInfo': '/carguard/user/getInsuranceDetailInfo.do', //?insurancesId=10<提供保险id>(获取保险详细信息)		
		'getRepairStationinfo': '/carguard/user/getRepairStationInfo.do', //?stationFlag=标识 1:维修 2:安装 (不传查全部)&myLat=(传当前设备的纬度)&myLng=(传当前设备的经度) (获取维修站列表信息)

		//驾驶统计
		'getDriverCountNew': '/cheway/point/getDriverCountNew.do', //(获取保险列表信息)
		'getAppraisals': '/cheway/point/getAppraisalsTwo.do', //(获取驾驶测评结果)

		//告警记录
		"devicePush": "/cheway/push/carDevicePush.do",

		//v2
		'newValidate': '/cheway/device/newValidateOper.do', //管理员激活
		'sosAlert': '/cheway/alert/sosAlert.do', //sos
		'controlcar': '/cheway/newCmds/lock.do', //远程控车锁车
		'vibrationalarm': '/cheway/newCmds/shake.do', //远程控车震动报警
		'oil': '/cheway/newCmds/gas.do', //远程控车油路
		'getStatus': '/cheway/newCmds/getStatus.do', //远程初始
		'addMyCollect': '/cheway/collect/addMyCollect.do', //收藏维修点
		'queryCollectForPage': '/cheway/collect/queryCollectForPage.do', //查询收藏的维修点
		'deleteMyCollect': '/cheway/collect/deleteMyCollect.do', //取消收藏维修点
		'getCollectUniId': '/cheway/collect/getCollectUniIdByDev.do', //获取所有收藏点的id
		'login': '/cheway/login/setToken.do', //?name=030619991&pwd=123456(登录)
		'mineUpdatePassword': '/cheway/pwd/update.do', //个人信息修改密码
		'getAlertTypeSpeed': '/cheway/setalarm/getAlertTypeSpeed.do', //超速报警操作
		'getAlertTypeSpeeds': '/cheway/setalarm/getAlertTypeSpeeds.do', //显示超速预警操作
		'getDeviceCar': '/cheway/device/getDeviceCar.do', //获取车辆信息
		'getDevs': '/cheway/devPhone/getDevs.do', //根据手机号获取全部设备号
		'autoLogin': '/cheway/login/autoLogin.do', //自动登录接口
		'getValiNumByMobil': '/cheway/mobibinding/getValiNumByMobil.do', //获取验证码剩余次数
		'sendMobiValidate': '/cheway/mobibinding/sendMobiValidate.do', //获取验证码
		'mobinding': '/cheway/mobibinding/mobiPhoneBinding.do', //手机绑定
		'putBgPhoto': '/cheway/login/putBgPhoto.do', //背景图修改
		'switchDev': '/cheway/mobibinding/switchDev.do', //根据设备号切换设备
		'getSubDep': '/cheway/department/getSubDep.do', //根据车队名称获取该组织下的车队集合
		'getSubDepDevices': '/cheway/department/getSubDepDevices.do', //根据车队名称获取该组织下的车队集合以及设备集合
		'getHabit': '/cheway/loveCar/getHabit.do', //获得驾驶习惯
		'getLastMileage': '/cheway/loveCar/getLastMileage.do', //获得最新行程数据
		'getLastAutoTime': '/cheway/loveCar/getLastAutoTime.do', //获得实时监控数据
		'updatePush': '/cheway/alert/updatePush.do', //修改报警推送设置
		'getPush': '/cheway/alert/getPush.do', //获取报警推送设置
		'package': '/cheway/share/getshareByPlatform.do', //获取分享apk地址
		'decideGetPush': '/cheway/alert/decideGetPush.do', //判断设备是否有推送设置并修改
		'getCombo': '/cheway/setMeal/getMeal.do', //获取套餐
		'buildOrder': '/cheway/setMeal/buildOrder.do', //生成订单
		'online': '/cheway/online/online.do', //在线统计
		'findOrder': '/cheway/setMeal/findOrder.do', //获取交易记录
		'updateOrderNumCancle': '/cheway/setMeal/updateOrderNumCancle.do', //用户取消订单支付
		'saveDownloadMessage': '/cheway/download/saveDownloadMessage.do', //保存下载量信息
		'activationDate': '/cheway/login/activationDate.do', //接口试用期信息
		'calibrationMileage': '/cheway/auto/putAllCourseCount.do', //校准里程
		'famQuestion': '/cheway/question/queryQuestionForPage.do', //常见问题
		'typeQuestion': '/cheway/question/getQuestionType.do', //问题类型
		
		//注册
		'phoneRegister': '/cheway/phone/phoneRegister.do',
		'getVerCode': '/cheway/phone/getVerCode.do',
		'changePsd': '/cheway/phone/changePsd.do',

		//我的车库
		'getDeviceCars': '/cheway/device/getDeviceCars.do',
		'editDevAndPhoto': '/cheway/phone/editDevAndPhoto.do',
		'bindDevAndPhoto': '/cheway/phone/bindDevAndPhoto.do',
		
		//忘记密码/设备号
		'getFindPsd': '/cheway/phone/getFindPsd.do',
		
		//指令相关
		'getStatusThree': '/cheway/newCmds/getStatusThree.do',  //查询
		'commentTcpcmds': '/cheway/tcpcmds/commentTcpcmds.do',  //下发
		
		//用户信息
		'putChangePhone': '/cheway/phone/putChangePhone.do',  //修改绑定手机
	};
	
	app.cmds = { //蓝牙指令
		lockCar: 'C9050108000008',
		unlockCar: 'C9050100000008',
		defenceCar: 'C9050101000001',
		undefenceCar: 'C9050100000001',
		accCar: 'C9050120000020',
		unaccCar: 'C9050100000020',
	};
	//若api接口不是以http或者https开头，则拼接配置中的apiDomain为开头
	for(var i in app.api) {
		if(!app.Reg.HTTP_URL.test(app.api[i])) app.api[i] = app.config.apiDomain + app.api[i];
	}
	//假json数据
	//	app.api['validateByCodeForRes']="http://192.168.33.53:8020/cheways_wechat/data/validateByCodeForRes.json";
	//	app.api['getDevicesByMobi']="http://192.168.33.53:8020/cheways_wechat/data/getDevicesByMobi.json";
	var skipAPI = [app.api['login'], app.api['validateOper'], app.api['updateMobiValidateByMobi'], app.api['resetDevicePwd'], app.api.switchDev, app.api.decideGetPush, app.api.newValidate].join(','); //ajax中不传cid参数的api

	/**
	 * 日志打印
	 */
	app.log = function() {
		if(app.config.isDebug && console) {
			for(var key in arguments) {
				if(mui.isObject(arguments[key])) {
					arguments[key] = JSON.stringify(arguments[key]);
				}
			}
			console.log.apply(console, arguments);
		}
	};

	/**
	 * 显示等待框
	 * @param {String} message
	 */
	app.Vwaiting = function(msg){
		var relMsg = msg?msg:''
		if(document.getElementById('loaderWrap')){
		document.getElementById('loaderWrap').style.display = 'block';
		document.querySelector('.msg-font').innerText = relMsg
		return;
		}
		var screen = document.createElement("div");
		screen.id = 'loaderWrap';
		screen.className = 'loader-wrap';
		screen.innerHTML = '<div class="loader-container"><div class="loader"></div><span class="msg-font">'+relMsg+'</span></div>';
		document.body.appendChild(screen);
	}
	app.Cwaiting = function(){
		console.log('进行了:'+document.getElementById('loaderWrap'))
		if(document.getElementById('loaderWrap')){
			document.getElementById('loaderWrap').style.display = 'none'
		}
	}
	app.showWaiting = function(message) {
		if(window.plus) {
			return plus.nativeUI.showWaiting(message || '请稍候...');
		}
	};
	/**
	 * 关闭等待框
	 */
	app.closeWaiting = function(waitingObj) {
		if(window.plus)(waitingObj && waitingObj.close()) || plus.nativeUI.closeWaiting();
	};
	//是否显示加载框，默认不显示
	mui.ajaxSettings.showWaiting = false;
	/**
	 * ajax方法
	 * @param {Object} setting
	 */
	app.ajax = function(setting) {
		var defaultSetting = {
			dataType: setting.dataType || 'json', //服务器返回json格式数据
			type: (setting.url.lastIndexOf('.json') > -1 ? 'get' : (setting.type || 'post')),
			timeout: setting.timeout || 15000, //超时时间设置为15秒；
			async: true,
			showWaiting: setting.showWaiting || false,
			success: function(resp, status, xhr) {
				app.log(/\/([\w\.]+)$/.exec(setting.url)[1] + '返回数据:' + JSON.stringify(resp));
				switch(resp.flag) {
					case '2000':
						mui.isFunction(setting.success) && setting.success(resp.result, resp.message);
						break;
					case '777': //token自动续期
						app.ajax({
							url: app.api['login'],
							data: JSON.parse(localStorage.lastLogin),
							success: function(data) {
								if(data.contents == '3') { //未激活
									localStorage.activateToken = data['access_token'];
									app.closeWaiting();
									mui.confirm('您的设备未激活', '', ['试用', '去激活'], function(e) {
										if(e.index == 0) {
											userLogin(data);
										} else if(e.index == 1) {
											vm.openWindow({ url: '../activate/activate.html', styles: { top: 0 } });
										}
									});
								} else if(data.contents == '4') {
									localStorage.activateToken = data['access_token'];
									app.closeWaiting();
									mui.alert('您的设备未激活', '', '去激活', function(e) {
										if(e.index == 0)
											vm.openWindow({ url: '../activate/activate.html', styles: { top: 0 } });
									});
								} else {
									userLogin(data);
								}

								function userLogin(data) {
									if(localStorage.adminToken != null)
										localStorage.adminToken = data['access_token'];
									else localStorage.token = data['access_token'];
									app.ajax(setting);
								}
							},
							error: function() {
								if (window.plus) mui.fire(plus.webview.getWebviewById('browser_main'), 'logout');
							}
						});
						break;
					case '401':
					case '200':
					case '204':
					case '400':
					case '404':
					case '429':
					case '500':
					default:
						if(resp.message != '访问过于频繁')
							mui.toast(resp.message);
						mui.isFunction(setting.error) && setting.error(resp.result);
						break;
				}
			},
			complete: function(xhr, status) {
				if(setting.showWaiting && setting.closeWaiting != false) {
					app.closeWaiting();
				}
				var resp = xhr.response;
				if(status === 'success' && defaultSetting.dataType.toLowerCase() === 'json') {
					resp = JSON.parse(resp);
				}
				if(typeof setting.complete == 'function') setting.complete(resp);
			},
			error: function(xhr, type, errorThrown) {
				var errorMsg = {
					'timeout': '请求超时，请稍后再试！',
					'error': '未知错误',
					'abort': '网络或服务器已断开',
					'parsererror': '解析错误'
				};
				if(type != 'abort') mui.toast((errorMsg[type] || 'ajax出错了'));
				if(typeof setting.error == 'function') setting.error(xhr, type, errorThrown);
			}
		};
		setting.beforeSend && (defaultSetting.beforeSend = setting.beforeSend);
		defaultSetting.data = setting.data || {};

		if(setting.url && skipAPI.indexOf(setting.url) == -1 && !defaultSetting.data.cid) {
			var user = app.getUser();
			user && (defaultSetting.data.cid = user.uid);
		}
		for (var i in defaultSetting.data) {
			if (defaultSetting.data[i]==null) delete defaultSetting.data[i];
		}
		defaultSetting.headers = {
			flag: app.config.flag,
		};
		if(localStorage.adminToken != null) {
			defaultSetting.headers.token = localStorage.adminToken;
		} else if(localStorage.token != null) {
			defaultSetting.headers.token = localStorage.token;
		}
		if(setting.headers) mui.extend(true, defaultSetting.headers, setting.headers);
		if(setting.showWaiting) app.showWaiting(typeof setting.showWaiting === 'string' ? setting.showWaiting : undefined);
		app.log('token:' + defaultSetting.headers.token);
		app.log('正在请求api:' + setting.url);
		app.log('发送数据:' + JSON.stringify(defaultSetting.data));
		mui.ajax(setting.url, defaultSetting);
	};

	/**
	 * 退出登录
	 */
	app.loginOut = function() {
		localStorage.removeItem('userData');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('encrypt');
		localStorage.removeItem('avatarCache');
		localStorage.removeItem('homeCache');
		localStorage.removeItem('encrypt');
		localStorage.removeItem('adminToken');
		localStorage.removeItem('activateToken');
		localStorage.removeItem('lastCheckPay');
		mui.openWindow({
			url: '../login/login.html',
			id: 'login',
			styles: {
				'popGesture': 'none'
			}
		});
		//location.href = '../login/login.html';
		//mui.back();
	};
	app.hasNoDev = function() {  //是否未绑定车辆
		return app.getUser().role && !app.getUser().uid;
	}
	/**
	 * 获取User
	 */
	app.getUser = function() {
		return JSON.parse(localStorage.user || '{}');
	};

	/**
	 * 传入设备号,返回设置(不传入时默认获取)
	 * @param {String} uid
	 */
	app.getConfig = function(uid) {
		uid = (uid ? uid : app.getUser().uid);
		//var _Config = window.plus ? plus.storage.getItem("appConfig") : localStorage.appConfig,
		var _Config = window.plus ? plus.storage.getItem("appConfig") : localStorage.appConfig,
			defaultConfig = {
				"refresh_interval": "60",
				"alert_msg": {
					count: 0,
					data: {}
				},
				"wavealert_msg": []
			};
		if(!_Config) return defaultConfig;
		else {
			_Config = JSON.parse(decodeURIComponent(_Config));
			return _Config[uid] || defaultConfig;
		}
	}
	/**
	 * 传入设备号和设置对象,持久化到本地(可只传入设置对象)
	 * @param {String} uid
	 * @param {Object} config
	 */
	app.setConfig = function() {
		var uid = arguments[0],
			config = arguments[1];
		if(typeof uid === "object") {
			config = uid;
			uid = app.getUser().uid;
		}
		var _temp = app.getAllConfig();
		_temp[uid] = config;
		window.plus ? plus.storage.setItem("appConfig", encodeURIComponent(JSON.stringify(_temp))) : (localStorage.appConfig = encodeURIComponent(JSON.stringify(_temp)));
		//window.plus ? plus.storage.setItem("appConfig", encodeURIComponent(JSON.stringify(_temp))) : (localStorage.appConfig = encodeURIComponent(JSON.stringify(_temp)));
	};
	app.getAllConfig = function() {
		var _AllConfig = plus.storage.getItem("appConfig");
		return _AllConfig ? JSON.parse(decodeURIComponent(_AllConfig)) : {};
	};
	/**
	 * 获取user头像src
	 */
	app.getUserIcon = function() {
		return localStorage.getItem('userIcon');
	};
	/**
	 * 设置user头像src
	 */
	app.setUserIcon = function(newIcon) {
		localStorage.setItem('userIcon', newIcon);
	};
	//将Date转为日期字符串
	app.getDateString = function(d) {
		var month = String(d.getMonth() + 1);
		if(month.length == 1) month = '0' + month;
		var dt = String(d.getDate());
		if(dt.length == 1) dt = '0' + dt;
		return d.getFullYear() + '-' + month + '-' + dt;
	}
	//绑定pagebeforeshow事件（浏览器、app通用）
	app.pageBeforeShow = function(f) {
		if(mui.os.plus) {
			window.addEventListener('pagebeforeshow', f);
		} else {
			f();
		}
	}
	//仅当支持蓝牙并已连接时返回true，否则提示并返回false
	//noToast: 为true时禁用提示
	app.testBle = function(noToast) {
		if (localStorage.hasBle == 'false') {
			if (!noToast) mui.toast('您的设备不支持蓝牙');
			return false;
		} else if (localStorage.bleStatus == '4') {
			return true;
		} else {
			if (!noToast) mui.toast('蓝牙未成功连接');
			return false;
		}
	}
	//通过蓝牙发送数据给设备
	app.sendBle = function(s) {
		mui.fire(plus.webview.all()[0], 'bleSend', s);
	}

	Date.prototype.format = function(format) {
		var o = {
			'M+': this.getMonth() + 1, //month
			'd+': this.getDate(), //day
			'h+': this.getHours(), //hour
			'H+': this.getHours(), //hour
			'm+': this.getMinutes(), //minute
			's+': this.getSeconds(), //second
			'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
			'S': this.getMilliseconds() //millisecond
		};
		if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
			(this.getFullYear() + '').substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp('(' + k + ')').test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					('00' + o[k]).substr(('' + o[k]).length));
		return format;
	};
	//方便读取配置
	Object.defineProperty(window, 'lsConfig', {
		get: function() {
			return JSON.parse(localStorage.config||'{}');
		}
	});

	if(typeof Vue !== 'undefined') {
		//Vue.config.debug = app.config.isDebug || false;
		Vue.prototype.openWindow = function(options) {
			if(typeof options == 'string') options = { url: options };
			if(!options || !options.url) {
				mui.alert('敬请期待');
				return;
			}
			//外部页面使用内置浏览器打开
			if(app.Reg.HTTP_URL.test(options.url)) {
				var browserMainWebview = plus.webview.getWebviewById('browser_main');
				var browserWebview = plus.webview.getWebviewById('browser');
				mui.fire(browserMainWebview, 'pagebeforeshow');
				browserWebview.loadURL(options.url);
				browserMainWebview.show('slide-in-bottom', 400);
				return;
			}
			if (app.hasNoDev() && options.url.indexOf('my-cars')==-1 && options.url.indexOf('edit-car')==-1 && options.url.indexOf('about')==-1 && options.url.indexOf('user-agreement')==-1) {  //未绑定车辆的用户
				mui.alert('请先绑定车辆');
				return;
			}
			options.styles = mui.extend({
				'popGesture': 'none',
				'top': parseFloat(localStorage.immersed),
				'bottom': 0,
			}, options.styles);
			options.id = options.id || options.url.match(app.Reg.MODULE_NAME)[1];
			options.show = {
				aniShow: 'slide-in-right'
			}
			console.log(JSON.stringify(options));
			mui.openWindow(options);
		}
		//获取数字的小数部分(两位)
		Vue.prototype.toFrac = function(d) {
			var f = d * 100 % 100;
			if(f < 10) return '.0' + f;
			else return '.' + f;
		}
		Vue.prototype.openModule = function(m) {
			Vue.prototype.openWindow({url: '../'+m+'/'+m+'.html'});
		}
	}

	//解决低端安卓mui-btn的视觉反馈会延迟300ms
	Vue.component('fast-button', {
		props: ['id', 'disabled', 'tap'],
		template: '<button :id="id||\'id\'+Math.floor(Math.random()*1000)" :disabled="disabled" @tap="tap" @touchstart="ts" @touchend="te" @touchcancel="te" class="mui-btn mui-btn-primary mui-btn-block"><slot></slot></button>',
		methods: {
			ts: function(e) {
				e.currentTarget.classList.add('mui-active');
			},
			te: function(e) {
				var t = e.currentTarget;
				setTimeout(function() {
					t.classList.remove('mui-active');
				}, 100);
			}
		}
	});
	//公共头部
	Vue.component('app-header', {
		template: '<header class="mui-bar mui-bar-nav"><a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a><h1 class="mui-title"><slot></slot></h1></header>',
	});
})(mui);
/**
 * 构造新用户
 * @param {string} uid 设备号
 * @param {string} role 普通用户为nomal,管理员为admin
 */
window.User = function (uid, role, clink) {
	this.uid = uid;
	this.role = role || 'normal';
	this.clink = clink || '';
}
User.prototype.toString = function() {
	return JSON.stringify(this);
}
//信鸽推送
