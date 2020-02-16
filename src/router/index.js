import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  name: 'index',
  path: '/',
  redirect: { path: '/list' }
},
{
  name: 'list',
  path: '/list',
  component: () => import('@/views/List'),
  meta: {
    keepAlive: true
  }
},
{
  name: 'search',
  path: '/search',
  component: () => import('@/views/Search.vue'),
  meta: {
    keepAlive: false
  }
}
// {
//   name: 'map',
//   path: '/map',
//   component: () => import('@/views/Map.vue'),
//   meta: {
//     keepAlive: false
//   }
// }
]

const router = new VueRouter({
  routes
})

export default router
