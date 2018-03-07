<template>
	<div class="bigone">
		<header class="header header_position">
			<nav onclick="javascript:history.go(-1);"></nav>
			朋友圈
		</header>
		<div class="head-img">
			<nav class="head-name">
				<p class="left">{{myName}}</p>
				<div class="right">
					<img src="/static/img/friend/wx.jpg" />
				</div>
			</nav>
		</div>
		<section class="firend-list">
			<nav class="box" v-for="(item,index) in items">
				<div class="left">
					<img :src="item.portrait" />
				</div>
				<div class="right" >
					<p class="name">{{item.name}}</p>
					<p class="cont">{{item.cont}}</p>
				</div>
				<div style="clear: both;float: inherit;"></div>
				<aside class="img-list">
					<div class="img-box" :style="{backgroundImage: 'url(' + imgs + ')'}" v-for="imgs in item.imglist" ></div>
				</aside>
				<div class="time">
					<span>{{item.time|fmt}}</span>
					<span class="discuss" @click="_selects(item)"></span>
					<transition name="zan"  >
						<div class="sel" v-show="item.sel">
							<nav class="my-zan" @click="_zan(index,item)">
							 <img src="/static/img/friend/myzan.png"/>赞
							</nav>
							<nav class="my-dis" @click="_dis(index,item)">
							<img src="/static/img/friend/mydis.png"/>评论
							</nav>
						</div>
					</transition>
	
				</div>
				<nav class="praise">
					<span v-for="pra in item.praise">{{pra}}</span>
				</nav>
				<div class="dis-details">
					<div v-for="dis in item.discuss"> 
					    <p @click="_oneDis(1,item,dis.name,dis.disId)"><span class="dis-name">{{dis.name}}：</span><span>{{dis.dis}}</span></p>
						<p @click="_oneDis(2,item,reply.name2,dis.disId)" v-for="reply in dis.reply" class="reply">
							<span>{{reply.name2}}</span> 回复<span>{{reply.name1}}</span>：{{reply.cont}}
						</p>
					</div>
				</div>

			</nav>
				
		</section>
		<transition name="foot">
			<footer  class="input-box" v-show="inputs">
				<!--<div class="input" id="inputdiv" contenteditable="true"></div>-->
				<input type="text" v-model="inputDis" class="input" id="inputdiv" :placeholder="disPlaceholder"/>
				<div class="btn" :class="{'act':inputDis}" @click="inputDis&&_sendDis(1)">发送</div>
			</footer>
		</transition>
		<div class="gray" v-show="inputs||gray" @click="_gary()">
		</div>

	</div>

</template>

<script>
	import axios from 'axios'//http
	import moment from 'moment'
	import Vue from 'vue'
Vue.filter('fmt', function (value,news) {
	let now=new Date().getTime()
	var re=parseInt((now-value)/(1000*60))
	if(re<60){
		return re+'分钟以前'
	}else if(re>60&&re<60*24){
		return parseInt(re/60)+'小时以前'
	}else{
		return parseInt(re/(60*24))+'天以前'
	}
	
})
	export default {
		data() { //原始数据
			return {
				items:{
					
				},
				selects:false,
				myName:'Loong',
				inputs:false,
				inputDis:'',
				nowDis:"",
				disType:1,
				disName:"",
				disId:0,
				disPlaceholder:'回复',
				gray:false
			}
		},
		props: { //传递参数            
		},
		computed: { //计算属性
			fmt(){
				return this.myName+'--'
			}
		},
		components: { //注册模块               
		},
		created() { //请求模块  比methods 快   
			var that=this
			axios.get('/api/friend', {
				//参数
			})
			.then(function (response) {
				console.log('axios--数据');
			  console.log(response.data.data);
			  that.items=response.data.data
			})
			.catch(function (error) {
			   console.log(error);
			});
			console.log(moment().format())
		},
		mounted() { //比created慢  el 加载完毕

		},
		methods: { //方法
			_selects(item){//隐藏显示  点赞 评论
				//console.log(item.id)
				this.items.filter((x)=>{//当前展开  其他闭合
					if(x.id==item.id){
						item.sel=!item.sel
					}else{
						x.sel=false
					}
				})
				this.gray=true
			},
			_zan(index,item){//点赞  取消点赞
				var indexof=this.items[index].praise.indexOf(this.myName)
				if(indexof==-1){
					this.items[index].praise.push(this.myName)
				}else{
					console.log(indexof)
					this.items[index].praise.pop()
				}
				this._selects(item)
				this.gray=false
			},
			_dis(index,item){
				this.disType=1;
				this.nowDis=item
				this._selects(item)
				this.inputs=true
				var idObj = document.getElementById('inputdiv');
				this.disPlaceholder='回复'+item.name//回复谁
                idObj.focus();
			},
			_gary(){
				this.inputs=false;
				this.gray=false;
				this.items.filter((x)=>{//当前展开  其他闭合
						x.sel=false
				})
			},
			_sendDis(){
				var dis=this.inputDis;
				if(this.disType==1){//自己单独评论
					this.nowDis.discuss.push({"name":this.myName,"dis":dis,"reply":[]})//缺少ID
				}else if(this.disType==2){//其他人的评论
					this.nowDis.discuss[this.disId].reply.push({"name2":this.myName,"name1":this.disName,"cont":dis})
				}
				
				this.nowDis=''
				this.inputDis=''
				this._gary()
			},
			_oneDis(type,item,name,id){//其他人评论
				if(name==this.myName){//自己的对话记录   取消
					return
				}
				
				this.inputs=true;
				this.disPlaceholder="回复"+name
				this.nowDis=item;
				this.disType=2;
				this.disName=name;
				this.disId=id;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
.textdiv{
			min-height: 5vw;
		}
	@w2: 5.4;
	.bigone{
		background: #f8f8f8!important;
	}
	html>body {
		height: 100%;
		background: #f8f8f8!important;
	}
	
	.head-img {
		height: 300vw/@w2;
		margin-top: 10vw;
		background: url('/static/img/friend/friend-bac.jpg') no-repeat;
		background-size: cover;
		position: relative;
		margin-bottom: 50vw/@w2;
		    border: 1px solid #DDDDDD;
		.head-name {
			height: 125vw/@w2;
			display: flex;
			width: 90%;
			margin: auto;
			left: 0;
			right: 0;
			position: absolute;
			bottom: -10vw;
			.left {
				flex: auto;
				line-height: 100vw/@w2;
				text-align: right;
				padding-right: 3vw;
				color: #fff;
				font-weight: 900;
			}
			.right {
				height: 125vw/@w2;
				width: 125vw/@w2;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.firend-list {
		
		.box {
			/*display: flex;*/
			overflow: hidden;
			margin-top: 20vw/@w2;
			border-bottom: 1px solid #e2e2e2;
    		padding: 0 3.7vw 5vw;
			&>div{
				float: left;
			}
			.left {
				width: 64vw/@w2;
				height: 64vw/@w2;
				margin-right: 12vw/@w2;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.right {
				font-size: 4vw;
				font-family: tahoma, "microsoft yahei", "微软雅黑";
				overflow: hidden;
				width: 78vw;
				.name {
					color: #586a87;
				}
				.cont {}
			}
			.img-list{
				margin-top: 10vw/@w2;
			    display: flex;
			    width: 78vw;
			    flex-wrap: wrap;
			    float: right;
				.img-box{
					width: 130vw/@w2;
					height: 130vw/@w2;
					background: url('/static/img/friend/cont1.jpg') no-repeat center center;
					background-size: cover;
					margin-bottom: 2.8vw;
				}
				/*2 5 8*/
				.img-box:nth-child(3n-1){
					margin:0 2.8vw;
				}

			}
			.time{
				width: 78vw;
				float: right;
				font-size: 3.5vw;
				color: #AAAAAA;
				position: relative;
				.discuss{
					        display: inline-block;
				    width: 15vw;
				    height: 7vw;
				    background: url(/static/img/friend/dis.png) no-repeat center right / 5vw 5vw;
				    float: right;
				}

			}
			.praise{
				width: 74vw;
			    float: right;
			    background: #eeeeee;
			    padding: 0 2vw;
			    span{
			    	    color: #586a87;
			    	padding: 1vw 1vw 1vw 5vw;
			    	background: url('/static/img/friend/zan.png') no-repeat center left ~'/'4vw;
			    }
			}
			.dis-details{
				width: 74vw;
    			float: right;
    			background: #eeeeee;
    			    padding: 0 2vw;
    			.dis-name{
    				    color: #586a87
    			}
    			.reply{
    				span{
    					color: #586a87
    				}
    			}
			}
		}
	}
				.sel{
					position: absolute;
					    top: -50%;
    					right: 7vw;
					height: 60vw/@w2;
					width: 290vw/@w2;
					/*width: 0;*/
					background: #383a3f;
					
    				
    				border-radius: 1vw;
    				display: flex;
    				overflow: hidden;
    				z-index: 100;
    				nav{
    					flex:1;
    					display: flex;
    					align-items: center;
    					justify-content: center;
    					color: #fff;
    					min-width: 15vw;
    					img{
    						width: 32vw/@w2;
    						margin-right: 2vw;
    					}
    				}
    				.my-zan:after{
    					content: "";
    					width: 1px;
    					height: 80%;
    					background: #313338;
    					position: absolute;
    					left: 50%;
    					top: 10%;
    				}
				}
	.input-box{
		display: flex;
		width: 92vw;
		padding:  4vw;
		background: #fff;
		    align-items: flex-end;
		        position: fixed;
    bottom: 0;
        z-index: 100;
		.input{
			width: 78vw;
			display: block;
		    min-height: 8vw;
			font-size: 4vw;
			margin-right: 2vw;
			border: 1px solid #AAAAAA;
			max-height: 24vw;
    		overflow-y: scroll;
	    }
	    .btn{
    	    width: 12vw;
		    background: #ddd;
		    height: 8vw;
	        line-height: 8vw;
		    text-align: center;
		    color: #fff;
		    border-radius: 1vw;
	    }
	    .act{
	    	 background: #1AAD19
	    }
	}
.zan-enter-active, .zan-leave-active {
 transition: all 0.5s; 
}
.zan-enter, .zan-leave-to  {

opacity: 0;
width: 1vw;
}
.foot-enter-active, .foot-leave-active {
 transition: transform 0.5s; 
 opacity: 1;
transform: translateY(0);
}
.foot-enter, .foot-leave-to  {
opacity: 0;
transform: translateY(100%);
}
.gray{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	
}
</style>