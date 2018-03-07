<template>
	
	<section class="works">
		<panel :header="'作品列表'" :footer="footer" :list="list" :type="type" ></panel>
	</section>
</template>
<script src="aaa.js" type="text/javascript" charset="utf-8"></script>
<script>
	import { Panel, Group, Radio } from 'vux'	
	
	export default{
	    data(){//原始数据
	        return{  
	        	type: '5',
			      list:[ ],
		          footer: {
			        title: '以上信息真实可靠，并且全部由@long参与设计',
			        url: ''
			      }
	        }
	    },
	    props: {//传递参数            
	    },
	    methods: {//方法

	    },
	    computed:{ //计算属性

	    },
	    created(){//请求模块  比methods 快
			this.$http.get('/api/good').then(res=> {
				//成功
				res=res.data//第二个data 是数据里的    第一个是vue-res里的
				console.log(res.data)
				this.list=res.data
				
			},function (res) {
				//失败
			})
		},
	    components: {//注册模块        
	    	Panel,
		    Group,
		    Radio
	    },

	}
	
</script>

<style>
	html,body{
		height: 100%;
	}
	.weui-media-box_appmsg .weui-media-box__thumb{
		border-radius: 1vw;
	}
</style>