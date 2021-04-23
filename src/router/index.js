import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Consent',
    component: () => import('../pages/Consent/Consent.vue')
  },
  {
    path: '/phones',
    name: 'Phones',
    component: () => import('../pages/Phones/Phones.vue')
  },
  {
    path: '/phones/:brand',
    name: 'PhonesBrand',
    component: () => import('../pages/Phones/Phones.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../pages/Error/Error.vue')
  },
  {
    path: '/*',
    name: '404',
    component: () => import('../pages/404/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log({ to })
  if (to.matched.length === 0) return next({ path: '/404' })
  let isConsent = localStorage.getItem('isConsent')
  if (to.name !== 'Consent' && isConsent != 'true') return next({ path: '/' })
  return next()
})

export default router
