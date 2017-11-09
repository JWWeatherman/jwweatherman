import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SocialSharing from 'vue-social-sharing'

Vue.use(Router)
Vue.use(SocialSharing)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
