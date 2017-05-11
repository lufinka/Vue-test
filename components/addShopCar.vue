<template>
    <div>
      <transition name="fade">
            <div class="notice_shadow" v-show="ishow"  @click="close"></div>
        </transition>
        <transition name="toggle-cart">
       <div class="notice_box2" v-show="ishow" >
       <div>
        <p>
            <i :class="{btn_reduce_number:true,left:true,btn_reduce_number_ok:count>=target.inimumPacking*2}" @click="count>=target.inimumPacking*2?count-=target.inimumPacking:0"></i>
            <input type="number" v-model="count" name="number" class="product_number"  />
            <i class="btn_add_number btn_add_number_ok right" @click="add"></i>
        </p>
        <p class="product_buy_info">
            <span class="left">库存</span>
            <span class="right js_stock">{{target.inventory}}</span>
        </p>
        <p class="product_buy_info">
            <span class="left">最小可拆零包装</span>
            <span class="right js_min">{{target.productSpec}}</span>
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
                if (newValue > this.target.inventory) {
                    this.count = this.target.inventory;
                } else if (newValue < this.target.inimumPacking) {
                    this.count = this.target.inimumPacking;
                } else if (newValue == '') {
                    this.count = 0;
                    this.ishow = !0;
                }
            },
            target: function(newValue, oldValue) {
                this.count = this.target.inimumPacking;
            }
        },
        methods: {
            close: function() {
                this.ishow = !1;
                this.count = 0;
            },
            add: function() {
                this.count = parseInt(this.count);
                this.count += this.target.inimumPacking;
            },
            addShopCarList: function() {
                this.$http.post('/order/api/cart/addShopCart', {
                    "productCodeCompany": this.target.productCodeCompany,
                    "spuCode": this.target.productCode,
                    "productId": this.target.productId,
                    "productCount": this.count,
                    "productPrice": this.target.productPrice,
                    "supplyId": this.target.productSupplyId,
                    "productName": this.target.productSupplyName,
                    "promotionId": this.target.promotionId,
                    "promotionCollectionId": this.target.promotionCollectionId,
                    "manufactures": this.target.factoryName,
                    "specification": this.target.productSpec
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
    .notice {
        &_box2 {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            right: 0;
            padding: 30/37.5rem 40/37.5rem 20/37.5rem;
            height: 252/37.5rem;
            text-align: center;
            width: 100%;
            background-color: #f8f8f8;
            input {
                border: 1px solid #eee;
                width: 170/37.5rem;
                border-radius: 25px 25px;
                height: 35/37.5rem
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
                padding-bottom: 18/37.5rem;
            }
        }
    }
    
    .btn_reduce_number {
        display: inline-block;
        margin-top: 6.5/37.5rem;
        width: 32/37.5rem;
        height: 30/37.5rem;
        background: url("../images/icon_reduce.jpg") center /contain no-repeat;
    }
    
    .btn_reduce_number_ok {
        background: url("../images/icon_reduce_ok.jpg") center /contain no-repeat;
    }
    
    .btn_add_number {
        display: inline-block;
        width: 32/37.5rem;
        height: 30/37.5rem;
        margin-top: 6.5/37.5rem;
        background: url("../images/icon_add.jpg") center/contain no-repeat;
    }
    
    .btn_add_number_ok {
        background: url("../images/icon_add_ok.jpg") center/contain no-repeat;
    }
    
    .product_number {
        font-size: 15/37.5rem;
        color: #333333;
        text-align: center;
        border: none;
    }
    
    .btn_next_ok {
        display: block;
        margin-top: 15/37.5rem;
        color: #fff;
        line-height: 45/37.5rem;
        height: 54/37.5rem;
        background: url("../images/icon_next.png") center no-repeat;
        background-size: contain;
    }
    
    .product_buy_info {
        margin-top: 18/37.5rem;
        color: #8f8e94;
        font-size: 13/37.5rem;
        overflow: hidden;
    }
</style>