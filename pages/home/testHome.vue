<template>
    <div>
       <div class="promotion-wrapper">
       <div class="promotion-title">
        <div class="promotion-tabs">
          <ul>
              <li v-for="(item,index) in promotionNav" :key="index" @click="active = 'tab-container'+(index+1)" :class="{actived:active == 'tab-container'+(index+1)}"><p v-text="item.shortName || item.shopName"></p></li>
          </ul>
      </div>
      <a href="#">更多</a>
      </div>
      <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item  v-for="(item,index) in promotionList" :key="index" :id="'tab-container'+(index+1)">
      <div class="promotion-cont">
         <ul>
             <li v-for="(k,index) in item.products" :key="index">
                  <homeProduct :special="k"></homeProduct>
             </li>
         </ul>
      </div>
  </mt-tab-container-item>
</mt-tab-container>
    </div>
      </div>
</template>

<script>
    import {
        Toast,
        TabContainer,
        TabContainerItem
    } from 'mint-ui';
    import homeProduct from '@/components/homeProduct';
    import products from "@/service/products";
    console.log(products)
    export default {
        data() {
            return {
                promotionNav: [{
                    shortName: "抢购",
                    shopName: "抢购"
                }, {
                    shortName: "满减",
                    shopName: "满减"
                }, {
                    shortName: "满赠",
                    shopName: "满赠"
                }],
                promotionList: products,
                active: 'tab-container1'
            }
        },
        components: {
            homeProduct
        }
    }
</script>

<style scoped lang="less">
    @size : 37.5rem;
    @body_bgcolor: #f7f7f7;
    .promotion- {
        &wrapper {
            background-color: #fff;
        }
        &title {
            width: 100%;
            height: 42/@size;
            line-height: 42/@size;
            a {
                font-size: 13/@size;
                color: #666;
                float: right;
                display: block;
                height: 42/@size;
                padding-right: 30/@size;
            }
        }
        &tabs {
            float: left;
            li {
                padding: 0 24/@size;
                font-size: 13/@size;
                float: left;
                color: #666;
                transition: all .218s linear;
                p {
                    padding: 0 6/@size;
                    position: relative;
                    &:before {
                        transition: all .218s linear;
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background-color: #FE403B;
                        transform: rotateY(90deg);
                    }
                }
                &:active {
                    background-color: #f7f7f7;
                }
                &.actived {
                    color: #FE403B;
                    p {
                        &:before {
                            transform: rotateY(0);
                        }
                    }
                }
            }
        }
    }
</style>