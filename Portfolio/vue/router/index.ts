import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Demo from '../views/Demo.vue'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo,
    },
    // Should be the last route to handle 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})
