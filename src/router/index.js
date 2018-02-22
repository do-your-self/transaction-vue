import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'
import Login from '@/pages/login.vue'
import Index from '@/pages/index.vue'
import Company from '@/pages/company.vue'
import Class from '@/pages/class.vue'
import Period from '@/pages/period.vue'
import Prod from '@/pages/prod.vue'
import Transaction from '@/pages/transaction.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/company',
          name: 'Company',
          component: Company,
          meta: {
            requiresAuth: "admin"
          }
        },
        {
          path: '/class',
          name: 'Class',
          component: Class,
          meta: {
            requiresAuth: "admin"
          }
        },
        {
          path: '/period',
          name: 'Period',
          component: Period ,
          meta: {
            requiresAuth: "admin"
          }
        },
        {
          path: '/prod',
          name: 'Prod',
          component: Prod,
          meta: {
            requiresAuth: "admin"
          }
        },
        {
          path: '/transaction',
          name: 'Transaction',
          component: Transaction,
          meta: {
            requiresAuth: "user"
          }
        }
      ]
    }
  ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  let admin = store.state.admin;
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth == admin ||to.meta.requiresAuth === true) { 
    next();
  } else {
    next({
      path: '/login',
      query: {redirect: to.fullPath}  
    });
  }
});

export default router;



