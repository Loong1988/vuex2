<template>
	<div >
		<nav class="box-pople1">
			<table border="0" cellspacing="0" cellpadding="0" class="table">
				
				<tr><td>姓名</td><td>曹龙</td></tr>
				<tr><td>性别：</td><td>男</td></tr>
				<tr><td>故乡：</td><td>河南*洛阳</td></tr>
				<tr><td>职业：</td><td>web前端工程师</td></tr>
				<tr><td>生日：</td><td>1988/04/13</td></tr>
				<tr><td>电话：</td><td>17600114702</td></tr>
				<tr><td>邮箱：</td><td>long349555788@163.com</td></tr>
			</table>
			  <!--<x-button  plain type="primary" class='people-btn'>下一项</x-button>-->
			  <div style="height: 10vw;"></div>
		</nav>
	</div>
</template>

<script>
	import { XButton } from 'vux'
	export default{
	    data(){//原始数据
	        return{             
	        }
	    },
	    props: {//传递参数            
	    },
	    methods: {//方法
	    },
	    computed:{ //计算属性
	    },
	    components: {//注册模块            
	    	XButton
	    },
	    created(){//请求模块  比methods 快        
	    }
	}
	
</script>

<style lang="less">
	html,body{
		height: 100%;
		background: #e7dced;
	}
	.box-pople1{
		background: #fff;
	}
	.table{
		background: #fff;
		tr{
			
			
			td:nth-child(1){
				width: 20vw;
				color: #AAAAAA;
			}
			td:nth-child(2){
				
				color: #222;
			}
			td{
				border-bottom: 1px solid #EEEEEE;
				text-align: left;
			}
		}
	}
	.people-btn{
		width: 80%!important;
		margin: 10vw auto 0;
	}
</style>