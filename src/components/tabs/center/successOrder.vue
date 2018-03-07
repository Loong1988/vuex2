<template>
	<div>
		<header class="header header_position">
			<nav onclick="javascript:history.go(-1);"></nav>
			订单详情
		</header>
		<img src="/static/img/shop/order-head.jpg" class="order-head" />
		<div class="logistics">
			您的商品已到达<span>北京</span>
		</div>
		<nav class="address">
			<div class="left">
			</div>
			<div class="right">
				<p class="p1"><span>收货人：  </span><span class="reap-name">{{goods.address.name}}</span> <span class="tell">{{goods.address.tell}}</span></p>
				<p class="p2">
					<span>收货地址：</span><span>{{goods.address.address}}</span>
				</p>
			</div>
		</nav>
		<div class="invoice lis" v-show="goods.msg">
			<p class="cont">发票抬头：{{goods.msg}}</p>
		</div>
		<div class="message lis">
			<p class="cont" v-if="goods.message">留言：{{goods.message}}</p>
			<p class="cont" v-else>留言：无</p>
		</div>
		<!--商品循环-->
		<vgoodsfor :goods='goods.goods'></vgoodsfor>
		<div style="height: 20vw;"></div>
		<footer class="success-foot">
			<nav>查看物流</nav>
			<nav>确认收货</nav>
		</footer>
	</div>
</template>

<script>
	import goodsfor from './goodsfor'
	export default {
		data() { //原始数据
			return {
				goods: {}
			}
		},
		props: { //传递参数           

		},
		computed: { //计算属性

		},
		components: { //注册模块      
			'vgoodsfor': goodsfor
		},
		created() { //请求模块  比methods 快      

			this.goods = JSON.parse(this.$route.query.orderObj)

		},
		mounted() { //比created慢  el 加载完毕
		},
		methods: { //方法
		}
	}
</script>

<style lang="less" scoped="">
.child-view{
	transition: all 0;
}
	.order-head {
		width: 100%;
		margin-top: 10vw;
	}
	.logistics{
		min-height: 10vw;
		font-size: 3.5vw;
		color: #999;
		background: #fff url('/static/img/shop/logistics.png') no-repeat 4.5vw center ~'/' 5vw;
		line-height: 10vw;
		padding: 0 3vw;
		text-indent: 8vw;
		border-bottom: 1px solid #ddd;
		span{
			color: #051b28;
		}
		
	}
	.address {
		padding: 2vw;
		display: flex;
		background: #fff;
		color: #666;
		border-bottom: 1px solid #ddd;
		.left {
			width: 50px;
			background: url('/static/img/popleCenter/positions.png') no-repeat center ~'/' 5vw;
		}
		.right {
			flex: auto;
			font-size: 3.2vw;
			padding-right: 4vw;
			.tell {
				float: right;
			}
		}
	}
	
	.lis {
		background: #fff;
		padding: 0 3vw;
		font-size: 3.2vw;
		height: 10vw;
		line-height: 10vw;
		.cont {
			color: #666;
		}
	}
	.success-foot{
		background: #fff;
		height: 12vw;
		display: flex;
		align-items: center;
		justify-content: flex-end;
    	padding: 0 3vw;
    	position: fixed;
    	bottom: 0;
    	width: 94vw;
		nav{
			padding: 0.5vw 3vw;
			color: #FF5000;
			border: 1px solid #FF5000;
			border-radius: 6vw;
			font-size: 3.5vw;
			margin-left: 3vw;
		}
	}
</style>