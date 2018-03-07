<template>
	<div class="one">
		<header  class="headtwo">商城</header>
		<nav class="header-bottom"></nav>
		<aside class="bigbox" >
			<scroller :on-infinite="infinite" refreshText='下拉' :on-refresh="refresh" ref="myscroller" class='scbox'>
				<div v-show="!onePage" class="box new-box" v-for="(task,index) in items" @click="detail(task)">
					<nav class="left">
						<img v-lazy="imgs+task.iconFileId">
					</nav>
					<nav class="right">
						<p class="p1">{{task.title}}</p>
						<p class="p2">{{task.commSum}}</p>
						<p class="p3">${{task.currentPrice}}</p>
					</nav>

					<!--end-->
				</div>
				<div v-show="onePage" class="twoPage">
					<ul>
						<li class="li-g" v-for="x in 4">
							<div class="left"></div>
							<div class="right">
								<p></p>
								<p></p>
							</div>
						</li>
					</ul>
				</div>
			</scroller>
		</aside>
		<!--详情弹框-->
		<div v-transfer-dom>
			<popup v-model="show9" position="right">
				<div style="width:100vw;" class="detail">
					<i @click="cancel_show9()" class=" weui-icon weui_icon_cancel weui-icon-cancel"></i>
					<nav class="head-img">
						<img :src="imgs+detal.iconFileId" />
					</nav>
					<aside class="detal-down">
						<p class="p1">{{detal.title}}</p>
						<p class="p2">{{detal.commSum}}</p>
						<p class="p3">${{detal.currentPrice}}</p>
					</aside>
					<div class="module-shop" data-mod-name="detail-m/mods/module-shop/index" data-spm="1998338745">
						<div class="shop-main" data-spm="1998338745">
							<div class="shop-logo">

								<img src="//img.alicdn.com/imgextra//d0/5d/TB1kydZPFXXXXa.XVXXwu0bFXXX.png_120x120.jpg" aria-label="店铺标志">

							</div>
							<div class="shop-info">
								<div class="shop-name" title="小米官方旗舰店">小米官方旗舰店</div>
								<div class="shop-title"></div>
							</div>
							<div class="shop-qualification ">
							</div>
						</div>
						<ul class="score">
							<li>宝贝描述<b class="equal">4.8 </b></li>
							<li>卖家服务<b class="equal">4.7 </b></li>
							<li>物流服务<b class="equal">4.7 </b></li>
						</ul>
						<div class="action mui-flex">
							<a class="all-product cell" >全部商品</a>
							<a class="go-shop cell" >进入店铺</a>
						</div>
						<div id="s-actionBar-container">
        <div class="action-bar-wrap j-bottom-bar    ">
            <a class="support cell" >客服</a>
            
                <a class="toshop cell" >进店</a>
            
            <a class="addfav cell">收藏</a>
            <div class="mods-wrap"></div>
            <div class="trade">
		    <a class="cart " role="button" @click="shoppingCar()">加入购物车</a>
		    <a class="info" role="button"></a>
		    <a class="buy " role="button" @click="shoppingCar()">立即购买</a>
			</div>
			        </div>
			        <a  class="cart-link " @click="goRouter('/shop/1')"><span>{{$store.state.shop.length}}</span></a>
			    </div>
					</div>
				</div>
				<transition name='footTk'>
					<nav class="footTk" v-show="footTk">
						<header>
							<img :src="imgs+detal.iconFileId"/>
							<div class="right">
								<span class="sp1">${{detal.currentPrice*seltype.num1|num2(2)}}</span>
								<span class="sp2">库存 36417件</span>
								<span class="sp3">已选择：{{detal.title}}-{{seltype.pay1}}-{{seltype.pay2}}</span>
							</div>
						</header>
						<div class="address">
							<h2>套餐类型</h2>
							<ul>
								<li @click="_combo(index,x)" v-for="(x,index) in combo" :class="{act:index==pay1}">{{x}}</li>
								
							</ul>
						</div>
						<div class="address address2">
							<h2>花呗分期（可选）</h2>
							<ul >
								<li @click="_amortize(index,x)" :class="{act:index==pay2}" v-for="(x,index) in amortize">{{x}}</li>
							</ul>
						</div>
<!--						<group >
					      <x-number name='a123' v-model='xnumber' :value="xnumber" :min="1" @on-change="change"></x-number>
					    </group>-->
					    <vchangenumber :seltype='seltype'></vchangenumber>
					    <footer class="shopping-foot">
					    	<div class="left" @click="_addShop()">加入购物车</div>
					    	<div class="right">立即购买</div>
					    </footer>

					</nav>
				</transition>
				<transition name='gray'>
					<nav class="gray" v-show="footTk" @click="shoppingCar()">
					</nav>
				</transition>
			</popup>
		</div>
		<!--详情弹框-->
	</div>
</template>

<script>
	import 'static2/css/two.css'//static2 设置别名  对应 static  在js里加载有热重载效果
	import axios from 'axios' //http
	import { dateFormat } from 'vux' //时间格式化
	import Vue from 'vue'; //修改data 数据 需要实例化vue对象
	import VueScroller from 'vue-scroller' //下拉加载
	Vue.use(VueScroller)
	import changeNumber from './center/changeNumber2'//数字控件
	import { Confirm } from 'vux' //confirm
	import { ConfirmPlugin } from 'vux'
	import { TransferDom, Popup, Icon } from 'vux'
	Vue.use(ConfirmPlugin)
	
	export default {
		data() { //原始数据
			return {
				result: {},
				test_data:{},
				items: [],
				lengths: 0,
				pay2:0,
				pay1:0,
				datas: {
					"pageNo": 1,
					"pageSize": 5,
					"pageLimit": 1,
					"orderHot": 'D'
				},
				combo:['官方套餐','标配','豪华套餐'],
				amortize:['不使用花呗分期（全款）','分3期(0手续费)$999.66起/期','分6期(0手续费)$499.66起/期','分9期(0手续费)$299.66起/期'],
				show9: false,
				detal: {},
				imgs: 'http://m.caimiing.com',
				footTk:false,
				seltype:{
					pay1:'官方套餐',
					pay2:'分3期(0手续费)$999.66起/期',
					num1:1,
					num:1
				},
				lastShopNum:0,
				xnumber:1,
				onePage:true,
				
			}
		},

		props: { //传递参数      
			goods:{}
		},
		methods: { //方法
			refresh(done) {
				console.log('下拉刷新2')
				this.datas.pageNo = 1
				this._init()
				setTimeout(() => {
					done()
					this.datas.pageNo++;
				}, 1000)
				//done()表示这次异步加载数据完成，加载下一次
			},
			infinite(done) {
				console.log('上拉加载1')
				this._init()
				this.lengths = 0
				setTimeout(() => {
					if(this.lengths == 0) {
						console.log('st')
						this.$refs.myscroller.finishInfinite(2); //停止刷新
					} else {
						//this.items=this.items.concat(this.result)
						this.datas.pageNo++;
						done()
					}
				}, 1000)
			},
			aaa() {
				console.log(123)
				return 'sdf'
			},
			_init() {
				let that = this
				console.log('inti----11')
				//通过代理访问 跨域 
				var urls = '/api2/overt/cash-task/list'
				console.log(urls)
				axios.post(urls,
						//参数
						this.datas
					)
					.then(function(response) {
						console.log('axios--数据');
						console.log(response.data);
						that.test_data=response.data
						let l = response.data.tasks.length
						if(l != 0) {
							setTimeout(()=>{//测试用
								that.items = that.items.concat(response.data.tasks)
								that.onePage=false
							},2000)
						}
						that.lengths = response.data.tasks.length
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			showPlugin(index) {
				const _this = this //注意this的指向，_this是全局对象
				console.log(1)
				this.$vux.confirm.show({
					title: '通知',
					content: '确认删除？',
					onShow() {
						console.log('plugin show')
					},
					onHide() {
						console.log('plugin hide')
					},
					onCancel() {
						console.log('plugin cancel')
					},
					onConfirm() {
						console.log('确定' + index)
						//this.items:[],
						_this.items.splice(index, 1)

					}
				})
			},

			detail(task) {
				console.log(task)
				this.show9 = true;
				this.detal = task
			},
			resetScroller() {
				this.$nextTick(() => {
					this.$refs.scroller.reset()
				})
			},
			log(str) {
				console.log(str)
			},
			cancel_show9() {
				this.show9 = false;
			},
			shoppingCar(){
				this.footTk=!this.footTk;
			},
			tkbac(){
				console.log(111111111)
				this.footTk=false
			},
			_amortize(num,sel){//选择分期
				this.pay2=num;
				this.seltype.pay2=sel
			},
			_combo(num,sel){//选择分套餐
				this.pay1=num;
				this.seltype.pay1=sel
				this.seltype.num1=num+1
			},
			change (val) {
		      console.log('change', val)
		      this.seltype.num=val
		   },
		   _addInterceptors () {
		     /* axios.interceptors.request.use(function (config) {
		        // Do something before request is sent
		        
		        console.log(config)
		        console.log(`请求地址: ${config.url}`)
		        return config
		      }, function (error) {
		        // Do something with request error
		        console.log('请求失败')
		        return Promise.reject(error)
		      })
		      axios.interceptors.response.use(function (config) {
		        // Do something before request is sent
		        console.log('接收响应')
		        return config
		      }, function (error) {
		        // Do something with request error
		        console.log('响应出错')
		        return Promise.reject(error)
		      })*/
		    },
			_addShop(){//加入购物车
				this.detal.orther=this.seltype
				console.log(this.detal.orther.num+'_addShop---加入购物车的数量')
				let  shop=this.$store.state.shop
				let isRepaty=false;
				let shopIndex=''
				let oldnum=1;
				console.log('-----3')
				shop.forEach((x,index)=>{
					if(x.oidTaskId==this.detal.oidTaskId){
						console.log('重复')
						isRepaty=true;
						shopIndex=index;
						oldnum=x.orther.num
						console.log(oldnum+'old')
						return false;
					}
				})				
				if(isRepaty==true){//已有商品 修改数量
					console.log('is---1')
					console.log(this.lastShopNum+'----this.lastShopNum')
					console.log(this.xnumber+'---this.xnumber')
					let allNum=this.lastShopNum+this.xnumber
					let obj2={newNum:allNum,index:shopIndex}
					this.lastShopNum=allNum
					this.$store.commit('changeShop',obj2)
					console.log(this.lastShopNum+'--this.lastShopNum')
				}else{//没有商品 添加商品
					console.log('is---2')
					this.$store.commit('addShop',this.detal)
					this.lastShopNum=this.detal.orther.num
					console.log(this.lastShopNum+'--this.lastShopNum')
				}
				var objsel={
					pay1:'官方套餐',
					pay2:'分3期(0手续费)$999.66起/期',
					num1:1,
					num:1
				}
				this.seltype=objsel
				this.tkbac()
			}
		},
		components: { //注册模块   
			Confirm,
			Popup,
			TransferDom,
			Icon,
			'vchangenumber':changeNumber
		},
		directives: {
			TransferDom
		},
		created() { //请求模块  比methods 快     
 			this._addInterceptors ()
		}
	}

	//过滤器
	Vue.filter('dateFormat', function(value) { //自定义 时间格式化
		var d = dateFormat(value, 'YYYY-MM-DD HH:mm:ss')
		return d;
	})
</script>

<style lang="less">
	@import '~vux/src/styles/close.less';
	@import url("../../../static/css/xiaomi.css");
	.headtwo{
    	font-size: 4vw;
	}
	body .weui-cells:before{
		border-top: none;
	}
	
	.twoPage ul{
	    width: 90%;
    margin: 0vw auto;}
	.twoPage .li-g{
		width: 100%;
		height: 20vw;
		display: flex;
		margin-bottom: 5vw;
		.left{
			width: 20vw;
			height: 100%;
			background: gray;
		}
		.right{
			flex: 1;
			p{
				background: gray;
				height: 5vw;
				width: 80%;
				margin: 2vw ;
			}
		}
	}
</style>