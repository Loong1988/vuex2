<template>
<section>

		 <x-header :left-options="{backText: ''}">登陆</x-header>
		<ul class="login">
			<li>
				<span class="lo1">手机号</span>
				<input class="lo2 tell"  type="tel" placeholder="仅支持中国大陆手机号" v-model="tell"/>
			</li>
			<li>
				<span class="lo1">验证码</span>
				<input class="lo2 code"  type="tel" placeholder="请输入手机验证码"  v-model="code"/>
				<div class="lo3" :class="{dis:!flat}" @click="flat&&_send()">{{send}}</div>
			</li>
		</ul>
		
		
		<div class="btn_center" @click="_logins()">
			手机登陆
		</div>
		 <toast v-model="showPositionValue" position='meddle'	 type="cancel"  >{{errors}}</toast>
</section>
</template>

<script>
	import { XHeader } from 'vux'
	import { Toast,Confirm  } from 'vux'
export default{
    data(){//原始数据
        return{
        	tell:'123',
        	code:'',
        	send:'发送',
        	wait:6,
        	flat:true,
        	showPositionValue: false,
        	errors:'sdf'
        }
    },
    props: {//传递参数            
    },
    methods: {//方法
    	_logins(){
    		console.log(this.tell)
    		
    		if(this.tell==''){
    			this._showTk("手机号为空")
    			return false;
    		}
    		if(this.code==''){
    			this._showTk("验证码为空")
    			return false;
    		}
    		if(this.code!=123){
    			this._showTk("验证码错误")
    			return false;
    		}
    		if(this.tell=='123'){
    			sessionStorage.setItem('accessToken', true);
    			this.$router.push({ path: '/four' }) 
    		}else{
    			sessionStorage.setItem('accessToken', false);
    		}
    	},
    	_send(){
    		var time = setInterval(()=>{
    			console.log(222)
    			this.send=this.wait
				this.wait--;
				this.flat=false;
				if(this.wait==0){
					clearTimeout(time)
					this.wait=6;
					this.send='发送'
					this.flat=true;
				}
           },1000)
    	},
    	_showTk(texts){
    		this.showPositionValue = true
    		this.errors=texts
    	}
    },
    computed:{ //计算属性
    },
    components: {//注册模块           
    	XHeader,Toast,Confirm 
    },
    created(){//请求模块  比methods 快        
    }
}
</script>

<style  lang="less" >
@import url("../../../static/css/common.css");
@import url("../../../static/css/login.css");
.login {
    margin-top: 17.75vw;
    background: #FFFFFF;
}
input{
	height: 100%;
	outline: none;
}
.btn_center {
    width: 62.5vw;
    height: 12.5vw;
    background: #ecc027;
    color: #FFFFFF;
    border-radius: 2vw;
    text-align: center;
    margin: 4.6875vw auto;
    line-height: 12.5vw;
    font-size: 3.75VW;
}
.vux-header{
	background: #fff;
}
.vux-header-title{
	color: #222222!important;
}
.left-arrow:before{
	border: 1px solid #222!important;
    border-width: 1px 0 0 1px!important;
}
.dis{
	color: #aaa;
	border: 1px solid #aaa;
}
</style>
