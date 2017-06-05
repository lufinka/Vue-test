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
            <input type="number" v-model="count" name="number" class="product_number" />
            <i class="btn_add_number btn_add_number_ok right" @click="add"></i>
        </p>
        <p class="product_buy_info">
            <span class="left" v-if="target.promotionlimitNum == 0">库存</span>
            <span class="left" v-else="target.promotionlimitNum == 0">库存:</span>
            <span :class="{left: target.promotionlimitNum > 0,right:!target.promotionlimitNum || target.promotionlimitNum < 0,js_stock:true}">{{target.inventory}}</span>
            <span class="right js_stock" v-if="target.promotionlimitNum > 0">{{target.promotionlimitNum}}</span>
            <span class="right" v-if="target.promotionlimitNum > 0">限购:</span>
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
        mapActions
    } from 'vuex';
    import {
        Toast
    } from 'mint-ui';
    import {
        headers,
        cartAccount
    } from '@/service/getDate';
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
                if (this.target.promotionlimitNum > 0) {
                    if (newValue >= this.target.promotionlimitNum) {
                        this.count = this.target.promotionlimitNum;
                    } else if (newValue < this.target.inimumPacking) {
                        this.count = this.target.inimumPacking;
                    } else if (newValue == '') {
                        this.count = 0;
                        this.ishow = !0;
                    }
                } else {
                    if (newValue > this.target.inventory) {
                        this.count = this.target.inventory;
                    } else if (newValue < this.target.inimumPacking) {
                        this.count = this.target.inimumPacking;
                    } else if (newValue == '') {
                        this.count = 0;
                        this.ishow = !0;
                    }
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
                console.log(this.target.inimumPacking)
                this.count = parseInt(this.count);
                this.count += parseInt(this.target.inimumPacking);
            },
            addShopCarList: function() {
                this.$http.post('/order/api/cart/addShopCart', {
                    "productCodeCompany": this.target.productCodeCompany,
                    "spuCode": this.target.spuCode,
                    "productId": this.target.productId,
                    "productCount": this.count,
                    "productPrice": this.target.productPrice,
                    "supplyId": this.target.supplyId,
                    "productName": this.target.productName,
                    "promotionId": this.target.promotionId,
                    "promotionCollectionId": this.target.promotionCollectionId,
                    "manufactures": this.target.manufactures,
                    "specification": this.target.specification
                }, {
                    headers: headers
                }).then(action => {
                    Toast({
                        message: action.body.message,
                        position: 'bottom',
                        duration: 2000
                    });
                    if (action.body.data && action.body.data.result == "成功") {
                        this.getNum();
                        this.close();
                    }
                }, error => {
                    Toast({
                        message: error.body.message,
                        position: 'bottom',
                        duration: 2000
                    });
                })
            },
            getNum() {
                this.getShopCarNum({
                    fn: cartAccount,
                    that: this
                });
            },
             ...mapActions([
                'getShopCarNum'
            ])
        },
        components: {}
    }
</script>

<style lang="less" scoped>
    @size : 37.5rem;
    .notice {
        &_shadow {
            background-color: rgba(0, 0, 0, .3);
            position: fixed;
            z-index: 9;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
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