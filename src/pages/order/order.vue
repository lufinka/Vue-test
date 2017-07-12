<template>
	<div class="order">
		<v-header :title="title"></v-header>
		<div class="order-tab">
			<router-link v-for="(item,index) in tabs" :class="{'actived':active=='tab-container'+index}" to="" :key="index" v-on:click.native.stop.prevent="active = 'tab-container'+(index)">{{item}}</router-link>
		</div>	
		<p class="tip">温馨提示：账期支付请去电脑端查看</p>
		<mt-tab-container v-model="active"> 
			<mt-tab-container-item v-for = "(item,index) in allOrderList" :key="index" :id="'tab-container'+index">
				<div class="promotion-cont" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :auto-fill="isfill"  :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded[index]" ref="loadmore">
				        <ul>
				    		<li v-for="(v,key) in item" :key="key">
				    			<div class="head">
				    				<span class="fl" v-text="v.supplyName"></span>
				    				<span class="fr" v-text="v.orderStatusName"></span>
				    			</div>
				    			<div class="box">
				    				<p v-for="(data,n) in v.productList" :key="n">
				    					<img :src="data.productPicUrl" />
				    				</p>
				    			</div>
				    			<p class="price">
				    				{{v.varietyNumber}}个品种共{{v.productNumber}}件商品
				    				<span>合计：<i>￥{{v.finalPay | priceFn}}</i></span>
				    			</p>
				    		</li>
				    	</ul>
				        <div slot="bottom" class="mint-loadmore-bottom">
				          <span v-show="bottomStatus[index] !== 'loading'" :class="{ 'is-rotate': bottomStatus[index] === 'drop' }">↑</span>
				          <span v-show="bottomStatus[index] === 'loading'">
				            <mt-spinner type="snake"></mt-spinner>
				          </span>
				        </div>
			     	</mt-loadmore>
				</div>
		  	</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
    import header from '@/components/header';
    import {
        headers
    } from '@/service/getDate';
    export default {
        data() {
            return {
                title: "我的订单",
                type: '',
                orderList: [],
                allOrderList: [
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                orderStatus: 0,
                pageNo: [1, 1, 1, 1, 1], //页码
                limit: [0, 0, 0, 0, 0], //总页码
                index: 1,
                nowindex: 1,
                allLoaded: [false, false, false, false, false], //是否允许加载
                bottomStatus: ['', '', '', '', ''],
                isfill: false,
                wrapperHeight: 0,
                totalCount: '',
                active: 'tab-container0',
                tabs: ["全部", "待付款", "待发货", "待收货", "已完成"]
            }
        },
        filters: {
            priceFn: function(x) {
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
        created() {
            //获取全部订单
            this.allOrder(0);
        },
        methods: {
            allOrder: function(num) {
                this.$http.post("/order/api/order/listOrder", {
                    "pageNo": this.pageNo[num],
                    "pageSize": 1,
                    "param": {
                        "orderStatus": this.orderStatus
                    }
                }, {
                    "headers": headers
                }).then((reponse) => {
                    if (reponse.body.statusCode == 0) {
                        this.limit[num] = reponse.body.data.pageCount;
                        for (var i = 0; i < reponse.body.data.orderList.length; i++) {
                            this.allOrderList[num].push(reponse.body.data.orderList[i]);
                        }
                    } else {
                        this.$toast({
                            message: response.body.message,
                            position: 'center',
                            duration: 2000
                        });
                    }
                }, (error) => {});
            },
            handleBottomChange(status) {
                this.bottomStatus[this.nowIndex] = status;
            },
            loadBottom() {
                setTimeout(() => {
                    this.$refs.loadmore.onBottomLoaded();
                }, 1500);
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper[0].getBoundingClientRect().top;
        },
        components: {
            'v-header': header
        }
    }
</script>
<style lang="less" scoped>
    @size: 37.5rem;
    @bodycolor: #f8f8f8;
    body {
        background: @bodycolor;
    }
    
    ul {
        overflow: hidden;
        li {
            float: left;
            width: 100%;
            padding: 0 10/@size 40/@size 10/@size;
            background: #fff;
            margin-bottom: 10/@size;
        }
    }
    
    .mint-loadmore-content {
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
    
    .order- {
        &tab {
            overflow: hidden;
            background: #fff;
            a {
                width: 20%;
                display: inline-block;
                color: #666;
                text-align: center;
                line-height: 50/@size;
                height: 50/@size;
                position: relative;
                &:before {
                    content: "";
                    bottom: 0;
                    width: 100%;
                    transition: all .218s linear;
                    height: 3px;
                    transform: rotateY(90deg);
                    left: 0;
                    background: #fff;
                    position: absolute;
                }
            }
            a.actived {
                color: #fe6862;
                &:before {
                    background: #fe6862;
                    transform: rotateY(0);
                }
            }
        }
    }
    
    .head {
        height: 44/@size;
        line-height: 44/@size;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        .fl {
            float: left;
            background: url(../../images/icon_store_receive.png) no-repeat left center;
            background-size: 20/@size 20/@size;
            padding-left: 25/@size;
        }
        .fr {
            float: right;
            color: #fe443b;
        }
    }
    
    .box {
        overflow: hidden;
        padding: 10/@size 0;
        background: url(../../images/icon_next_back.png) no-repeat right center;
        p {
            width: 77/@size;
            height: 77/@size;
            margin-right: 10/@size;
            float: left;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    
    .price {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        text-align: right;
        height: 40/@size;
        line-height: 40/@size;
        font-size: 12/@size;
        span {
            margin-left: 10/@size;
            i {
                color: #fe403b;
                font-weight: 400;
                font-size: 18/@size;
            }
        }
    }
    
    .tip {
        height: 40/@size;
        line-height: 40/@size;
        font-size: 12/@size;
        width: 100%;
        padding-left: 10/@size;
        color: #666;
        background: #ffeaca;
        border-top: 1px solid #eee;
    }
</style>