<template>
  <div class="chart">
    <h1 class="highcharts-title">Valor cuota fondo {{name}}</h1>
    <h2 class="highcharts-subtitle">{{ profit }}</h2>
    <highcharts :constructor-type="'stockChart'" :options="options"></highcharts>
  </div>
</template>
<script>
/* eslint-disable */

import _ from 'lodash';

export default {
  name: 'Chart',
  props: {
    name: String,
    realAssetId: Number,
  },
  data: function () {
    return {
      days: [],
      startDate: null,
      endDate: null,
    };
  },
  created: function () {
    this.fetchDays();
  },
  methods: {
    fetchDays() {
      fetch(`https://fintual.cl/api/real_assets/${this.realAssetId}/days`)
      .then(data => data.json())
      .then(data => {
        this.days = data['data']
          .map(day => [Date.parse(day["attributes"]["date"]), day["attributes"]["price"]])
          .sort((a, b) => a[0] - b[0])
      });
    },
    setExtremes(e) {
      this.startDate = e.min;
      this.endDate = e.max;
    }
  },
  computed: {
    options() {
      return {
        series: [{
          name: 'Valor Cuota',
          data: this.days
        }],
        xAxis: {
          events: {
            afterSetExtremes: this.setExtremes,
          },
        },
      };
    },
    profit() {
      if (!this.startDate || !this.endDate) { return '' }
      const sortedDays = _.cloneDeep(this.days).sort((a, b) => a[0] - b[0])
      const startElement = sortedDays.find(day => _.inRange(day[0], this.startDate, this.endDate + 1))
      const endElement = _.reverse(sortedDays).find(day => _.inRange(day[0], this.startDate, this.endDate + 1))
      return `(Rentabilidad del periodo seleccionado: ${_.round(((endElement[1] - startElement[1]) / startElement[1]) * 100, 4)}%)`
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
@media (max-width: 768px) {
  h1, h2, h3, h4, h5, h6 {
    font-size: .8em;
  }
}
</style>
