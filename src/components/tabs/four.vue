<template>
	<div class="four">
		<header class="header">我的</header>
		<div class="img-box">
			<img src="../../../static/img/me.jpg" />
		</div>
		<section class="content">
			<aside class="head-img">
				<img src="../../../static/img/betiful.jpg" />
			</aside>
			<aside class="name">
				曹龙
			</aside>
			<p class="my-text">In2017 Believe me, you can work miracles.</p>
		</section>
		<div class="count">
			<countup :start-val="count.start" :end-val="count.end" :duration="2" class="demo1">
			</countup>
			<img src="../../../static/img/add.png"/>
		</div>

		
		<ul class="my-list">
			<li>
				<div class="d1 tit1"></div>
				<div class="d2" @click="_center('/center/1')">基本信息</div>
				<div class="d3"></div>
			</li>
			<li>
				<div class="d1 tit2"></div>
				<div class="d2" @click="_center('/center/people2/1')">个人技能</div>
				<div class="d3"></div>
			</li>
						<li>
				<div class="d1 tit3"></div>
				<div class="d2" @click="_center('/center/people3/1')">工作历程</div>
				<div class="d3"></div>
			</li>
						<li>
				<div class="d1 tit4"></div>
				<div class="d2" @click="_center('/center/people4/1')">作品鉴赏</div>
				<div class="d3"></div>
			</li>
			<li @click="_center('/friend/1')">
				<div class="d1  tit8"></div>
				<div class="d2" >朋友圈</div>
				<div class="d3"></div>
			</li>
			<li @click="_center('/shop/1')">
				<div class="d1  tit9"></div>
				<div class="d2" >购物车</div>
				<div class="d3"></div>
			</li>
			<li @click="_position()">
				<div class="d1  tit7"></div>
				<div class="d2" >位置</div>
				<div class="d3"></div>
			</li>
			<li @click="_set()">
				<div class="d1 tit5"></div>
				<div class="d2" >设置</div>
				<div class="d3"></div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Countup } from 'vux'
	export default {
		data() {
			return {
				count: {start:0.5,end:299}
			}
		},
		methods: {//方法
	    	_set(){
	    		this.$router.push({ path: '/out' }) 
	    	},
	    	_center(urls){
	    		this.$router.push({ path: urls }) 
	    	},
	    	_position(){
	    		this.$router.push({ path: '/positions/1' }) 
	    	}
	    },
		computed:{ //计算属性  13321156408猎聘网  李
			

        },
		components: {
			Countup,
		}

	}
	
</script>

<style lang="less" scoped="">
	@import url("../../../static/css/common.css");
	.child-view {

    transition: all 0s;}
	.four {
		.img-box {
			width: 100%;
			font-size: 0;
			margin-top: 10vw;
			/*去除img白边*/
			img {
				width: 100%;
			}
		}
		.content {
			position: relative;
			z-index: 100;
			    overflow: inherit;
			.head-img {
				position: absolute;
				top: -10vw;
				left: 10vw;
				width: 20vw;
				height: 20vw;
				border-radius: 3vw;
				overflow: hidden;
				border: 1vw solid #DDDDDD;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.name {
				text-indent: 35vw;
				position: absolute;
				top: -8vw;
				color: #fff;
				font-family: cursive;
				font-size: 5vw;
			}
			.my-text {
				width: 65%;
				float: right;
				color: #222222;
			}
		}
		.content:after {
			content: "";
			display: block;
			clear: both;
		}
		.count{
						    position: absolute;
		    top: 12vw;
		    left: 3vw;
		    color: #EEEEEE;
		    img{
		    	width: 9vw;
			    height: auto;
			    vertical-align: middle;
		    }
		}

	}
	.my-list{
		margin-top: 6vw;
		    margin-bottom: 25vw;
		li{
			background: #fff;
			height: 12.5vw;
			line-height: 12.5vw;
			display: flex;
			.tit1{
				background: url(../../../static/img/popleCenter/tit1.png) no-repeat center ~'/' 5vw;
			}
			.tit2{
				background: url(../../../static/img/popleCenter/four2.png) no-repeat center ~'/' 5vw;
			}
			.tit3{
				background: url(../../../static/img/popleCenter/four3.png) no-repeat center ~'/' 5vw;
			}
			.tit4{
				background: url(../../../static/img/popleCenter/four4.png) no-repeat center ~'/' 5vw;
			}
			.tit5{
				background: url(../../../static/img/popleCenter/four5.png) no-repeat center ~'/' 5vw;
			}
			.tit7{
				background: url(../../../static/img/popleCenter/positions.png) no-repeat center ~'/' 5.5vw;
			}
			.tit8{
				background: url(../../../static/img/popleCenter/friend.png) no-repeat center ~'/' 5.5vw;
			}
			.tit9{
				background: url(../../../static/img/popleCenter/shop.png) no-repeat center ~'/' 5.5vw;
			}
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
		}
		li:not(:last-child){
			border-bottom: 1px solid #eeeeee;
		}
		li:active{
			background: #f7f7f7
		}
		li:last-child{
			margin-top: 5vw;
		}
	}
</style>