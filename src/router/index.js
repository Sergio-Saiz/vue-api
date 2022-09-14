import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import RequestResetPassword from '../views/RequestResetPassword.vue'
import ResendActivationEmail from '../views/ResendActivationEmail.vue'
import ActivateAccount from '../views/ActivateAccount.vue'
import ResetPassword from '../views/ResetPassword.vue'
// import { search } from 'core-js/fn/symbol'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requireAuth: true }
  },
  {
    path: '/request_reset_password',
    name: 'RequestResetPassword',
    component: RequestResetPassword,
  },
  {
    path: '/resend_activation_email',
    name: 'ResendActivationEmail',
    component: ResendActivationEmail,
  },
  {
    path: '/activate_account',
    name: 'ActivateAccount',
    component: ActivateAccount,
  },
  {
    path: '/reset_password',
    name: 'ResetPassword',
    component: ResetPassword,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Verificando si hay token en el estado
router.beforeEach((to, from, next)=>{
  const protectedRoute = to.matched.some(record => record.meta.token)
  if (protectedRoute && store.state.token === null) {
    next({name: 'Home'})
  } else {
    next()
  }
})

export default router
