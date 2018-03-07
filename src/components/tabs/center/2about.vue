<template>
	<div class="about">
		<header class="search-head">
			<div class="search-d1" onclick="javascript:history.go(-1);"></div>
			<div class="input-box">
				<div class="tit1 titiocn"></div>
				<input type="text" v-model="sea" class="search-name" />
				<div class="tit2 titiocn" v-if="sea" @click="_clean()"></div>
			</div>
			<div class="search-d2" >搜索</div>
		</header>
			 <nav class="about-body" v-for="list in about">
				<p class="title">{{list.title}}</p>
				<p class="text">{{list.cont}}</p>
			 </nav>
			{{msg|myfilter}}
	</div>
</template>

<script>
import Vue from 'vue'
Vue.filter('myfilter', function (value,st1) {
/*if(value.toLowerCase().indexOf(news.toLowerCase())!==-1){
	 return value
}*/
return value
})
	export default{
	    data(){//原始数据
	        return{   
	        	about: [
					 {title:'关于本软件',cont:'11111'},
					 {title:'关于本软件',cont:'2222'},
					 {title:'关于本软件',cont:'333'}
                ],
	        	sea:'',
	        	msg:'你好'
	        }
	    },
	    props: {//传递参数            
	    },
	    computed:{ //计算属性
	    	filterlist(){
	    		return this.about.filter(function (item) {
	    			if(item.title.indexOf(this.sea)!=-1||item.cont.indexOf(this.sea)!=-1){
	    				return  item
	    			}
            	})
	    	}

	    },
	    components: {//注册模块   
	    },
	    created(){//请求模块  比methods 快        
	    },
	    mounted() {//比created慢  el 加载完毕

	    },
	    methods: {//方法
	    	_clean(){
	    		this.sea=''
	    		
	    	}
	    }
	}
	
	
</script>

<style lang="less">
	@import url("/static/css/about.css");
</style>