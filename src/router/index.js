import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  name: 'index',
  path: '/',
  redirect: { path: '/list' }
},
{
  name: 'List',
  path: '/list',
  component: () => import('@/views/List.vue')
},
{
  name: 'Map',
  path: '/map',
  component: () => import('@/views/Map.vue')
}
]

const router = new VueRouter({
  routes
})

export default router
