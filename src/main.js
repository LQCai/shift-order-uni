import Vue from 'vue'
import App from './App'
import store from './store'
import api from './api'
import $fly from '@/utils/request/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$fly = $fly

const app = new Vue({
  store,
  ...App
})
app.$mount()
