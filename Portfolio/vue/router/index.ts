import About from 'Views/About.vue'
import Demo from 'Views/Demo.vue'
import Home from 'Views/Home.vue'
import NotFound from 'Views/NotFound.vue'
import Objectives from 'Views/Objectives.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
    {
      path: '/objectives',
      name: 'Objectives',
      component: Objectives,
    },
    // Should be the last route to handle 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})
