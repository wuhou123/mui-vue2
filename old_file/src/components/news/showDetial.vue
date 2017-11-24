<template>
    <div class="news">
    	<header class="mui-bar mui-bar-nav">
			<router-link to="/news/imgcontentnews" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left">返回</router-link>
			<h1 class="mui-title">资讯详情</h1>
		</header>
      <!--新闻详细-->
      <div class="meta">
        <h1 class="meta-tit">{{article.title}}</h1>
        <p class="meta-info">
          <span class="time">{{article.add_time | dateFmt('YYYY-MM-DD') }}</span>
          <span class="view">{{article.click}} 次浏览</span>
          	分类：经济民生
        </p>
      </div>
      
      <div class="entry" v-html="article.content">
        
      </div>
      <!--/新闻详细-->
	</div>
	
</template>

<script>
import common from 'kits/common.js'
    export default{
		data(){
			return {
//				id : this.$route.params.id,  //获取news/imgcontentnews.vue组件中传入过来的id
				article:{}
			}
		},
		created(){
			this.$http.get(common.dataApiDomain+'/api/getnew/'+this.$route.params.id)
			.then((res)=>{
				this.article = res.body.message[0];
			});
		}
		
    }
</script>


<style scoped>

@import '../../../statics/css/muihead.css';

/* 全局CSS
----------------------------------------------------------------------*/
body{ font-family:"Microsoft Yahei",helvetica,arial;  }
a,a:link{ text-decoration:none; }
.red{ color:#F00; }

/*标题样式*/
.meta{ margin:1em auto auto auto; padding-bottom:10px;padding-left:5px; border-bottom:1px solid #EEE; }
.meta .meta-tit{ color:#0088D1; font-size:19px; margin:0 0 10px; }
.meta .meta-info{ font-size:12px; color:#999; }
.meta .meta-info span{ margin-right:0.5em; }

p{
	color:#00000;
	}
	
.entry{
	margin-bottom: 50px;
	padding: 5px;
}
	

</style>