import { createRouter, createWebHistory } from '@ionic/vue-router';

import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
//import RidingSelector from '../views/RidingSelector.vue';





const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:'/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/ridingScreen',
    name: 'RidingScreen',
    component : ()  => import ('../views/RidingScreen.vue')
  },
  {
    path: '/ridingSelector',
    name: 'RidingSelector',
    //component : RidingSelector,
    component : () => import('../views/RidingSelector.vue'),
  },
  {
    path: '/ridingSelector/:id',
    component: () => import('../views/RidingSelectorRides.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
