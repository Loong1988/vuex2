<template>
	<div>
	    <div class="changeNumber">
		    <button @click="_changeNumber(1)">-</button>
		    <input type="number" disabled=""   :value="goods.orther.num" />
		    <button @click="_changeNumber(2)">+</button>
	    </div>

	</div>
</template>

<script>
	import { Confirm } from 'vux'
	export default{
	    data(){//原始数据
	        return{    
	        }
	    },
	    props: {//传递参数       
	    	goods:{},
	    	index:Number
	    },
	    computed:{ //计算属性
	    },
	    components: {//注册模块    
	    	Confirm
	    },
	    created(){//请求模块  比methods 快        
	    },
	    mounted() {//比created慢  el 加载完毕
	    	
	    },
	    methods: {//方法
	    	_changeNumber(val) {
console.log('-------0')
	    		if(val==1){
	    			if(this.goods.orther.num==1){
	    				this.showPlugin()
	    			}else{
	    				this.goods.orther.num--
	    			}
	    		}else{
	    			console.log(222)
	    			this.goods.orther.num++
	    		}
		    },
		    showPlugin () {
	    	  const _this = this//注意此时的this
		      this.$vux.confirm.show({//这个this是插件的this
		        title: '提示',
		        content: '删除此商品？',
		        onShow () {
		          console.log('plugin show')
		        },
		        onHide () {
		          console.log('plugin hide')
		        },
		        onCancel () {
		          console.log('1')
		        },
		        onConfirm () {
					_this.$store.state.shop.splice(_this.index,1)
		        }
		      })
		    }
	    }
	}
	
	
</script>

<style lang="less">
	            .changeNumber{
                    width: 32vw;
                    float: right;
                    input{
                        width: 10vw;
                        text-align: center;
                        height: 5vw;
                            border: 1px solid #ececec;
                    }
                    button{
                        width: 5vw;
                        height: 5vw;
                        background: gainsboro;
                            border: 1px solid #ececec;
                        color: #fff;
                    }
                }
</style>