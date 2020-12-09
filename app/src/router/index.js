import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'
import Secure from '@/pages/Secure'
import Storage from '../utils/Storage'

Vue.use(Router);

const APP_TITLE = 'My Movie'

let routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "Login"
    }
  }, {
    path: '/logout',
    name: 'logout',
    component: Logout, meta: {
      title: "Logout"
    }
  }, {
    path: '/',
    component: Secure,
    meta: {
      title: 'Secure',
      secure: true
    }, children: [
      {
        path: '/profile',
        name: 'secure.profile',
        redirect: '/profile',
        component: Profile,
        meta: {
          title: 'Profile',
          secure: true
        }
      },

      {
        path: '/home',
        name: 'secure.home',
        component: Home,
        meta: {
          title: 'Home',
          secure:true
        }
      }
    ]
  },

]

const router = new Router({
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  window.document.title = APP_TITLE + (to.meta && to.meta.title ? ' > ' + to.meta.title : '');

  if (to.path != '/login' ) {
    next()
  }
  
  const isSecure = to.matched.some((route) => route.meta.secure);

  if (!isSecure) return next();
  const jwt = Storage.has('my-movie-jwt');
  if (jwt)
  {
    next();
          //  next({ name: 'vencimento'})
  
  } else {
    next({
      path: '/login',
      params: { nextUrl: to.fullPath }
  })
}

})
export default router;