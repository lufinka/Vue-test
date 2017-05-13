<template>
    <div>
      <transition name="fade">
            <div class="notice_shadow" v-show="ishow"  @click="close"></div>
        </transition>
        <transition name="toggle-cart">
       <div class="notice_box2" v-if="ishow" >
       <div>
        <p>
            <i :class="{btn_reduce_number:true,left:true,btn_reduce_number_ok:count>=target.productDrug.minimum_packing*2}" @click="count>=target.productDrug.minimum_packing*2?count-=target.productDrug.minimum_packing:0"></i>
            <input type="number" v-model="count" name="number" class="product_number" />
            <i class="btn_add_number btn_add_number_ok right" @click="add"></i>
        </p>
        <p class="product_buy_info">
            <span class="left" v-if="target.productDrug.productPromotion.limit_num <= 0">库存</span>
            <span class="left" v-else>库存:</span>
            <span :class="{left:target.productDrug.productPromotion.limit_num > 0,right:target.productDrug.productPromotion.limit_num <= 0,js_stock:true}">{{target.inventory || target.currentInventory}}</span>
            <span class="right js_stock" v-if="target.productDrug.productPromotion.limit_num > 0">{{target.productDrug.productPromotion.limit_num}}</span>
            <span class="right" v-if="target.productDrug.productPromotion.limit_num > 0">限购:</span>
        </p>
        <p class="product_buy_info">
            <span class="left">最小可拆零包装</span>
            <span class="right js_min">{{target.productDrug.minimum_packing}}</span>
        </p>
        <p class="error_msg"></p>
        <a href="javascript:" @click.stop.prevent="addShopCarList" class="btn_next_ok js_add_list">加入进货单</a>
        </div>
        </div>
        </transition>
</div>
</template>

<script>
    import {
        Toast
    } from 'mint-ui';
    import {
        headers
    } from '@/service/getDate.js';
    export default {
        props: {
            target: {
                type: Object
            }
        },
        data() {
            return {
                count: 0,
                ishow: !1
            }
        },
        watch: {
            count: function(newValue, oldValue) {
                this.count = parseInt(this.count);
                if (this.target.productDrug.productPromotion.limit_num > 0) {
                    if (newValue > this.target.productDrug.productPromotion.limit_num  * this.target.productDrug.productPromotion.minimum_packing) {
                        this.count = this.target.productDrug.productPromotion.limit_num * this.target.productDrug.productPromotion.minimum_packing;
                    } else if (newValue < this.target.productDrug.productPromotion.minimum_packing) {
                        this.count = this.target.productDrug.minimum_packing;
                    } else if (newValue == '') {
                        this.count = 0;
                        this.ishow = !0;
                    }
                } else {
                    console.log(3);
                    if (newValue > this.target.productDrug.currentInventory) {
                        this.count =  this.target.productDrug.currentInventory;
                    } else if (newValue <  this.target.productDrug.minimum_packing) {
                        this.count =  this.target.productDrug.minimum_packing;
                    } else if (newValue == '') {
                        this.count = 0;
                        this.ishow = !0;
                    }
                }
            },
            target: function(newValue, oldValue) {
                this.count = parseInt(this.target.productDrug.minimum_packing);
            }
        },
        methods: {
            close: function() {
                this.ishow = !1;
                this.count = 0;
            },
            add: function() {
                this.count = parseInt(this.count);
                this.count += parseInt(this.target.productDrug.minimum_packing);
            },
            addShopCarList: function() {
                this.$http.post('/order/api/cart/addShopCart', {
                    "productCodeCompany":this.target.productDrug.productcode_company,
                    "spuCode":this.target.productDrug.spu_code,
                    "productId":this.target.productDrug.productPromotion.promotion_id,
                    "productCount": this.count,
                    "productPrice":this.target.productDrug.productPromotion.promotion_price,
                    "supplyId":this.productDrug.seller_code,
                    "productName":this.productDrug.short_name,
                    "promotionId":this.target.productDrug.productPromotion.promotion_id,
                    "promotionCollectionId": this.target.promotionCollectionId,
                    "manufactures":this.target.productDrug.factory_name_cn,
                    "specification":this.target.productDrug.spec
                }, {
                    headers: headers
                }).then(action => {
                    Toast({
                        message: action.body.message,
                        position: 'bottom',
                        duration: 2000
                    });
                    if (action.body.data.result == "成功") {
                        this.close();
                    }
                }, error => {
                    Toast({
                        message: error.body.message,
                        position: 'bottom',
                        duration: 2000
                    });
                })
            }
        },
        components: {}
    }
</script>

<style lang="less">
    @size : 37.5rem;
    .notice {
        &_box2 {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            right: 0;
            padding: 30/@size 40/@size 20/@size;
            height: 252/@size;
            text-align: center;
            width: 100%;
            background-color: #f8f8f8;
            input {
                border: 1px solid #eee;
                width: 170/@size;
                border-radius: 25px 25px;
                font-size: 15/@size;
                height: 35/@size
            }
            .left {
                float: left;
            }
            .right {
                float: right;
            }
            p:nth-child(1),
            p:nth-child(2) {
                border-bottom: 1px solid #efefef;
                padding-bottom: 18/@size;
            }
        }
    }
    
    .btn_reduce_number {
        display: inline-block;
        margin-top: 6.5/@size;
        width: 32/@size;
        height: 30/@size;
        background: url("../images/icon_reduce.jpg") center /contain no-repeat;
    }
    
    .btn_reduce_number_ok {
        background: url("../images/icon_reduce_ok.jpg") center /contain no-repeat;
    }
    
    .btn_add_number {
        display: inline-block;
        width: 32/@size;
        height: 30/@size;
        margin-top: 6.5/@size;
        background: url("../images/icon_add.jpg") center/contain no-repeat;
    }
    
    .btn_add_number_ok {
        background: url("../images/icon_add_ok.jpg") center/contain no-repeat;
    }
    
    .product_number {
        font-size: 15/@size;
        color: #333333;
        text-align: center;
        border: none;
    }
    
    .btn_next_ok {
        display: block;
        margin-top: 15/@size;
        color: #fff;
        line-height: 45/@size;
        height: 54/@size;
        background: url("../images/icon_next.png") center no-repeat;
        background-size: contain;
    }
    
    .product_buy_info {
        margin-top: 18/@size;
        color: #8f8e94;
        font-size: 13/@size;
        overflow: hidden;
    }
    
    .js_stock {
        color: #333;
        padding-left: 4/@size;
    }
</style>