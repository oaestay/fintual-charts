<template>
  <div id="app">
    <div class="container">
      <div class="navbar">
        <div class="navbar--brand">
          <a href="https://www.fintual.cl">
            <img class="navbar--brand__logo" src="https://oaestay.github.io/fintual-charts/img/logo.png" />
          </a>
        </div>
      </div>
      <spinner v-if="!allComponentsReady" />
      <Chart v-for="(serie, index) in series"
        :key="`serie-chart-${index}`"
        :asset-id="serie.assetId"
        :fundName="serie.fundName"
        :serieName="serie.serieName"
        @loaded="handleSerieReady"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Chart from './components/Chart.vue'
import Spinner from './components/Spinner.vue'

export default {
  name: 'app',
  components: {
    Chart,
    Spinner,
  },
  data: function () {
    return {
      series: [
        {
          assetId: 186,
          fundName: 'Risky Norris',
          serieName: 'Serie A',
          ready: false,
        }, {
          assetId: 245,
          fundName: 'Risky Norris',
          serieName: 'Serie APV 👵🏼🧓🏼',
          ready: false,
        },
        {
          assetId: 187,
          fundName: 'Moderate Pitt',
          serieName: 'Serie A',
          ready: false,
        }, {
          assetId: 246,
          fundName: 'Moderate Pitt',
          serieName: 'Serie APV 👵🏼🧓🏼',
          ready: false,
        },
        {
          assetId: 188,
          fundName: 'Conservative Clooney',
          serieName: 'Serie A',
          ready: false,
        }, {
          assetId: 247,
          fundName: 'Conservative Clooney',
          serieName: 'Serie APV 👵🏼🧓🏼',
          ready: false,
        }, {
          assetId: 15077,
          fundName: 'Very Conservative Streep',
          serieName: 'Serie A',
          ready: false,
        },
      ],
      loadedSeries: {
        186: false,
        245: false,
        187: false,
        246: false,
        188: false,
        247: false,
        15077: false,
      }
    };
  },
  methods: {
    handleSerieReady(assetId) {
      this.loadedSeries[assetId] = true
    },
  },
  computed: {
    allComponentsReady() {
      return _.every(_.values(this.loadedSeries));
    },
  },
}
</script>

<style>
#app {
  font-family: Poppins, Roboto, sans-serif !important;
  text-align: center;
  color: #282828;
}
.container {
  margin: 30px 100px;
}
.navbar {
  background-color: white;
  margin-bottom: 32px;
}
.navbar .navbar--brand {
  max-width: 150px;
}
.navbar .navbar--brand__logo {
  width: 100%;
}
.chart {
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .container {
    margin: 10px 20px;
  }
}
</style>
