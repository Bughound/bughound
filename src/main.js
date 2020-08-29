import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { Plugins } from '@capacitor/core'
import '@capacitor-community/camera-preview'

const { SplashScreen } = Plugins

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted () {
    SplashScreen.hide()
  }
}).$mount('#app')
