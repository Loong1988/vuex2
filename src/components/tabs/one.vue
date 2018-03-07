<template>
	<div> 
	<x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true">主页</x-header>
	<p style="height: 10vw;"></p>

    <swiper loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
    
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
      <swiper-item v-for='item in time'><p>{{item.tit}} {{item.content}} </p></swiper-item>

    </swiper>
        <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
    <canvas id="myChart2" width="400px" height="400px"></canvas>
    <!--<vchart  ></vchart>-->
    <v-people2 ></v-people2>
    <p class="people"></p>

   
    <div class="last" style="height: 20vw;">  	
    </div>
    
  </div>

</template>

<script>
import {aaa,b} from '../../../static/js/common2.js'
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
import people2 from "./center/people2"
import chart from './chart'

import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]



const urlList = baseList.map((item, index) => ({
  url: 'http://m.baidu.com',
  img: item.img,
  title: ""
}))
var plan=[{name:'html',w:'width:90%'}
		,{name:'css',w:'width:90%'}
		,{name:'js',w:'width:80%'}
		,{name:'vue.js',w:'width:70%'}
		,{name:'angular.js',w:'width:60%'}
		,{name:'java',w:'width:60%'}
		,{name:'php',w:'width:30%'}
]

export default {
  name: 'one',

  components: {
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Swiper, GroupTitle, SwiperItem, XButton, Divider,
    "v-people2":people2,
    'vchart':chart
  },
   directives: {
    TransferDom
  },
    methods: {

    demo06_onIndexChange (index) {
      this.demo06_index = index
    }
  },
  data () {
    return {
		percent1: 30,
      percent2: 60,
      demo06_list: urlList,    
      demo06_index: 0,
      swiperItemIndex: 1,
      b:b,
      menus: {
        menu1: '分享朋友圈',
        menu2: '分享微信'
      },
      planlist:plan,
      showMenus: false,
    	time:[{tit:'2011',content:"毕业于三门峡大学."},
	{tit:'2012',content:"学习java，开始进入IT领域，成为一名程序员。入职于-北京金凯瑞名信息技术有限公司."},
	{tit:'2013',content:"近一年的项目事件，开始带团队接项目，成为公司最成功的项目小组"},
	{tit:'2014',content:"HTML5开始普遍流行，因为其通用性高而应用于各大平台。同时公司缺少web前端，我开始学习H5."},
	{tit:'2015',content:"近一年的学习，已经熟练掌握H5移动端和PC端的特性。"},
	{tit:'2016',content:"入职于北京矩信科技，主要产品为P2P类型，小红理财，9号钱庄"},
	{tit:'2017',content:"采蜜零钱上线"},]
    }
  },
      computed:{ //计算属性
      	comstyel(){
      		return "width:20%"

      	},
	    created(){//请求模块  比methods 快      


	    }
    },
    mounted() {
        var ctx2 = document.getElementById("myChart2");
        var myChart2 = new Chart(ctx2, {
            type: "bar",
            data: {
                labels: ["html", "css", "javaScript", "vue.js", "angular.js",'java','php'],
                datasets: [
                    {
                        label: "技术分析",
                        backgroundColor: "rgba(225,10,10,0.3)",
                        borderColor: "rgba(225,103,110,1)",
                        borderWidth: 3,
                        pointStrokeColor: "#fff",
                        pointStyle: "crossRot",
                        data: [91, 90, 77, 72,62,56,42,0],
                        cubicInterpolationMode: "monotone",
                        spanGaps: "false",
                        fill: "false"
                    }
                ]
            },
            options: {
                
            }

        });
    }
}
</script>

<style scoped lang="less">

.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}

.overwrite-title-demo {
  margin-top: 5px;
}
.text-scroll p[data-v-f5bf4570]{
	color: #222222;
 overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	
}
.people{
	margin: 5vw;
}

.plan-box{
height: 7vw;
display: flex;
align-items: center;
    width: 90%;
    margin: auto;
}	
	.plan{
	    height: 2vw;
	    width: 70%;
	    background: gainsboro;
	    border-radius: 1vw;
	    .show-plan{
	    	/*width: 90%;*/
	    	height: 100%;
	    	background: #09BB07;
	    	border-radius: 1vw;
	    	transition: w .5s;
	    }
	}

	.right{
		flex: auto;
		    text-align: left;
    padding-left: 8vw;
	}
.test-img{
	.d1,.d2{
		img{
			width: 10vw;
		}
	}
}
</style>
