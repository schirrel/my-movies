// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles.css';
import './assets/creative-tim/blk-design-system/assets/css/blk-design-system.min.css';
import './assets/creative-tim/blk-design-system/assets/css/nucleo-icons.css';

import jquery from 'jquery';

import popper from 'popper.js';

import bootstrap from 'bootstrap';

import initDesignSystem from './assets/creative-tim/blk-design-system/assets/js/blk-design-system';
initDesignSystem(jquery, popper, bootstrap);

Vue.config.productionTip = false

Vue.use(VueToast, {  
  position: 'top',
  duration: 10000,
  queue: true,
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
