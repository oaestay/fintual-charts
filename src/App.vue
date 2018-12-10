<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar--brand">
        <a href="https://www.fintual.cl">
          <img class="navbar--brand__logo" :src="`${baseUrl}/img/logo.png`" />
        </a>
      </div>
    </div>
    <Chart v-for="(fund, index) in funds" :key="`fund-chart-${index}`" :real-asset-id="fund.realAssetId" :name="fund.name" />
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
