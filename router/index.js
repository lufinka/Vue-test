import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import login from '@/components/login'
import a from '@/components/a'
import b from '@/components/b'
import c from '@/components/c'
import index from '@/pages/index'
import register from '@/pages/register'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: App,
        children: [{
            path: '',
            name: 'login',
            component: login
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