<template>
	<div class="order">
		<header class="header header_position">
			<nav onclick="javascript:history.go(-1);"></nav>
			确认订单
		</header>
		<nav style="height: 10vw;"></nav>
		<div class='mains'>
			<nav class="address" @click="_address()">
				<div class="left">
				</div>
				<div class="right">
					<p class="p1"><span>收货人：  </span><span class="reap-name">{{showAddress.name}}</span> <span class="tell">{{showAddress.tell}}</span></p>
					<p class="p2">
						<span>收货地址：</span><span>{{showAddress.address}}</span>
					</p>
				</div>
			</nav>
			<!--商品循环-->
			<vgoodsfor :goods='goods'></vgoodsfor>
			<ul class="order-list">
				<li @click="_transport()"> <span>配送方式</span> <span class="sel-text">{{ship}}</span></li>
				<li> <span>运费险</span> <span class="sel-text">确认收货前可退款</span></li>
				<li @click="_people()"> <span>发票类型</span> <span class="sel-text">{{people}}</span></li>
				<li class="msgli" v-show="people!='无需发票'"><span>发票抬头</span>
					<input type="text" class="msg" placeholder="发票抬头" v-model="msg" />
				</li>
				<li class="msgli"><span>买家留言</span>
					<input type="text" class="msg" placeholder="选填:填写内容已和卖家协商确认" v-model='message'/>
				</li>
			</ul>
			<group>
				<x-switch :title="'匿名购买'" v-model='nickUser'></x-switch>
			</group>
			<div class="lastma"></div>
		</div>
		<footer class="order-foot">
			<div class="left">
				共<span>{{count.sum}}</span>件 ， 总金额 <span>${{count.pri}}</span>
			</div>
			<div class="right" @click="_submitOrder()">提交订单</div>
		</footer>

		<popup v-model="addressTk" position="right">
			<div class="add1" v-show="add1">
				<header class="header header_position">
					<nav @click="_address()"></nav>
					修改地址
				</header>
				<div class="sel-address">
					<nav class="one-address" v-for=" (x,index) in address" :class="{'act':index==addressIndex}" @click="_changeAddress(index)">
						<p class="p1"><span>收货人：  </span><span class="reap-name">{{x.name}}</span> <span class="tell">{{x.tell}}</span></p>
						<p class="p2">
							<span>收货地址：</span><span>{{x.address}}-{{x.street}}</span>
						</p>
					</nav>
				</div>
				
				<footer class="addAddress" @click="_add1()">
				添加地址
				</footer>
			</div>
			<div class="add2" v-show="!add1">
				<header class="header header_position">
					<nav @click="_add1()"></nav>
					新增地址
					<span @click="_saveAddress()">保存</span>
				</header>
				<div style="height: 12vw;"></div>
				<group >
					 <x-input title="收货人" v-model="addata.user"></x-input>
					 <x-input title="联系电话" v-model="addata.tell"></x-input>
				</group>	
				<group class='xaddress'>
					<x-address  :title="title1" v-model="value1" :list="addressData1" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="选择城市" :show.sync="showAddress1"></x-address>
					<!--<cell title="上面value值" :value="value1"></cell>-->
				</group>
				<group >
					 <x-input title="详细街道信息" v-model="addata.street"></x-input>
				</group>
			</div>
		</popup>
		<popup v-model="show1">
			<!-- group already has a top border, so we need to hide header's bottom border-->
			<popup-header :left-text="'取消'" :right-text="'确定'" :title="'选择运送方式'" :show-bottom-border="false" @on-click-left="show1 = false" @on-click-right="show1 = false"></popup-header>
			<group gutter="0">
				<radio :options="['快递','MSN',  '邮政']" v-model='ship'></radio>
			</group>
		</popup>
		<popup v-model="show2">
			<!-- group already has a top border, so we need to hide header's bottom border-->
			<popup-header :left-text="'取消'" :right-text="'确定'" :title="'发票抬头类型'" :show-bottom-border="false" @on-click-left="show2 = false" @on-click-right="show2 = false"></popup-header>
			<group gutter="0">
				<radio :options="['无需发票','个人','企业']" v-model='people'></radio>
			</group>
		</popup>
		<toast v-model="msgError" position='meddle'	 type="cancel"  >发票抬头为空</toast>
		<loading :show="pay" :text="'支付中'"></loading>
		<actionsheet v-model="selpay" :menus="menus1" :close-on-clicking-mask="true"  show-cancel @on-click-menu='click'></actionsheet>
		<div class="gray_tk" v-if="showAddress1"></div>
	</div>
</template>

<script>
	//import 'static2/css/order.css'//static2 设置别名  对应 static  在js里加载有热重载效果
	
	import { XSwitch, Group, Cell, Popup, PopupHeader, Radio,Confirm,Toast,Loading,Actionsheet ,XInput } from 'vux'
	import { XAddress, ChinaAddressV2Data, XButton } from 'vux'
	import goodsfor from './goodsfor'
	export default {
		data() { //原始数据
			return {
				goods: [],
				imgs: 'http://m.caimiing.com',
				nickUser: false,
				addressTk: false,
				address: [{
						name: '奥特曼',
						address: "北京 北京市 朝阳区 立水桥  天通苑南天门 西门小区 ",
						tell: '15896643097',
						street:'2单元 3楼 212'
					},
					{
						name: '希特勒',
						address: "欧洲 德国 柏林  维也纳大街 456号",
						tell: '17600114702',
						street:'2单元 3楼 212'
					},
					{
						name: '斯大林',
						address: "欧洲 莫斯科 红厂  列宁大街 003号",
						tell: '17623651111',
						street:'2单元 3楼 212'
					}
				],
				addressIndex: 0,
				showAddress: {
					name: '奥特曼',
					address: "北京 北京市 朝阳区 立水桥  天通苑南天门 西门小区 2单元 3楼 212",
					tell: '15896643097'
				},
				show1: false,
				show2: false,
				ship: '快递',
				people:'无需发票',
				msg:'',
				message:'',
				msgError:false,
				pay:false,
				selpay:false,
				menus1:['支付宝','微信','银行卡'],
				add1:true,
				addata:{
					user:'',
					tell:'',
					street:''
				},
				title1: '新增地址',
				addressData1: ChinaAddressV2Data,
				value1: [],
				showAddress1: false

			}
		},
		props: { //传递参数            
		},
		computed: { //计算属性
			count() {
				let sum = 0;
				let pri = 0;
				this.goods.forEach((x, index) => {
					console.log(x.orther.num)
					sum += x.orther.num
					pri += x.orther.num * x.currentPrice
					console.log(x.orther.num * x.currentPrice)
				})
				let countObj = {
					sum: sum,
					pri: pri
				}
				return countObj
			}
		},
		components: { //注册模块       
			XSwitch,
			Group,
			Cell,
			Popup,
			PopupHeader,
			Radio,Confirm,Toast,Loading,Actionsheet,XInput,XAddress,XButton,
			'vgoodsfor':goodsfor
			
		},
		created() { //请求模块  比methods 快        
			
			this.goods = JSON.parse(this.$route.params.orderGoods)
		},
		mounted() { //比created慢  el 加载完毕
		},
		methods: { //方法
			_address() {
				this.addressTk = !this.addressTk
			},
			_changeAddress(index) {
				this.addressIndex = index
				this.showAddress = this.address[index]
			},
			_transport() {
				this.show1 = !this.show1
			},
			_people(){
				this.show2 = !this.show2
			},
			_submitOrder(){
				if(this.people!='无需发票'&&this.msg.trim()==''){
					this.msgError=true
					return
				}
				this.selpay=true

			},
			click (key) {//点击 支付方式  传值
			 let that=this
			 let orderObj={
			 	address:this.showAddress,
			 	goods:this.goods,
			 	nickUser:this.nickUser,
			 	payType:this.menus1[key],
			 	message:this.message
			 	
			 }
			 if(this.people!='无需发票'){
			 	orderObj.msg=this.msg
			 }
		    
		      
		      if(key!='cancel'){
				this.pay=true
		      }
		      orderObj=JSON.stringify(orderObj)//编译为字符串  不然刷新后消失
		      	setTimeout(() => {
					that.pay=false
					
					this.$router.push({ name: 'successOrder',query:{orderObj:orderObj},params:{type:1} });
			    }, 500)

		    },
		    _add1(){//点击新增地址
		    	this.add1=!this.add1
		    },
		    onShadowChange(ids, names) {
				console.log(ids, names)
				var namesAll = names.reduce(function(first, second) { 
				    return first + second; 
				});
				console.log(this.addata.street)
				this.addata.address=namesAll
			},
			_saveAddress(){
				this.address.push(this.addata)
				this._add1()
			}

		}
	}
</script>

<style lang="less" scoped="">
.weui-cells:before{
content: '';
border: none;	
}
.xaddress{
	margin-top: -10px;
}
	.order {
		position: relative;
		height: 100%;
		
	}
	.header_position{
		&>span{
				float: right;
				color: #ff5500;
				position: absolute;
				margin: 0 3vw;
				right: 0;
		}
	}
	.lastma {
		height: 30vw;
	}
	
	.order .vux-popup-dialog.vux-popup-right {
		width: 100%!important;
	}
	.addAddress{
		height: 10vw;
		background: #ff5500;
		color: #fff;
		line-height: 10vw;
		text-align: center;
		font-size: 4vw;
		position: absolute;
		bottom: 0;
		width: 100%;
		
	}
	.gray_tk{
		    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    tap-highlight-color: rgba(0, 0, 0, 0);
    z-index:501;
    -webkit-transition: opacity 400ms;
    transition: opacity 400ms;
    opacity: 1;
	}
</style>
<style lang="less" src="static2/css/order.less" scoped=""></style>