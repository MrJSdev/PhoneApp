import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
