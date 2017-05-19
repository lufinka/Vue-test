<template>
<div class="info">
<div class="info-header">
    <section class="head_goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(0,0,0);stroke-width:2" transform="scale(1.2, 1.2)"/>
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
<mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item id="tab-container1">111</mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">222</mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">333</mt-tab-container-item>
</mt-tab-container>
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
    .info- {
        &header {}
    }
</style>