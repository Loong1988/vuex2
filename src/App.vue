<template>
  <div id="app">
		<transition name="right">
			<keep-alive v-if="$route.meta.keepAlive">
				<router-view class="child-view"> </router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive">
    			<!-- 这里是不被缓存的视图组件，比如 Edit！ -->
			</router-view>
		</transition>

    <tabbar v-if='$route.params.type!=1'>
      <tabbar-item selected :link="{path:'/one'}">
        <img slot="icon" src="../static/img/tabs/t1.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot :link="{path:'/two'}" icon-active>
        <img slot="icon" src="../static/img/tabs/t2.png">
        <span slot="label">商城</span>
      </tabbar-item>
      <tabbar-item  :link="{path:'/three'}">
        <img slot="icon" src="../static/img/tabs/t3.png">
        <span slot="label">项目</span>
      </tabbar-item>
      <tabbar-item badge="21" :link="{path:'/four'}">
        <img slot="icon" src="../static/img/tabs/t4.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
	
import { Tabbar, TabbarItem, Group, Cell,XButton } from 'vux'
import com from './components/tabs/common'
export default {
  name: 'app',
  components: {
        Tabbar,
    TabbarItem,
    Group,
    Cell,XButton
  },
  data(){//原始数据
    return{   
    	user:123,    	
    	indexdown: true,
    	com:com.all,
    	
    }
  },

}

</script>

<style lang="less" >
@import '~vux/src/styles/reset.less';
#app{
	height: 100%;
}
.weui-tabbar{
position: fixed!important;
}
#app  .weui-bar__item_on .weui-tabbar__label>span{
    color: #f75731!important;
}
body {
  background-color: #fbf9fe;
  overflow: hidden;
}
.tab{
	    display: flex;
    height: 10vw;
    justify-content: space-around;
        position: fixed;
    bottom: 30vw;
    width: 100%;
    background: #fff;
    line-height: 10vw;
    &>div{
    	flex: 1;
    	height: 100%;
    	text-align: center;
    	a{
    		display: block;
    		width: 100%;
    		height: 100%;
    	}
    }
    .act{
    	color: #f75731;
    }
}


.child-view {
	 opacity: 1;
/*  position: absolute;
  width:100%;
 
   left: 0;  
  top: 0;*/ 
}


/*.right-enter-active{
	transition: transform .4s;
transform: translate3d(0, 0, 0);
}
 .right-leave-active {
transition: opacity .4s;
}*/
.right-enter, .right-leave-active {
  /*left: 100%;*/
 /*opacity: 0;*/
/*transform: translate3d(100%, 0, 0);*/
opacity: 0
}

.vux-header{
	position: fixed!important;
	z-index: 10;
	width: 100%;
	top:0;
	
}
</style>
