<template>
	<div class="order">
		<v-header :title="title"></v-header>
		<div class="order-tab">
			<router-link v-for="(item,index) in tabs" :class="{'actived':active=='tab-container'+index}" to="" :key="index" v-on:click.native.stop.prevent="changeOrder(index)">{{item}}</router-link>
		</div>	
		<p class="tip">温馨提示：账期支付请去电脑端查看</p>
		<mt-tab-container v-model="active">
			<mt-tab-container-item id="tab-container0">
				<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :auto-fill="isfill"  :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				        <ul>
				    		<li v-for="(item,index) in orderList">
				    			<div class="head">
				    				<span class="fl" v-text="item.supplyName"></span>
				    				<span class="fr" v-text="item.orderStatusName"></span>
				    			</div>
				    			<div class="box">
				    				<p v-for="(data,index) in item.productList">
				    					<img :src="data.productPicUrl" />
				    				</p>
				    			</div>
				    			<p class="price">
				    				{{item.varietyNumber}}个品种共{{item.productNumber}}件商品
				    				<span>合计：<i>￥{{item.finalPay | priceFn}}</i></span>
				    			</p>
				    		</li>
				    	</ul>
				        <div slot="bottom" class="mint-loadmore-bottom">
				          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
				          <span v-show="bottomStatus === 'loading'">
				            <mt-spinner type="snake"></mt-spinner>
				          </span>
				        </div>
			     	</mt-loadmore>
				</div>
		  	</mt-tab-container-item>
			<mt-tab-container-item id="tab-container1">
			    21
			</mt-tab-container-item>
			<mt-tab-container-item id="tab-container2">
			    21
			</mt-tab-container-item>
			<mt-tab-container-item id="tab-container3">
			    21
			</mt-tab-container-item>
			<mt-tab-container-item id="tab-container4">
				2121
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
import header from '@/components/header';
import {
	TabContainer,
	TabContainerItem,
	InfiniteScroll,
	Indicator, 
	Loadmore
} from "mint-ui";
import {
    headers
} from '@/service/getDate';
export default{
	data(){
		return{
			title:"我的订单",
			type:'',
			orderList:[],
			pageNo:1,
			index:1,
			allLoaded: false,
        	bottomStatus: '',
        	isfill:false,
        	wrapperHeight: 0,
			bottomText:'上拉加载更多...',
			totalCount:'',
			active:'tab-container0',
			tabs:["全部","待付款","待发货","待收货","已完成"]
		}
	},
	filters:{
		priceFn: function (x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return false;
            }
            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 2) {
                s += '0';
            }
            return s;
        }
	},
	created(){
		//获取全部订单
		this.allOrder(0,this.index);
	},
	methods:{
		changeOrder:function(index){
			this.active='tab-container'+index;
			
		},
		allOrder:function(v,index){
			this.$http.post("/order/api/order/listOrder",{
				"pageNo":index,
				"pageSize":2,
				"param":{
					"orderStatus":v
				}
			},{
				"headers":headers
			}).then((reponse)=>{
				this.orderList = reponse.body.data.orderList
			},(error)=>{
				
			});
		},
		handleBottomChange(status) {
	        this.bottomStatus = status;
	    },
	    loadBottom() {
	        setTimeout(() => {
	          alert(3223);
	          this.$refs.loadmore.onBottomLoaded();
	        }, 1500);
	    }
	},
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	components:{
		'v-header':header
	}
}
</script>
<style lang="less">
@size:37.5rem;
@bodycolor:#f8f8f8;
body{
	background:@bodycolor;
}
	ul{
		li{
			padding: 0 10/@size 40/@size 10/@size;
			background: #fff;
			margin-bottom: 10/@size;
		}
	}
	.mint-loadmore-content{
		overflow-y: auto;
	}
	.mint-loadmore-bottom {
        span {
            display: inline-block;
            transition: .2s linear;
            vertical-align: middle;
            &.is-rotate {
                transform: rotate(180deg);
            }
        }
    }
	.order-{
		&tab{
			overflow:hidden;
			background:#fff;
			a{
				width: 20%;
				display: inline-block;
				color: #666;
				text-align: center;
				line-height: 50/@size;
				height: 50/@size;
				border-bottom: 3px solid #fff;
			}
			a.actived{
				color:#fe6862;
				border-bottom: 3px solid #fe6862;
			}
		}
	}
	.head{
		height: 44/@size;
		line-height: 44/@size;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
		overflow: hidden;
		.fl{
			float: left;
			background: url(../../images/icon_store_receive.png) no-repeat left center;
			background-size: 20/@size 20/@size;
			padding-left:25/@size;
		}
		.fr{
			float: right;
			color:#fe443b;
		}
	}
	.box{
		overflow: hidden;
		padding: 10/@size 0;
		background: url(../../images/icon_next_back.png) no-repeat right center;
		p{
			width: 77/@size;
			height: 77/@size;
			margin-right: 10/@size;
			float: left;
			img{
				width:100%;
				height: 100%;
			}
		}
	}
	.price{
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		text-align: right;
		height: 40/@size;
		line-height: 40/@size;
		font-size: 12/@size;
		span{
			margin-left: 10/@size;
			i{
				color: #fe403b;
				font-weight: 400;
				font-size: 18/@size;
			}
		}
	}
	.tip{
		height: 40/@size;
		line-height:40/@size;
	    font-size: 12/@size;
	    width: 100%;
	    padding-left: 10/@size;
	    color: #666;
	    background: #ffeaca;
	    border-top: 1px solid #eee;
	}
</style>