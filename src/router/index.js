import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '../modules/Auth/containers/UserLogin.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../modules/Auth/containers/UserRegister.vue')
  },
  {
    path: '/admin',
    name: 'administration',
    component: () => import('../components/Admin.vue')
  },
  {
    path: '/buses',
    name: 'Buses',
    component: () => import('../modules/Buses/containers/BusesContainer.vue')
  },
  {
    path: '/drivers',
    name: 'Drivers',
    component: () => import('../modules/Drivers/containers/DriversContainer.vue')
  },
  {
    path: '/travels',
    name: 'Travels',
    component: () => import('../modules/Travels/containers/TravelsContainer.vue')
  },
  {
    path: '/schedules',
    name: 'Schedules',
    component: () => import('../modules/Schedules/containers/SchedulesContainer.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
