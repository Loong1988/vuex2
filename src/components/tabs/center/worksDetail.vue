<template>
	<section class="works">
		 <swiper loop auto :list="imglist" :index="demo06_index"></swiper>
		<div class="up">
			
			<p class="name">项目名称： <span>{{one.title}}</span> </p>
			<p>项目描述：<span>{{one.desc}}</span></p>
			<p>开发工具：<span>{{one.detail.util}} </span></p>
			<p>数据库：<span>{{one.detail.data}}</span></p>
			<p>开发周期：<span>7个月</span></p>
			<p>开发人数：<span>8人</span></p>
		    <p>技术方案：<span>{{one.detail.technology}}</span></p>
			
			<p>项目网址: <a  :href="one.detail.link"><span class="link">{{one.detail.link}}</span></a></p>
			<p>责任描述：<span>{{one.detail.myDuty}}</span></p>
			
			
		</div>
		<div class="down">
			<p>主要功能</p>
			<ul>
				<li v-for="item in one.detail.function">{{item}}</li>
			</ul>		
			
		</div>



	</section>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'

	export default{
	    data(){//原始数据
	        return{  
		      demo06_index: 0,
		      one:{detail:{}},
		      imglist:[],
		      
	       }
	    },
	    props: {//传递参数          
	    },
	    methods: {//方法
	    },
	    computed:{ //计算属性

	    },
	    components: {//注册模块       
    	    Swiper,
    	    SwiperItem,
    	    GroupTitle,
    	    XButton,
    	    Divider
	    },
	    created() {//请求模块  比methods 快      
	    	
	    	var thst=this
	    	this.$http.get('/api/good').then(res=> {
				//成功{{$route.params.index}}
				res=res.data//第二个data 是数据里的    第一个是vue-res里的
				var index=this.$route.params.index
				console.log(index)
				console.log(res.data[index])
				thst.one=res.data[index]
				var imgs=thst.one.detail.imgs
				console.log(imgs)
				imgs.forEach(function(obj){
					thst.imglist.push({img:obj})
				});
				
				
			},function (res) {
				//失败
			})
	    },
	    mounted() {//比creat慢  el 加载完毕
	    	this.$store.commit('change',2) 
	    	this.flobalFun(33232)//全局方法-在此无用
		}

	}
	
</script>

<style lang="less">
	.head{
		z-index: 100;
	}
	body{
		overflow: scroll;
	}
	.works{
		width: 88%;
		margin:10vw 6%;
		
		color: #222222;
		font-size: 3.5vw;
		margin-top: 5vw;
		
		
		.up,.down{
			
			border-radius: 1.5vw;
			padding: 2vw;
			margin-top: 5vw;
			margin-bottom: 5vw;
			    background: #eee;
			        box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.06), 4px 0px 4px rgba(0, 0, 0, 0.06);
			p{
				line-height: 150%;
				margin-bottom:2vw ;
				color: #222222;
				span{
					color: #666666;
				}
			}
			ul{
				li{
					margin-bottom:2vw ;
					color: #666666;
				}
			}
		}

		&>p{
			margin-bottom: 2vw;
		}
	}
	.link{
		text-decoration: underline;
		color: #ecbf28!important;
	}
</style>