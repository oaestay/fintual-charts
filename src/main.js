import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

stockInit(Highcharts);

Vue.config.productionTip = false;
Vue.component('apexchart', VueApexCharts);

new Vue({
  render: h => h(App),
}).$mount('#app');
