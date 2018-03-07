// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource' //引入
import App from './App'
import one from './components/tabs/one'
import two from './components/tabs/two'
import three from './components/tabs/three'
import four from './components/tabs/four'
import login from './components/tabs/login' //登录页面
import out from './components/tabs/out' //退出
import com from './components/tabs/common'
import center from './components/tabs/personalCenter'
import people1 from './components/tabs/center/people1'
import people2 from './components/tabs/center/people2'
import people3 from './components/tabs/center/people3'
import people4 from './components/tabs/center/people4'
import shop from './components/tabs/center/shop'
import order from './components/tabs/center/order'
import about from './components/tabs/center/about'
import worksDetail from './components/tabs/center/worksDetail'
import positions from './components/tabs/center/position'
import friend from './components/tabs/center/friend'
import successOrder from './components/tabs/center/successOrder'
import test001 from './components/tabs/test001'
import VueLazyload from 'vue-lazyload'//懒加载
import store from './store.js'//vuex
//import moment from 'moment'
Vue.use(VueLazyload, {
	error: '/static/img/add.png',//这个是请求失败后显示的图片
	loading: '/static/img/add.gif',//这个是加载的loading过渡效果
	try: 2 // 这个是加载图片数量
})
//Vue.use(moment);
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f8075181a0fcb456d0d2aa7adf0dd851',
plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor']
});
Vue.filter('num2', function (value,news) {//全局过滤器
	return value.toFixed(news);
})

Vue.use(VueRouter)
Vue.use(VueResource); //注册
const routes = [
	
	{
		path: '/',
		component: one
	},
	{
		path: '/one',
		component: one
	},
	{
		path: '/two',
		component: two,
		name: 'two',
		meta: { keepAlive: true }
	},

	{
		path: '/three',
		name: 'three',
		component: three
		//component: people4
	},
	{
		path: '/four',
		component: four,
		name: 'four',
		/*meta: { keepAlive: true }*/

	},

	{
		path: '/login/:type',
		component: login
	}, {
		path: '/out',
		component: out
	}, 	
	{
		path: '/about/:type',
		component: about,
	},
	{
		path: '/positions/:type',
		component: positions,
	},
	{
		path: '/shop/:type',
		component: shop,
	},
	{
		path: '/order/:type/:orderGoods',
		name:'order',
		component: order
	},
	{
		path: '/successOrder/:type',
		name:'successOrder',
		component: successOrder
	},
	{
		path: '/friend/:type',
		name:"friend",
		component: friend,
		meta: { keepAlive: true }
	},
		{
		path: '/test001/:type',
		component: test001,
	},
	{
		path: '/center/:type',
		component: center,
		children: [
			{
				path: '/',
				component: people1
			},
		     {
				path: '/center/people1/:type',
				component: people1
			},		
			{
				path: '/center/people2/:type',
				component: people2
			},
			,		{
				path: '/center/people3/:type',
				component: people3
			},
			,		{
				path: '/center/people4/:type',
				component: people4
			},
			{
				path: '/center/worksDetail/:type/:index',
				component: worksDetail,
			},
		]
	}
]
Vue.prototype.flobalFun = function (num){//全局方法
	console.log('这是全据'+num)
}
Vue.prototype.goRouter = function (urls){//全局方法	
	this.$router.push({ path: urls }) 
}
Vue.prototype.HOST = '/api2'//跨域接口 全局字段
const router = new VueRouter({
	mode: 'history',
	//scrollBehavior,
	routes,
	scrollBehavior (to, from, savedPosition) {
    //  期望滚动到哪个的位置
    console.log('-----scrollBehavior-')
    console.log(savedPosition)
    return savedPosition
   }
})

router.beforeEach((to, from, next) => { //路由拦截，个人中心必须登录
	if(to.path == '/four') {
		console.log(sessionStorage.accessToken + 'denlu')
		if(sessionStorage.accessToken == 'true') {
			next()
			com.all = true
		} else {
			console.log('login')
			com.all = false
			next({
				path: '/login/1',
			})
		}
	} else {
		next()
		com.all = true
	}
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box')