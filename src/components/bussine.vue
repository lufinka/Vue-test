<template>
    <div class="bussine">
        <a :href="'/product.html?productId='+target.productId+'&enterpriseId='+target.productSupplyId">
           <div class="img">
            <img v-lazy="target.productPicUrl"  :alt="target.productName">
            </div>
            <p>{{target.productName}}</p>
        </a>
    </div>
</template>

<script>
    export default {
        props: {
            target: {
                type: Object
            }
        },
        components: {}
    }
</script>

<style scoped lang="less">
    @size : 37.5rem;
    .ellipsis() {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .bussine {
        width: 100%;
        line-height: 16/@size;
        text-align: center;
        a {
            padding: 8/@size 15/@size 20/@size;
            transition: all .218s linear;
            display: block;
            &:active {
                background-color: #f7f7f7;
            }
            .img {
                width: 70/@size;
                height: 70/@size;
                display: inline-block;
                background-color: #f7f7f7;
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            p {
                font-size: 12/@size;
                color: #666;
                margin-top: 4/@size;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                height: 32/@size;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>