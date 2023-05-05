import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import AppMain from '@/views/AppMain/index.vue'
import AppCart from '@/views/AppCart/index.vue'
import AppMine from '@/views/AppMine/index.vue'
import AppList from '@/views/AppList/index.vue'
import AppDetail from '@/views/AppDetail/index.vue'
import AppLogin from '@/views/AppLogin/index.vue'
import AppRegister from '@/views/AppRegister/index.vue'
import AppNotFound from '@/views/AppNotFound/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/main', name: 'main', component: AppMain },
    { path: '/cart', name: 'cart', component: AppCart },
    { path: '/mine', name: 'mine', component: AppMine },
    { path: '/list', name: 'list', component: AppList, meta: { hideFooter: true } },
    { path: '/detail/:proid', name: 'detail', component: AppDetail, meta: { hideFooter: true } },
    { path: '/login', name: 'login', component: AppLogin, meta: { hideFooter: true } },
    { path: '/register', name: 'register', component: AppRegister, meta: { hideFooter: true } },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: AppNotFound,
      meta: { hideFooter: true }
    }
  ]
})

export default router
