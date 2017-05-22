import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('@/pages/index.vue')), 'index');
const register = r => require.ensure([], () => r(require('@/pages/register/register.vue')), 'register');
const home = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'home');
const login = r => require.ensure([], () => r(require('@/pages/login/login.vue')), 'login');
const commonHome = r => require.ensure([], () => r(require('@/pages/home/commonHome.vue')), 'common-home');
const testHome = r => require.ensure([], () => r(require('@/pages/home/testHome.vue')), 'test-home');
const pull = r => require.ensure([], () => r(require('@/pages/pull.vue')), 'pull');
const info = r => require.ensure([], () => r(require('@/pages/info/info.vue')), 'info');

const App = r => require.ensure([], () => r(require('@/App.vue')), 'App')
const slide = r => require.ensure([], () => r(require('@/components/slide.vue')), 'common-home');
const homeProduct = r => require.ensure([], () => r(require('@/components/homeProduct.vue')), 'homeProduct');
const testProduct = r => require.ensure([], () => r(require('@/components/testProduct.vue')), 'test-home');
const bussine = r => require.ensure([], () => r(require('@/components/bussine.vue')), 'common-home');
const goods = r => require.ensure([], () => r(require('@/components/goods.vue')), 'common-home');
const company = r => require.ensure([], () => r(require('@/components/company.vue')), 'common-home');
const addShopCar = r => require.ensure([], () => r(require('@/components/addShopCar.vue')), 'home');
const notice = r => require.ensure([], () => r(require('@/components/notice.vue')), 'home');
const city = r => require.ensure([], () => r(require('@/components/city.vue')), 'home');
const search = r => require.ensure([], () => r(require('@/components/search.vue')), 'home');

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
            redirect: 'login',
            component: login
            }, {
            path: '/login',
            name: 'login',
            component: login
            }, {
            path: '/pull',
            name: 'pull',
            component: pull
            },{
            path: '/info/:productId/:enterpriseId',
            name: 'info',
            component: info
            }, {
            path: '/home',
            redirect: 'home',
            component: home,
            children: [{
                path: '',
                name: 'testHome',
                component: testHome,
                children: [{
                    path: '/testProduct',
                    name: 'testProduct',
                    component: testProduct
                          }]
            }, {
                path: '/commonHome',
                name: 'commonHome',
                component: commonHome,
                children: [{
                    path: '/bussine',
                    name: 'bussine',
                    component: bussine
            }, {
                    path: '/goods',
                    name: 'goods',
                    component: goods
            }, {
                    path: '/company',
                    name: 'company',
                    component: company
            }]
            }, {
                path: '/homeProduct',
                name: 'homeProduct',
                component: homeProduct
            }, {
                path: '/addShopCar',
                name: 'addShopCar',
                component: addShopCar
            }, {
                path: '/slide',
                name: 'slide',
                component: slide
            }, {
                path: '/city',
                name: 'city',
                component: city
            }, {
                path: '/search',
                name: 'search',
                component: search
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