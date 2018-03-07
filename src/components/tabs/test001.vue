<template>
	<div>
		<group>
			<x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></x-address>
			<cell title="上面value值" :value="value"></cell>
		</group>

	</div>
</template>

<script>
	import { Group, XAddress, ChinaAddressV2Data, XButton, Cell} from 'vux'
	export default {
		data() { //原始数据
			return {
				title: '默认为空',
				addressData: ChinaAddressV2Data,
				value: [],
				showAddress: false

			}
		},
		props: { //传递参数            
		},
		computed: { //计算属性
		},
		components: { //注册模块        
			Group,
			XAddress,
			XButton,
			Cell
		},
		created() { //请求模块  比methods 快        
		},
		mounted() { //比created慢  el 加载完毕
		},
		methods: { //方法
/*			doShowAddress() {
				this.showAddress = true
				setTimeout(() => {
					this.showAddress = false
				}, 2000)
			},*/
			onShadowChange(ids, names) {
				console.log(ids, names)
			},
			logHide(str) {
				console.log('on-hide', str)
			},
			logShow(str) {
				console.log('on-show')
			}
		}
	}
</script>

<style lang="less">

</style>