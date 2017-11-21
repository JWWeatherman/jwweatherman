import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SocialSharing from 'vue-social-sharing'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource'
import 'vue-awesome/icons'
import 'swiper/dist/css/swiper.css'
import Icon from 'vue-awesome/components/Icon'

Vue.use(Router)
Vue.use(SocialSharing)
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
Vue.component('icon', Icon)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
