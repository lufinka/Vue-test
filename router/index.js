import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('@/pages/index.vue')), 'index');
const register = r => require.ensure([], () => r(require('@/pages/register/register.vue')), 'register');
const home = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'home');
const login = r => require.ensure([], () => r(require('@/pages/login/login.vue')), 'login');
const commonHome = r => require.ensure([], () => r(require('@/pages/home/commonHome.vue')), 'common-home');
const testHome = r => require.ensure([], () => r(require('@/pages/home/testHome.vue')), 'test-home');

const App = r => require.ensure([], () => r(require('@/App.vue')), 'App')
const slide = r => require.ensure([], () => r(require('@/components/slide.vue')), 'common-home');
const homeProduct = r => require.ensure([], () => r(require('@/components/homeProduct.vue')), 'common-home');
const bussine = r => require.ensure([], () => r(require('@/components/bussine.vue')), 'common-home');
const goods = r => require.ensure([], () => r(require('@/components/goods.vue')), 'common-home');
const company = r => require.ensure([], () => r(require('@/components/company.vue')), 'common-home');
const addShopCar = r => require.ensure([], () => r(require('@/components/addShopCar.vue')), 'home');
const notice = r => require.ensure([], () => r(require('@/components/notice.vue')), 'home');

const a = r => require.ensure([], () => r(require('@/components/a.vue')), 'a');
const b = r => require.ensure([], () => r(require('@/components/b.vue')), 'b');
const c = r => require.ensure([], () => r(require('@/components/c.vue')), 'c');

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: App,
        children: [{
            path: '',
            name: 'login',
            component: login
            }, {
            path: '/home',
            name: 'home',
            component: home,
            children: [{
                path: '/commonHome',
                name: 'commonHome',
                component: commonHome,
                children:[{
                path: '/homeProduct',
                name: 'homeProduct',
                component: homeProduct
            }, {
                path: '/bussine',
                name: 'bussine',
                component: bussine
            }, {
                path: '/goods',
                name: 'goods',
                component: goods
            },{
                path: '/company',
                name: 'company',
                component: company
            }]
            }, {
                path: '/slide',
                name: 'slide',
                component: slide
            },{
                path: '',
                name: 'testHome',
                component: testHome
            }]
            }, {
            path: '/index',
            name: 'index',
            component: index,
            children: [{
                path: '/a',
                name: 'a',
                component: a
            }, {
                path: '/b',
                name: 'b',
                component: b
            }, {
                path: '/c',
                name: 'c',
                component: c
            }]
            }, {
            path: '/register',
            name: 'register',
            component: register
            }]
    }]
})