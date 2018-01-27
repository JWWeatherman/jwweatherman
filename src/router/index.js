import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'animate.css'
import 'vue-awesome/icons'
import 'swiper/dist/css/swiper.css'

import Vue from 'vue'
import Router from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue'
import SocialSharing from 'vue-social-sharing'
import VueClipboard from 'vue-clipboard2'

import Home from '@/components/Home'
import MarkdownRenderer from '@/components/md_renderer/Main'

Vue.use(VueClipboard)
Vue.use(Router)
Vue.use(VueAwesomeSwiper)
Vue.component('icon', Icon)
Vue.use(BootstrapVue)
Vue.use(SocialSharing)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:threatModel',
      name: 'ThreatModel',
      component: MarkdownRenderer
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
