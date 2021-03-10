import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: 'home',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'home',
      hidden: false,
      meta: {
        title: '首页'
      },
      component: () => import('@/view/home')
    }
  ]
})
