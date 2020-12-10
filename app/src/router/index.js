import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Logout from '@/pages/Logout'
import Secure from '@/pages/Secure'
import Storage from '../utils/Storage'

Vue.use(Router);
console.log(Storage)
const APP_TITLE = 'My Movie'

let routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: "Register"
    }
  },
  {
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
        path: '/home',
        name: 'secure.home',
        component: Home,
        meta: {
          title: 'Home',
          secure: true
        }
      }, {
        path: '/',
        name: 'secure.profile',
        component: Profile,
        meta: {
          title: 'Profile',
          secure: true
        }
      }
    ]
  },

]

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = APP_TITLE + (to.meta && to.meta.title ? ' > ' + to.meta.title : '');

  const isSecure = to.matched.some((route) => route.meta.secure);
  if (!isSecure) return next();
  if (Storage.has('my-movie-jwt')) {
    next();
    //  next({ name: 'vencimento'})

  } else {
    if (from.name != 'login')
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
  }

})
export default router;