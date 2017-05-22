<template>
<div class="info">
<div class="info-header">
   <div class="cont">
        <section class="head_goback" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#3c3c3c;stroke-width:2" transform="scale(1.2, 1.2)"/>
            </svg>
        </section>
        <div class="info-tabs">
              <ul>
                  <li @click="active = 'tab-container1'" :class="{actived:active == 'tab-container1'}">商品</li>
                  <li @click="active = 'tab-container2'" :class="{actived:active == 'tab-container2'}">品牌故事</li>
                  <li @click="active = 'tab-container3'" :class="{actived:active == 'tab-container3'}">说明书</li>
              </ul>
        </div>
        <div class="info-handle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</div>
<mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item id="tab-container1">111</mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">222</mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">333</mt-tab-container-item>
</mt-tab-container>
<ul class="icon_lists clear">
            
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home"></use>
                    </svg>
                    <div class="name">home</div>
                    <div class="fontclass">#icon-home</div>
                </li>
            
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shop"></use>
                    </svg>
                    <div class="name">shop</div>
                    <div class="fontclass">#icon-shop</div>
                </li>
            
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fanhui"></use>
                    </svg>
                    <div class="name">返回</div>
                    <div class="fontclass">#icon-fanhui</div>
                </li>
            
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-searchlist"></use>
                    </svg>
                    <div class="name">search_list</div>
                    <div class="fontclass">#icon-searchlist</div>
                </li>
            
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shopcar"></use>
                    </svg>
                    <div class="name">shopcar</div>
                    <div class="fontclass">#icon-shopcar</div>
                </li>
            
        </ul>
</div>
</template>

<script>
    import {
        Toast,
        TabContainer,
        TabContainerItem,
    } from 'mint-ui';
    export default {
        data() {
            return {
                active: 'tab-container1'
            }
        },
        mounted() {
            console.log(this.$route.params.productId, this.$route.params.enterpriseId)
        },
        components: {}
    }
</script>

<style lang="less" scoped>
    @size : 37.5rem;
    .info- {
        &header {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            height: 40/@size;
            border-bottom: solid 1px #ebedec;
            background-color: #fff;
            .cont{
                width: 100%;
                height: 100%;
                position: relative;
                .head_goback{
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 15/@size;
                    padding: 0 15/@size;
                }
            }
        }
    }
</style>