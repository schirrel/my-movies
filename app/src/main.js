// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles.css';
import './assets/creative-tim/blk-design-system/assets/css/blk-design-system.min.css';
import './assets/creative-tim/blk-design-system/assets/css/nucleo-icons.css';

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

Vue.config.productionTip = false
Vue.use(BootstrapVue);

Vue.use(VueToast, {  
  position: 'top',
  duration: 10000,
  queue: true,
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
