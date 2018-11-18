<template>
  <div id="charts">
    <Chart v-for="(fund, index) in funds" :key="`fund-chart-${index}`" :real-asset-id="fund.realAssetId" :name="fund.name" />
  </div>
</template>

<script>
import Chart from './Chart.vue'
export default {
  name: 'Charts',
  components: {
    Chart
  },
  data: function () {
    return {
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
