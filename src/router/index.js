import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/pages/index'
import register from '@/pages/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
