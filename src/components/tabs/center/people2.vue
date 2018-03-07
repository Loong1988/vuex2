<template>
	<section class="people2">
		<p class="tit">IT技能</p>
		<p>1．熟悉 HTML/HTML5、CSS/CSS3，精通DIV+CSS布局，能够熟练手工编写HTML5及CSS3代码。</p>
		<p>2．熟练使用Eclipse/MyEclipse/Dreamweaver/HBuilder/sublime等开发工具；</p>
		<p>3 . 熟练jQuery, require.js，Bootstrop，Amaze，Angular ，Vue等前端框架，使用node.js，webpack打包工具，less等css预处理器。熟悉HTML5特性，了解HTML5最新规范，能够熟练运用HTML5特性构建移动端的WebApp；</p>
		<p>4 . 熟练运用AJAX、JSON等技术与后台处理数据，熟悉浏览器与服务器交流机制。</p>
		<p>5 . 利用HTML5相关技术开发移动平台、和IOS，Android、混合开发App。</p>
		<p>6 . 熟悉并能编写微信小程序；</p>
		<p>7 .  两年java开发经验，熟练运用AJAX、JSON等技术与后台处理数据。熟练使用(struts2，hibernate，
		spring)等轻量级框架。熟练使用MySql、Oracle数据库。了解PHP。</p>
		<p>8 . 良好的沟通能力和团队协作精神， 对移动互联网行业有浓厚的兴趣，有较强的研究能力和学习能力。</p>

	</section>
</template>

<script>
	
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
	    },
	    created(){//请求模块  比methods 快        
	    }
	}
	
</script>

<style lang="less">
	html,body{
		height: 100%;
	}
	.people2{
		width: 93%!important;
		    margin: 5vw 3.5%;
		.tit{
			font-size: 4.5vw;
			color: #222222;
		}
		&>p{
			font-size: 3.5vw;
			color: #222222;
			margin-bottom: 1vw;
		}
	}
</style>