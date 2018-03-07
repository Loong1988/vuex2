<template>
	<div>

		<x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true">项目列表</x-header>
		<p style="height: 10vw;"></p>
		<div v-transfer-dom>
			<actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
		</div>
		<v-works></v-works>
		<div style="height: 10vw;"></div>

	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom } from 'vux'
	import works from './center/people4'
	//import axios from 'axios'
	import axios from '@/apis/request.js'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			Actionsheet,
			"v-works": works
		},
		data() {
			return {
				menus: {
					menu1: '分享朋友圈',
					menu2: '分享微信'
				},
				showMenus: false
			}
		},
		created() { //请求模块  比methods 快        
		},
		mounted() { //比created慢  el 加载完毕
			this.list()
			let pra={url:'/api2/overt/cash-task/list',a:56546}
			axios.post(pra.url,{ids:pra.a})
			.then((response)=>{
				console.log(response)
			})
		},
		methods: { //方法

			list() {
				let that=this
				let url2 = '/api2/overt/cash-task/list'
				//let fn1=axios.post(url2,{a:1})
				//let fn2=axios.post(url2,{b:2})
		/*		axios.all([fn1, fn2])
				.then(axios.spread(function (acct, perms) {
				    // 两个请求现在都执行完成
				    console.log(acct.data.maxPages)
				    console.log(perms.data.pageSize)
				}));*/
				//三层链式调用
/*				new Promise((resolve, reject) => {
				  axios.post(url2,{a:3})
				    .then((response)=>{
				      resolve({city: response.data.maxPages});
				    })
				    .catch((err)=>{
				      reject({city: '500--'})
				    });
				}).then(({city}) => {
					return   axios.post(url2,{city:city})
					.then((response)=>{
							return response.data.maxPages+1
					})
				}).then(ids => {
					axios.post(url2,{ids:ids})
					  .then((response)=>{
					  	console.log(response)
					})
				} )*/
				
				


				

			}

		}

	}
</script>

<style>
	.overwrite-title-demo {
		margin-top: 5px;
	}
</style>