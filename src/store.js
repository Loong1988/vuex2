import Vue from 'vue'
import Vuex from 'vuex'//vuex
Vue.use(Vuex)   
export default new Vuex.Store({
    state: {
    	peoples: 1,
    	shop:[
    	{	title:"纯野生黑枸杞1",
    		iconFileId:'/files/upload/1/_thumbs/images/cashTask/2017/12/SP0194.jpg',
	    	orther:{
	    		num:3,
				num1:1,
				pay1:"官方套餐",
				pay2:"分3期(0手续费)$999.66起/期"
	    	},
	    	currentPrice:49.9,
	    	LAST_E:0
    	}]
    },
    mutations: {    
    // 提交载荷 Payload，第一个参数就是state，第二个参数是载荷。
	    change(state, n) {
	      state.peoples = n
	    },
	    addShop(state, obj){
	    		state.shop.push(obj)
	    },
	    changeShop(state,obj){
	    		state.shop[obj.index].orther.num=obj.newNum;
	    }
  }
})
