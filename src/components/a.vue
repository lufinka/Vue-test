<template>
   <div @click="increment">
    <div class="kkk">aaaaaa<span>{{ky}}</span></div>
    <h2 @click="increment">点击</h2>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
        
    export default {
        computed:mapGetters([
      'ky'
    ]),
    methods:mapActions([
      'increment'
    ])
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .kkk 
        color #f00 
        font-size 20px
        display flex
        flex 1 
            span 
                color #000
</style>