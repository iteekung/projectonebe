import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
// import Axios from 'axios'
import router from './router'

// Vue.pototype.$http = Axios;
Vue.config.productionTip = false;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
