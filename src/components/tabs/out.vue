<template>
	<div>
		<header class="header header_position">
			<nav onclick="javascript:history.go(-1);"></nav>
			设置
		</header>
		<ul class="my-list">
			<li>
				<div class="d1"></div>
				<div class="d2">新消息提醒</div>
				<div class="d3"></div>
			</li>
			<li>
				<div class="d1"></div>
				<div class="d2">忽扰模式</div>
				<div class="d3"></div>
			</li>
			<li @click="about()">
				<div class="d1 bac2"></div>
				<div class="d2" >关于本软件</div>
				<div class="d3"></div>
			</li>
		</ul>
		<ul class="my-list">

			<li @click="showPlugin()">
				<div class="d1 bac1"></div>
				<div class="d2" >退出</div>
				<div class="d3"></div>
			</li>
		</ul>
		</div>
</template>

<script>
	import { Confirm } from 'vux'
import { XHeader } from 'vux'
	export default{
	    data(){//原始数据
	        return{             
	        }
	    },
	    props: {//传递参数            
	    },
	    methods: {//方法
	    	
	    	showPlugin () {
	    	  const _this = this//注意此时的this
		      this.$vux.confirm.show({//这个this是插件的this
		        title: 'Title',
		        content: '确定要退出？',
		        onShow () {
		          console.log('plugin show')
		        },
		        onHide () {
		          console.log('plugin hide')
		        },
		        onCancel () {
		          console.log('1')
		        },
		        onConfirm () {
		        	sessionStorage.setItem('accessToken', false);
		         _this.$router.push({ path: 'one' }) 

		        }
		      })
		    },
		    one(){
		    	console.log('1113')
	    		sessionStorage.setItem('accessToken', false);
		         this.$router.push({ path: 'one' }) 
		         console.log(sessionStorage.accessToken)
	    	},
	    	about(){
	    		this.$router.push({ path: '/about/1' }) 
	    	}
	    },

	    computed:{ //计算属性
	    },
	    components: {//注册模块            
	    	Confirm
	    },
	    created(){//请求模块  比methods 快        
	    }
	}
	
</script>

<style lang="less" scoped="">
	.my-list{
		margin-top: 14vw;
		li{
			margin: auto;
			background: #fff;
			height: 12.5vw;
			line-height: 12.5vw;
			display: flex;
			.d1{
				width: 12.5vw;
			}
			.d2{
				flex: 1;
			}
			.d3{
				width: 12.5vw;
				background: url(../../../static/img/tiaozhuan.png) no-repeat center ~'/' 2vw;
			}
			.bac1{
				background: url(/static/img/popleCenter/out.png) no-repeat center ~'/' 5vw;
			}
			.bac2{
				background: url(/static/img/popleCenter/about.png) no-repeat center ~'/' 5.5vw;
			}
		}
		li:not(:last-child){
			border-bottom: 1px solid #eeeeee;
		}
		li:active{
			background: #f7f7f7
		}
	}

</style>