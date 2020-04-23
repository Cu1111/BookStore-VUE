import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/mainPage/Main'
import Login from '@/components/login/Login'
import Detail from '@/components/detailPage/Detail'
import AllBooks from '@/components/allBooks/AllBooks'
import Cart from '@/components/cart/Cart'
import Search from '@/components/search/Search'
import Buy from '@/components/buy/Buy'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/all',
      name: 'All',
      component: AllBooks
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    }
  ]
})
