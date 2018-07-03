//import cqtest from 'cqtest';
//let { stat, exists, readFile } = require('fs');
import Vue from 'vue';
const cqtest = require("cqtest");
import App from './index.vue';
import VueRouter from 'vue-router';
import routerConfig from './config/router-config';
import heyuiConfig from './config/heyui-config';
import './js/common/filters';

const router = routerConfig();
Vue.use(VueRouter);
Vue.use(HeyUI);

const app = new Vue({	
  router,
  el: '#app',
  render: h => h(App)
})

require('./css/common.less');
require('./css/icomoon/style.less');
export default app;
