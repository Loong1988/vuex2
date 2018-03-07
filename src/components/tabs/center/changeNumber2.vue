<template>
	<div>
	    <div class="changeNumber">
		    <button @click="_changeNumber(1)">-</button>
		    <input type="number"   :value="seltype.num" />
		    <button @click="_changeNumber(2)">+</button>
	    </div>
	</div>
</template>

<script>
	
	export default{
	    data(){//原始数据
	        return{    
	        	
	        }
	    },
	    props: {//传递参数       
	    	seltype:{}
//			num:{
//				
//			}
	    },
	    computed:{ //计算属性
	    },
	    components: {//注册模块               
	    },
	    created(){//请求模块  比methods 快        
	    },
	    mounted() {//比created慢  el 加载完毕
	    },
	    methods: {//方法
	    	_changeNumber(val) {
	    		if(val==1){
	    			if(this.seltype.num>1){
	    				this.seltype.num--
	    			}
	    		}else{
	    			this.seltype.num++
	    		}
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