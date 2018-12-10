<template>
  <div class="compare-chart">
    <h1 class="highcharts-title">Valores cuota fondos de Fintual</h1>
    <h2 v-for="(text, index) in profitTexts" :key="`profit-${index}`" class="highcharts-subtitle">{{ text }}</h2>
    <highcharts :constructor-type="'stockChart'" :options="options"></highcharts>
  </div>
</template>
<script>

import _ from 'lodash';

const FUNDS = [
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


export default {
  name: 'CompareChart',
  props: {
    name: String,
    realAssetId: Number,
  },
  data: function () {
    return {
      series: [],
      startDate: null,
      endDate: null,
    };
  },
  created: function () {
    this.fetchDays();
  },
  methods: {
    fetchDays() {
      _.forEach(FUNDS, (fund) => {
        fetch(`https://fintual.cl/api/real_assets/${fund.realAssetId}/days`)
        .then(data => data.json())
        .then(data => {
          this.series.push({
            name: fund.name,
            data: data['data']
              .map(day => [Date.parse(day["attributes"]["date"]), day["attributes"]["price"]])
              .sort((a, b) => a[0] - b[0]),
          })
        });
      })
    },
    setExtremes(e) {
      this.startDate = e.min;
      this.endDate = e.max;
    }
  },
  computed: {
    options() {
      return {
        series: this.series,
        xAxis: {
          events: {
            afterSetExtremes: this.setExtremes,
          },
        },
      };
    },
    profitTexts() {
      if (!this.startDate || !this.endDate) { return [] }
      return _.concat(
        ['Rentabilidades del periodo seleccionado:'],
        this.series.map(series => {
          const minValue = series.data.find(day => _.inRange(day[0], this.startDate, this.endDate + 1))[1];
          const maxValue = _.reverse(series.data).find(day => _.inRange(day[0], this.startDate, this.endDate + 1))[1];
          return `Fondo ${series.name}: ${_.round(((maxValue - minValue) / minValue) * 100, 4)}%`
        })
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1.highcharts-title, h3.highcharts-subtitle {
  font-family: "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
