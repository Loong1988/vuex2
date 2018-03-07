<template>
	<div>
		<header class="header header_position">
			<nav onclick="javascript:history.go(-1);"></nav>
			购物车
			<span class="edit" @click="_edit()">编辑</span>
		</header>
		<main class='shop'>
			<transition name='del'>
				<header class="tit-head" v-show="isdel" >
				<div class="del" @click="_del()">删除</div>
				<!--<div class="allsel" @click="_allsel(1)">{{allsel}}</div>-->
				</header>
			</transition>
			<div class="one" v-for="(goods,index) in shop">
					<nav class="first" @click="_select(goods)" :class="{'firstAct':goods.LAST_E==1}">
					</nav>
					<nav class="left">
						<img :src="imgs+goods.iconFileId"/>
					</nav>
					<nav class="right">
						<p class="p1">{{goods.title}}</p>
						<p class="p2">{{goods.orther.pay1}}</p>
						<p class="p3">{{goods.orther.pay2}}</p>
						<div class="p5">
						    <span>${{goods.currentPrice*goods.orther.num |num2(2)}}</span>
						    <!--<div>
							    <button @click="_changeNumber(1,index,goods)">-</button>
							    <input type="number"   :value="goods.orther.num" />
							    <button @click="_changeNumber(2,index,goods)">+</button>
						    </div>-->
						 <vchangenumber :goods='goods' :index='index'></vchangenumber>
						</div>
					</nav>
			</div>
			<div style="height: 20vw;"></div>
		</main>
		<nav class="no_list" v-show="shop.length==0">没有添加商品，快去<span @click="goRouter('/two')">购物</span>吧</nav>
		<footer class="shop-footer">
			<div class="d1" @click="_allsel(2)" >
				<nav :class="{'firstAct':footallsel}">{{allsel}}</nav>
			</div>
			<div class="d2">
				合计：{{allPrice}}元
			</div>
			<div class="d3" :class="{'fonts':selGoods.length>0}" @click="selGoods.length>0&&_order()">
				结算（{{selGoods.length}}）
			</div>
		</footer>
		
	</div>
</template>

<script>
	import changeNumber from './changeNumber'
	import 'static2/css/shop.css'//static2 设置别名  对应 static  在js里加载有热重载效果
	import { Group, XNumber } from 'vux'//加减
	export default{
	    data(){//原始数据
	        return{   
	        	shop:[],
	        	imgs: 'http://m.caimiing.com',
	        	firstAct:0,
	        	isdel:false,
				allsel:'全选',
				footallsel:false,
				orderGoods:[]
	        }
	    },
	    props: {//传递参数            
	    },
	    computed:{ //计算属性
			allPrice(){
				let sum=0
				this.shop.forEach((x,index)=>{
					if(x.LAST_E==1){
						sum+=x.currentPrice*x.orther.num
					}
				})
				return sum.toFixed(2)
			},
			selGoods(){
				let selgoods=this.shop.filter((x,index)=>{
					return x.LAST_E==1
				})
				this.orderGoods=selgoods
				return selgoods
			}
	    },
	    components: {//注册模块      
	    	Group, XNumber
	    	,'vchangenumber':changeNumber
	    },
	    created(){//请求模块  比methods 快        
	    },
	    mounted() {//比created慢  el 加载完毕
			this.shop=this.$store.state.shop
	    },
	    methods: {//方法
		    _select(goods){
		    	if(goods.LAST_E==0){
		    		goods.LAST_E=1
		    	}else{
		    		goods.LAST_E=0
		    	}
		    	let arr=this.shop.filter((x,index)=>{
					return x.LAST_E==1
				})
		    	if(arr.length!=this.shop.length){
		    		this.footallsel=false
		    		this.allsel='全选'
		    	}
		    	
		    },
		    _edit(){
		    	this.isdel=!this.isdel
		    },
		    _allsel(type){
		    	if(this.allsel=='全选'){
		    		this.allsel='取消'
		    		this.$store.state.shop.forEach((x,index)=>{
		    			x.LAST_E=1
		    		})
		    	}else{
		    		this.allsel='全选'
		    		this.$store.state.shop.forEach((x,index)=>{
		    			x.LAST_E=0
		    		})
		    	}
		    	if(type==2){
		    		this.footallsel=!this.footallsel
		    	}

		    },
		    _del(){
		    	var arr=[]
		    	this.shop.forEach((x,index)=>{
	    			if(x.LAST_E==0){
	    				arr.push(x)
	    			}
		    	})
		    	this.shop=arr
		    	if(this.shop.length==0){
		    		this._edit()
		    	}
		    },
		    _order(){
		    	
		    	this.$router.push({ name: 'order', params: {type:1,orderGoods:JSON.stringify(this.orderGoods)} });
		    }
	    }
	}
	
	
</script>

<style lang="less">
.shop{
	    margin-top: 10vw;
}
.del-enter-active, .del-leave-active {
    transition: all .5s;
}
.del-enter, .del-leave-active {
    /*transform: translate3d(0, -10vw, 0);*/
   margin-top: -10vw;
}
.no_list{
	    position: absolute;
    top: 27%;
    text-align: center;
    width: 100%;
    color: #666;
    span{
    	color: #FF5000;
    	text-decoration: underline;
    }
}
</style>