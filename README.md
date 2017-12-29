## mui-vue2
基于mui+vue2.x的H5 APP项目,页面视图全部都是html5页，不是嵌入app原生页面，项目可以直接运行在PC上调试，也可以在hbuilder上真机调试，可以直接下载安装[点此链接APP下载](https://www.pgyer.com/jia123)。 

**这是升级到vue2.x和webpack再重新配置成单页面app  ， 如果想看vue1.0+gulp多页面app请看仓库mui-vue[地址](https://github.com/wuhou123/mui-vue)**

app打包技术是用[HBuilder IDE](http://www.dcloud.io/index.html)工具一键打包成APP，也可以借助eclipse本地打包（本地打包是有添加Android sdk包的需求，这里没有介绍，只是简单构建使用，本地打包工程如需可以索取）。这些都是[dcloud](http://www.dcloud.io/index.html)提供一整套技术解决方案。

**说明:** 编辑和项目开发借鉴了github上yujinjin/fans和vue美团的项目，项目只是基本页面，后面再添加页面和后端接口

> 1. 前端UI的部分使用mui框架
> 
> 2. app打包技术使用HBuilder IDE工具
> 

## 展示

<img src="http://www.hao123456.online/mui-vue2/test1.gif" alt="screenshot" title="screenshot" style="float:left;margin:5px;border:1px solid #bbb">

<img src="http://www.hao123456.online/mui-vue2/test2.gif" alt="screenshot" title="screenshot" style="float:left;margin:5px;border:1px solid #bbb">

<img src="http://www.hao123456.online/mui-vue2/test3.gif" alt="screenshot" title="screenshot" style="float:left;margin:5px;border:1px solid #bbb">

### 手机上查看

![图片](http://osk1hpe2y.bkt.clouddn.com/17-12-29/79549622.jpg)

## 安装
- 下载[HBuilder IDE](http://www.dcloud.io/index.html)开发工具，其实HBuilder是dcloud 把eclipse的改造成一个专门应用于app打包、多种语言支持：php、jsp、ruby、python、nodejs等web语言，less、coffee等编译型语言均支持的开发工具

- 下载[node.js](https://nodejs.org/en/)，作为前端web的运行环境。我当前的node.js版本是6.9.2 npm版本是3.10.9


- app打包完全是基于manifest.json配置文件，它主要是用来配置app的基本信息（版本号、appid等）、图标(app的应用图标)、sdk配置、模块权限配置、页面引用关系、代码视图，具体参看dcloud提供的[文档](http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/94)。


## npm初始化

##### package.json内容如下

```
{
  "name": "vue-meituan",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "bxm",
  "private": true,
  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "node build/dev-server.js",
    "build": "node build/build.js",
    "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
  },
  "dependencies": {
    "axios": "^0.16.2",
    "better-scroll": "^1.2.3",
    "element-ui": "^1.4.3",
    "jade": "^1.11.0",
    "jade-loader": "^0.8.0",
    "jsonp": "^0.2.1",
    "mint-ui": "^2.2.9",
    "moment": "^2.18.1",
    "pug": "^2.0.0-rc.4",
    "pug-loader": "^2.3.0",
    "vue": "^2.4.2",
    "vue-lazyload": "^1.1.3",
    "vue-resource": "^1.3.4",
    "vue-router": "^2.7.0",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-eslint": "^7.1.1",
    "babel-loader": "^7.1.1",
    "babel-plugin-istanbul": "^4.1.1",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "babel-register": "^6.22.0",
    "chai": "^3.5.0",
    "chalk": "^2.0.1",
    "chromedriver": "^2.27.2",
    "connect-history-api-fallback": "^1.3.0",
    "copy-webpack-plugin": "^4.0.1",
    "cross-env": "^5.0.1",
    "cross-spawn": "^5.0.1",
    "css-loader": "^0.28.0",
    "cssnano": "^3.10.0",
    "eslint": "^3.19.0",
    "eslint-config-standard": "^6.2.1",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-html": "^3.0.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^2.0.1",
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.14.1",
    "extract-text-webpack-plugin": "^2.0.0",
    "file-loader": "^0.11.1",
    "friendly-errors-webpack-plugin": "^1.1.3",
    "html-webpack-plugin": "^2.28.0",
    "http-proxy-middleware": "^0.17.3",
    "inject-loader": "^3.0.0",
    "karma": "^1.4.1",
    "karma-coverage": "^1.1.1",
    "karma-mocha": "^1.3.0",
    "karma-phantomjs-launcher": "^1.0.2",
    "karma-phantomjs-shim": "^1.4.0",
    "karma-sinon-chai": "^1.3.1",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-spec-reporter": "0.0.31",
    "karma-webpack": "^2.0.2",
    "mocha": "^3.2.0",
    "nightwatch": "^0.9.12",
    "node-sass": "^4.5.3",
    "opn": "^5.1.0",
    "optimize-css-assets-webpack-plugin": "^2.0.0",
    "ora": "^1.2.0",
    "phantomjs-prebuilt": "^2.1.14",
    "rimraf": "^2.6.0",
    "sass-loader": "^6.0.6",
    "selenium-server": "^3.0.1",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.8.0",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.0.4",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.4.2",
    "webpack": "^2.6.1",
    "webpack-bundle-analyzer": "^2.2.1",
    "webpack-dev-middleware": "^1.10.0",
    "webpack-hot-middleware": "^2.18.0",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 4.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

```

## 项目目录说明


```
|-- build                     // 编译后目录
|   |--                       // 编译app的html模板页面
|   |--                       // 编译app的css
|   |--                       // 编译app的js
|-- src                       // 源码目录
|   |--                       // app的html页面
|   |--                       // app的css
|   |--                       // app的js
|-- unpackage                 // app编译包目录
|-- static                    // 资源库（js、图片等）
|-- index.html                // app的首页加载文件
|-- manifest.json             // 打包app的配置文件
|-- package.json              // 配置项目相关信息，通过执行 npm init 命令创建
```


## 运行程序

项目地址：（`git clone`）
```
git clone https://github.com/wuhou123/mui-vue2.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

启动发布代码

```
//初始化

npm install

//开发

npm run dev

//发布

npm run build

```

说明一下：由于要解决移动端iOS操作系统click事件延迟300ms问题，特意使用了tap事件来替代click事件。所以运行时最好是在浏览器中的手机模拟器中操作。mui有plus对象，只能在手机端环境运行，有可能pc端会报错

## 实现的功能
- 用户登录
- 首页
    - 多tab页上拉刷新和加载，页面菜单切换
- 我的
    - 我的足迹 mui利用h5+手机定位，3D地图显示

## 最后
- 如果喜欢一定要 star哈!!!（谢谢!!）

- 如果有意见和问题 请在 lssues提出，我会在线解答。
