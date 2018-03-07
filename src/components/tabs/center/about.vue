<template>
	<div class="about">
		<header class="search-head">
			<div class="search-d1" onclick="javascript:history.go(-1);"></div>
			<div class="input-box">
				<div class="tit1 titiocn"></div>
				<input type="text" v-model="sea" class="search-name" />
				<div class="tit2 titiocn" v-if="sea" @click="_clean()"></div>
			</div>
			<!--↓-->
			<div class="search-d2" @click="orderby()">排序{{or}}</div>
		</header>
		<header class="kong"></header>
			 <nav class="about-body" v-for="list in filterlist">
				<p class="title"> <span>{{list.id}}</span>{{list.title}}</p>
				<p class="text">{{list.cont}}</p>
			 </nav>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'//http
Vue.filter('myfilter', function (value,news) {
	if(value.toLowerCase().indexOf(news.toLowerCase())!==-1){
		 return value
	}
})
	export default{
	    data(){//原始数据
	        return{   
	        	about: [
					 {id:'12',title:'关于本软件',cont:'本软件使用vue+vueRouter架构'},
					 {id:'1002',title:'UI框架',cont:'基于webpack+vue-loader+vux可以快速开发移动端页面，配合vux-loader方便你在WeUI的基础上定制需要的样式。'},
					 {id:'1003',title:'vue-resource',cont:'vue-resource非常小巧，在压缩以后只有大约12KB，服务端启用gzip压缩后只有4.5KB大小，这远比jQuery的体积要小得多。'},
              		 {id:'3',title:'Axios',cont:'Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。'},
              		  {id:'10044',title:'vue-scroll',cont:'基于vue的上拉刷新，下拉加载模块'},
              		 {id:'10012',title:'vue-lazyload',cont:'图片懒加载'},
              		{id:'10053',title:'vue-fastclick',cont:'解决移动端300毫秒延迟问题'},
              		{id:'10058',title:'数据库',cont:'本软件使用json模拟请求，因而打包后可能会有部分接口失效'},
              		{id:'1',title:'登陆拦截',cont:'vueRouter拦截，meta设置判断'},
              		{id:'2',title:'共享数据',cont:'vuex+localStorage+cookie'},
              		{id:'4',title:'底部tab显示切换',cont:'vueRouter传参，type：1为消失'},
              		{id:'7',title:'接口跨域',cont:'使用proxyTable代理，解决开发跨域，发布时失效'}
	            ],
	        	sea:'',
	        	msg:'你好',
	        	type:false,
	        	or:"↑"
	        }
	    },
	    props: {//传递参数            
	    },
	    computed:{ //计算属性
	    	filterlist(){//过滤器----
	    		var that=this
	    		var arr=[]
	    		this.about.filter(function (item) {
	    			if(item.title.toLowerCase().indexOf(that.sea.toLowerCase())!=-1||item.cont.toLowerCase().indexOf(that.sea.toLowerCase())!=-1){
	    				//return  item//.sort(that.compare2(item.id))
	    				arr.push(item)
	    			}
	    			//return  item
            	})
	    		//return arr
	    		return arr.sort(that.compare2('id'))
	    	}
	    },
	    components: {//注册模块   
	    },
	    created(){//请求模块  比methods 快  
	    	//通过代理访问 跨域 
	    	//var urls='/api2/overt/cash-task/classify'
	    	var urls='/api2/overt/cash-task/list'
	    	console.log(urls)
	    	axios.post(urls, {
				//参数
								"pageNo" : 1,
					"pageSize" : 10,
					"pageLimit" : 1,
					"orderHot":'D'
			})
			.then(function (response) {
				console.log('axios--数据');
			  console.log(response.data);
			})
			.catch(function (error) {
			   console.log(error);
			});
	    },
	    mounted() {//比created慢  el 加载完毕

	    },
	    methods: {//方法
	    	_clean(){
	    		this.sea=''
	    	},
	    	compare2(property){//排序
	    		var that=this
			    return function(a,b){
			        var value1 =parseInt(a[property]) ;
			        var value2 =parseInt(b[property]);
			        if(that.type){
			        	return value2 - value1;
			        }else{
			        	return value1 - value2;
			        }
			    }
			},
			orderby(){
				this.type=!this.type
				if(this.type){
					this.or='↓'
				}else{
					this.or='↑'
				}
			}
	    }
	}
	
	
</script>

<style lang="less">
	@import url("/static/css/about.css");
	body{
		/*触摸动作也经常用于完全解决由支持双击缩放手势引起的点击事件的延迟。*/
		touch-action: none
	}
</style>