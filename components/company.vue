<template>
      <div class="company">
          <a :href="'/shop.html?enterpriseId='+target.enterpriseId">
              <div class="clogo"><img v-lazy="target.imgUrl" alt=""></div>
              <div class="text into">
                  <h2>{{target.shopName}}</h2>
                  <h3 v-show="target.productCount">共{{target.productCount}}件商品</h3>
                  <h4 v-show="target.shopAdName">{{target.shopAdName}}</h4>
              </div>
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
    
    .into {
        background-image: url(../images/home/more@2x.png);
        background-position: right center;
        background-repeat: no-repeat;
        background-size: 6/@size auto;
    }
    
    .company {
        a {
            display: flex;
            align-items: center;
            height: 106/@size;
            padding: 18/@size 15/@size;
            position: relative;
            transition: all .218s linear;
            &:active{
                background-color: #f7f7f7;
            }
            .clogo {
                width: 70/@size;
                height: 70/@size;
                border-radius: 50%;
                overflow: hidden;
                position: absolute;
                background-color: #f7f7f7;
                top: 50%;
                margin-top: -35/@size;
                left: 15/@size;
                box-shadow: 0 3px 5px #ccc;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .text {
                padding-left: 90/@size;
                width: 100%;
                h2 {
                    width: 100%;
                    height: 12/@size;
                    line-height: 12/@size;
                    font-size: 14/@size;
                    .ellipsis();
                    color: #666;
                }
                h3,h4 {
                    width: 100%;
                    margin-top: 10/@size;
                    .ellipsis();
                    color: #999;
                    font-size: 12/@size;
                    height: 12/@size;
                    line-height: 12/@size;
                }
                h4 {
                    color: #FE403B;
                }
            }
        }
    }
</style>