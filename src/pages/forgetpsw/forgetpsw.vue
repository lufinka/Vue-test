<template>
    <div class="forgetpsw">
   		<v-header :title="title"></v-header>
   		<div class="forgetpswbox">
   			<ul>
	   			<li><input type="text" v-model="telphone" name="telphone" placeholder="请输入手机号" /></li>
	   			<li class="yzm"><input type="text" @keyup="checkPicYzm" v-model="picyzm" placeholder="请输入验证码" /><img @click="refresh" :src="getImgCode" /></li>
	   			<li class="phone"><input type="text" placeholder="请输入短信验证码" /><button @click="sendMessage" :class="{'disable':istelphone }">获取验证码</button></li>
	   		</ul>
	   		<p class="btn_next_ok">下一步</p>
   		</div>
    </div>
</template>

<script>
import router from '@/router'
import header from '@/components/header';
import {
    Toast
} from 'mint-ui';
import {
    headers
} from '@/service/getDate.js'
export default {
	data(){
		return{
			title:"忘记密码",
			glAppId:"1016",
			istelphone:false,
			uid:'',
			getImg:'',
			picyzm:'',	//图形验证码
			telphone: ''//手机号
		}
	},
	watch:{
		telphone(){
			if(/^[1][345678][0-9]{9}$/.test(this.telphone)){
				this.istelphone = true;
			}else{
				this.istelphone = false;
			}
		}
	},
	computed: {
        getImgCode() {
            this.uid = this.uuid();
            this.getImg = "http://web-ycaptcha.111.com.cn/getcode?glAppId=" + this.glAppId + "&glCaptchaId=" + this.uuid + "&t=" + Math.random();
            return this.getImg;
        }
    },
    methods:{
    	uuid: function(len, radix) {
	        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	        var chars = CHARS,
	            uuid = [],
	            i;
	        radix = radix || chars.length;
	
	        if (len) {
	            // Compact form
	            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	        } else {
	            // rfc4122, version 4 form
	            var r;
	
	            // rfc4122 requires these characters
	            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	            uuid[14] = '4';
	
	            // Fill in random data.  At i==19 set the high bits of clock sequence as
	            // per rfc4122, sec. 4.1.5
	            for (i = 0; i < 36; i++) {
	                if (!uuid[i]) {
	                    r = 0 | Math.random() * 16;
	                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	                }
	            }
	        }
	
	        return uuid.join('');
	    },
	    checkPicYzm:function(){
	    	if (this.picyzm.length != 4){
	    		return;
	    	}
	    	this.$http.jsonp("https://web-ycaptcha.111.com.cn/checkfrontjsonp?jsoncallback=jsonp2",{
	            params: {
	            	'glCaptchaCode':this.picyzm,
	                'glCaptchaId':this.uid,
	                'glAppId':this.glAppId
	            },
	            header:headers,
	            jsonp:'cb'
           }).then(function(res){
           		console.log("请求成功！！！")
            },function(){
                console.log("请求失败！！！")
            });	
	    },
	    refresh:function(){
	    	this.getImg = "http://web-ycaptcha.111.com.cn/getcode?glAppId=" + this.glAppId + "&glCaptchaId=" + this.uuid + "&t=" + Math.random();
	    },
	    sendMessage:function(){
	    	if(this.istelphone){
	    		this.$http.post('http://m.yaoex.com/passport/api/user/sendAppValidCodeSms',{
	    			params:{
	    				"glCaptchaToken" :self.picyzm,
                		"mobile" : this.telphone
	    			}
	    		}).then(function(response){
	    			
	    		},function(response){
	    			
	    		});
	    	}
	    }
    },
	components: {
        'v-header': header
    }
}
</script>

<style lang="less" scoped>
@size : 37.5rem;
@body_bgcolor: #f7f7f7;
.font-size(@s) {
    font-size: @s/@size;
}
.height(@s) {
    height: @s/@size;
}
.line-height(@s) {
    line-height: @s/@size;
}
.width(@s) {
    width: @s/@size;
}
body {
    background-color: #fff;
}
.forgetpswbox{
	width: 80%;
	margin:20/@size auto;
	ul{
		li{
			border-bottom: 1px solid #E6E6E6;
			padding: 10/@size 0;
			.font-size(14);
			margin-top: 10/@size;
			input{
				width: 100%;
				.height(30);
				.line-height(30);
			}
		}
		li.yzm{
		    input{
		        width: 150/@size;
		    }
		    img{
		    	float: right;
		        font-size: 12/@size;
		        color: #999;
		        width:80/@size;
		        height: 30/@size;
		        border: 1px solid #ccc;
		        margin-right: 8/@size;
		    }
		}
		li.phone{
			input{
		        width: 150/@size;
		    }
		    button {
		    	float: right;
		    	background-image: linear-gradient(-180deg, #eee, #eee);
		    	color: #b2b2b2;
	            border: none;
	            border-radius: 4/@size;
	            .font-size(12);
	            .width(78);
	            .height(28);
	            &.disable {
	            	background-image: linear-gradient(-180deg, #FF5B3B, #FE403B);
	           		color: #fff;
	           		background-color: transparent;
	            }
	        }
		}
	}
	p{
		padding: 0 10/@size;
		margin-top: 30/@size;
		border-radius:15/@size 15/@size;
		background: #eee;
		text-align: center;
		color:#b2b2b2;
		line-height:40/@size;
		font-size:14/@size;
		height: 40/@size;
	}
}
</style>