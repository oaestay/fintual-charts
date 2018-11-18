import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock';
import './registerServiceWorker';

stockInit(Highcharts);

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
}).$mount('#app');
