import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock';
import './registerServiceWorker';

import Home from './components/Home.vue';
import Charts from './components/Charts.vue';

stockInit(Highcharts);

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/charts', component: Charts }
];

const router = new VueRouter({
  routes,
});


new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
