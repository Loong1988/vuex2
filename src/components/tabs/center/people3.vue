<template>
	<section>
		<ul class="timer-shaft">
				<li class="time1" v-for="item in time">
					<div class="left">
						<img src="../../../../static/img/popleCenter/time1.png">
					</div>
					<div class="right">
						<p class="p1">{{item.tit}}</p>
						<p class="p2">{{item.content}}</p>
					</div>
				</li>

			</ul>
	</section>
</template>

<script>
	import { Flow, FlowState, FlowLine } from 'vux'
	export default{
	    data(){//原始数据
	        return{     
	        	time:[{tit:'2011',content:"毕业于三门峡大学."},
	        	{tit:'2012',content:"学习java，开始进入IT领域，成为一名程序员。入职于-北京金凯瑞名信息技术有限公司."},
	        	{tit:'2013',content:"一年多的项目实践，开始带团队接项目，成为公司最成功的项目小组"},
	        	{tit:'2014',content:"HTML5开始普遍流行，因为其通用性高而应用于各大平台。同时公司缺少web前端，我开始学习H5."},
	        	{tit:'2015',content:"近一年的学习，已经熟练掌握H5移动端和PC端的特性。"},
	        	{tit:'2016',content:"入职于北京矩信科技，主要产品为P2P类型，小红理财，9号钱庄"},
	        	{tit:'2017',content:"采蜜零钱上线"},]
	        }
	    },
	    props: {//传递参数            
	    },
	    methods: {//方法
	    },
	    computed:{ //计算属性
	    },
	    components: {//注册模块      
	    	Flow, FlowState, FlowLine
	    },
	    created(){//请求模块  比methods 快        
	    }
	}
	
</script>

<style lang="less">
	@w:10.8;
	html,body{
		height: 100%;    background-color: #fbf9fe;
	}
	    .timer-shaft{
        position: relative;
        .time1:last-child .left:after{
            content: '';
            width: 0;
        }
        .time1{
            height: 194vw/@w;
            //border: 1px solid;
            display: flex;
            .left{
                width: 160vw/@w;
                height: 100%;
                position: relative;
                img{
                    width: 70vw/@w;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    z-index: 4;
                    
                }
            }
            .left:after{
               content: "";
               display: block;
               position: absolute;
               width: 2px;
               height:100%;
               background: #fff38f;
               top:50%;
               left: 0;
               right: 0;
               margin: auto;
            }
            .right{
                    flex: 1;
                    padding-right: 56vw/@w;
                .p1{
                    font-size: 40vw/@w;
                    color: #222222;
                    margin: 45vw/@w 0 10vw/@w 0;
                }
                .p2{
                    font-size: 36vw/@w;
                    color: #666666;
                }
            }
        }
    }
</style>