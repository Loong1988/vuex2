<template>
	<div>
		
<div class="one" v-for="goods in goods">
				<nav class="left">
					<img :src="imgs+goods.iconFileId" />
				</nav>
				<nav class="right">
					<p class="p1">{{goods.title}}</p>
					<p class="p2">{{goods.orther.pay1}}</p>
					<p class="p3">{{goods.orther.pay2}}</p>
					<div class="p5"><span>${{goods.currentPrice}}</span>
						<span class="num">x{{goods.orther.num }}</span>
					</div>
				</nav>
			</div>
	</div>

</template>

<script>
	
	export default{
	    data(){//原始数据
	        return{  
	        	imgs: 'http://m.caimiing.com'
	        }
	    },
	    props: {//传递参数     
	    	goods:{}
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
	    }
	}
	
	
</script>

<style lang="less" scoped="">
         .one {
         display: flex;
         background: #fafafa;
             padding: 3vw;
         .first{
             width: 16vw;
             background: url('/static/img/shop/nosel.png') no-repeat center center ~'/'5vw;
         }
         .firstAct{
             background: url('/static/img/shop/sel.png') no-repeat center center ~'/'5vw;
         }
         .left {
             width: 28vw;
             height: 28vw;
             img {
                 width: 100%;
                 height: 100%;
             }
         }
         .right{
            flex: auto;
            padding: 0 3vw;
            max-width: 60vw;
            .weui-cells{
                padding: 0;
                margin: 0;
            }
            .weui-cell{
                padding: 0;
                margin: 0;
            }
            .vux-number-selector svg {
                fill: #051b28;
            }
            .p1{
                font-size: 3.5vw; 
            }
            .p2,.p3{
                color: #999;
                font-size: 3vw;
            }
            .p5{
                &>span{
                        color: #FF5000;
                }
                .num{
                    color: #666;
                        float: right;
                }

            }
         }
     }	
</style>