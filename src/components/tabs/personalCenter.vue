<template>
	<section>
		<header class="header header_position">
			<nav @click="_back()"></nav>
			{{tit}}{{$store.state.peoples}}
			<!--{{$store.state.peoples}}-->
			<span class="head" @click="_right()">
				<img src="../../../static/img/betiful.jpg"/>
				<span></span>
			</span>
		</header>
		<p style="height: 10vw;"></p>
		<transition name="silderRight">
			<div class="tk-right" v-if="tk"> <!--右侧弹框-->
			    <group title="菜单">
			      <radio :options="radio003" v-model='radio001Value'  @on-change="change"></radio>
			    </group>
			</div>
		</transition>
		<transition name="gary" v-if="tk" > <!--遮罩-->
			<div class="tk-gary" @click="_right()"></div>
		</transition>
		<transition name="right2">
		  	<keep-alive class='router-center' v-if="$route.meta.keepAlive">
				<router-view class="child-view"> </router-view>
			</keep-alive>
			<router-view class='router-center' v-if="!$route.meta.keepAlive">
    			<!-- 这里是不被缓存的视图组件，比如 Edit！ -->
			</router-view>
		</transition >
	</section>
</template>

<script>
import { Radio, Group } from 'vux'	
export default{
    data(){//原始数据
        return{ 
        	tit:'基本信息',
        	titType:true,
        	tk:false,
        	radio001Value: '1',
        	radio003: [{
		        icon: './static/img/popleCenter/pople1.png',
		        key: '1',
		        value: '基本信息'
		      }, {
		        icon: './static/img/popleCenter/pople2.png',
		        key: '2',
		        value: '个人技能'
		      }, {
		        icon: './static/img/popleCenter/pople3.png',
		        key: '3',
		        value: '工作历程'
		      }
		      , {
		        icon: './static/img/popleCenter/pople4.png',
		        key: '4',
		        value: '作品鉴赏'
		      }]
        }
    },
    props: {//传递参数            
    },
    methods: {//方法
    	_right(){
    		console.log(this.tk)
    		this.tk=!this.tk;
    	},
    	change (value, label) {
	      console.log('change:', value, label)
	      this.$router.push({ path: '/center/people'+value +'/1'}) 
	      this.tit=label
	      if(value==4){
	      	this.titType=false
	      }
	      this._right()
	      this.$store.commit('change',1) 
	    },
	    _back(){
	    	var type=this.$store.state.peoples
	    	if(type==1){
	    		this.$router.push({ path: '/four'})
	    	}else{
	    		this.$router.go(-1)
	    		this.$store.commit('change',1) 
	    	}
	    		
	    		
	    }
    },
    computed:{ //计算属性
    	
    },
    components: {//注册模块    
    	Radio,
    	Group
    },
    created(){//请求模块  比methods 快        
    }
    
}
	
</script>

<style lang="less">
	.header_position{
		z-index: 100;
		.head{
			display: block;
			position: absolute; 
			right: 2vw;
			top: 0;
			width: 10vw;
			height: 10vw;
			
			img{
				width: 8vw;
				height: 8vw;
				border-radius: 4vw;
				margin: 1vw;
				z-index: 10;
			}
			span{
				display: block;
				position: absolute;
				width: 1.6vw;
				height: 1.6vw;
				border-radius: 0.8vw;
				background: #f75731;
				top: 0.5vw;
				right: 0.5vw;
				z-index: 20;
			}
		}
	}
	.tk-right{
		width: 60vw;
		height: 100%;
		position: fixed;
		top: 10vw;
		right: 0;
		background: #fff;
		z-index:600 ;
		transition: all .6s;
	}
	.tk-gary{
	    z-index: 590;
	    position: fixed;
	    top: 10vw;
	    right: 0;
	    background: rgba(0, 0, 0, 0.6);
	    width: 100%;
	    height: 100vh;
	    transition: all .6s;
	}
.silderRight-enter-active, .silderRight-leave-active {
 /*left: 0;*/
/*transform: translate(0px, 0);*/
}
.silderRight-enter, .silderRight-leave-active {
  /*left: 100%;*/
 /*transform: translate(100%, 0);*/
transform: translateX(100%);
opacity: 0;
}
.gary-enter, .gary-leave-active {
opacity: 0;
}
.vux-radio-icon{
	height: auto!important;
}
.router-center{
	  position: absolute;
  width:100%;
  transition: all .5s;
  opacity: 1;
}
.right2-enter-active, .right2-leave-active {
transition: all .5s;
}
.right2-enter, .right2-leave-active {
 opacity: 0;
}
</style>