<template>
    <div class="about">
        <v-header :title="title"></v-header>
        <div class="cont">
            <p>“1号药城”(mall.yaoex.com)作为岗岭集团旗下的电商三方平台，以医药批发流通行业（B2B）为目标市场，以生产企业营销解决方案为核心价值，专注于打造服务于生产企业的线上促销中心，为药品批发企业及药品零售企业提供一站式在线交易平台。</p>
            <h2><img src="../../images/usercenter/weixin.jpg" alt=""></h2>
            <h3>扫描二维码，了解更多</h3>
            <h1><img src="../../images/logo.png" alt=""></h1>
        </div>
    </div>
</template>

<script>
    import header from '@/components/header';
    export default {
        data() {
            return {
                title: '关于我们'
            }
        },
        components: {
            'v-header': header
        }
    }
</script>

<style scoped lang="less">
    @size: 37.5rem;
    .about {
        font-size: 12/@size;
        color: #666666;
        text-align: justify;
        line-height: 20/@size;
        .cont {
            padding: 24/@size;
            h1,
            h2,
            h3 {
                text-align: center;
            }
            h1{
                position: fixed;
                bottom: 20/@size;
                left: 0;
                right: 0;
            }
            h2{
                img{
                    width: 60%;
                }
            }
            img {
                width: 120/@size;
                margin-top: 30/@size;
            }
            h3 {
                font-size: 13/@size;
                font-weight: bold;
                color: #333;
            }
            p {
                text-indent: 1em;
            }
        }
    }
</style>