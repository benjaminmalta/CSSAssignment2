import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import ViewCountries from '../components/ViewCountries'
import ViewDetails from '../components/ViewDetails'
import ViewMembers from '../components/ViewMembers'
import EditMember from '../components/EditMember'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/viewcountries',
    name: 'ViewCountries',
    component: ViewCountries
  },
  {
    path: '/viewdetails/:country',
    name: 'ViewDetails',
    component: ViewDetails
  },
  {
    path: '/viewmembers',
    name: 'ViewMembers',
    component: ViewMembers
  },
  {
    path: '/editmember/:index',
    name: 'EditMember',
    component: EditMember
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
