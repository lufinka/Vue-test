<template>
   <div>
    <v-header ref="kanyu" :ky="ky"></v-header>
    <router-link to="/a">aaa</router-link>
    <router-link to="/b">bbb</router-link>
    <router-link to="/c">ccc</router-link>
    <router-view></router-view>
    <h2 @click="ck">ck</h2>
    </div>
</template>

<script>
    import header from '@/components/header';

    export default {
        data() {
            return {
                a: 'asdkajdka',
                ky: {
                name: '康裕',
                age: '26'
            }
            }
        },
        methods:{
          ck(){
              this.$refs.kanyu.kk();
          },
            _drop(e){
                console.log(e)
            }
        },
        components: {
            'v-header': header
        },events:{
            'lufinka':(e)=> {
                this._drop(e);
            }
        }
    }
</script>

<style>
    li {
        flex: 1;
    }
</style>