import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import './registerServiceWorker'

stockInit(Highcharts)

Vue.config.productionTip = false
Vue.use(HighchartsVue);

new Vue({
  render: h => h(App),
}).$mount('#app')
