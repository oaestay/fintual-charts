import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import VueApexCharts from 'vue-apexcharts';

Vue.config.productionTip = false;

Vue.component('apexchart', VueApexCharts);

new Vue({
  render: h => h(App),
}).$mount('#app');
