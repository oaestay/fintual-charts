<template>
  <div id="app">
    <div class="container">
      <div class="navbar">
        <div class="navbar--brand">
          <a href="https://www.fintual.cl">
            <img class="navbar--brand__logo" :src="`${baseUrl}/img/logo.png`" />
          </a>
        </div>
      </div>
      <Chart v-for="(fund, index) in funds" :key="`fund-chart-${index}`" :real-asset-id="fund.realAssetId" :name="fund.name" />
    </div>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
export default {
  name: 'app',
  components: {
    Chart
  },
  data: function () {
    return {
      baseUrl: process.env.BASE_URL,
      funds: [
        {
          realAssetId: 186,
          name: "Risky Norris",
        },
        {
          realAssetId: 187,
          name: "Moderate Pitt",
        },
        {
          realAssetId: 188,
          name: "Conservative Clooney",
        },
      ]
    };
  }
}
</script>

<style>
#app {
  font-family: "Open Sans", sans-serif !important;
  text-align: center;
  color: #2c3e50;
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
.chart .highcharts-container .highcharts-root {
  width: 100%;
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group .highcharts-range-selector-buttons text {
  fill: #dae0e5 !important;
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group .highcharts-range-selector-buttons .highcharts-button .highcharts-button-box {
  border-radius: 50%;
  color: #3DADE2;
  cursor: pointer;
  height: 32px;
  rx: 20px;
  ry: 20px;
  stroke: #3DADE2;
  width: 32px;
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group .highcharts-range-selector-buttons .highcharts-button text {
  color: #3DADE2 !important;
  fill: #3DADE2 !important;
  transform: translateY(6px);
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group .highcharts-range-selector-buttons .highcharts-button-disabled .highcharts-button-box {
  color: #dae0e5;
  stroke: #dae0e5;
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group .highcharts-range-selector-buttons .highcharts-button-disabled text {
  color: #dae0e5;
  cursor: default !important;
  stroke: #dae0e5;
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group .highcharts-range-selector-buttons .highcharts-button-pressed .highcharts-button-box {
  fill: #3DADE2;
  stroke: #3DADE2;
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group .highcharts-range-selector-buttons .highcharts-button-pressed text {
  color: white !important;
  cursor: default !important;
  fill: white !important;
}
.chart .highcharts-container .highcharts-root .highcharts-range-selector-group text {
  transform: translateY(6px);
}
.chart .highcharts-container .highcharts-root .highcharts-input-group .highcharts-label .highcharts-label-box {
  height: 32px;
  rx: 5px;
  ry: 5px;
  stroke: #4D4D4D;
  stroke-width: 2;
}
input.highcharts-range-selector {
  height: 32px !important;
}
.chart .highcharts-container .highcharts-root .highcharts-input-group .highcharts-label text {
  fill: #dae0e5 !important;
  transform: translateY(6px);
}
.chart .highcharts-container .highcharts-root .highcharts-input-group .highcharts-label text tspan {
  fill: #4D4D4D;
}
.chart .highcharts-container .highcharts-root .highcharts-title {
  display: block;
  fill: none;
  text-align: left;
}
.chart .highcharts-container .highcharts-root .highcharts-title tspan {
  font-family: "Lato";
  font-weight: 900;
}

.highcharts-graph {
  stroke: #3DADE2;
  stroke-width: 3;
}

.highcharts-markers .highcharts-halo {
  fill: #333;
}

.highcharts-tooltip-box .highcharts-label-box {
  stroke: #dae0e5;
  stroke-width: 2 !important;
}
.highcharts-tooltip-box text tspan {
  fill: #333;
}

.highcharts-navigator-handle {
  rx: 5px;
  ry: 5px;
  stroke: #333;
}
.highcharts-navigator-mask-inside {
  fill: rgba(48,96,139,.2)
}

@media (max-width: 768px) {
  .container {
    margin: 10px 20px;
  }
}
</style>
