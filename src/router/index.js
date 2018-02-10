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
      path: '/login',
      name: 'Login',
      component: Login
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
            requiresAuth: true
          }
        },
        {
          path: '/class',
          name: 'Class',
          component: Class,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/period',
          name: 'Period',
          component: Period ,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/prod',
          name: 'Prod',
          component: Prod,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/transaction',
          name: 'Transaction',
          component: Transaction
        }
      ]
    }
  ]
});

//注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   //获取store里面的token
//   let token = store.state.token;
//   let admin = store.state.admin;
//   //判断要去的路由有没有requiresAuth
//   // if (to.meta.requiresAuth) {
//     if (to.meta.requiresAuth && token && admin == 'admin') { //admin login
//       next();
//     } else if (!to.meta.requiresAuth && to.meta.requiresAuth == 'user') {//普通用户
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
//       });
//     }
//   // } else {
//   //   next();//如果无需token,那么随它去吧
//   // }
// });

export default router;



