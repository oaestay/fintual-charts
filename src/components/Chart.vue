<template>
  <div class="chart">
    <h1 class="chart__title">Valor cuota fondo {{name}}</h1>
    <h2 class="chart__subtitle"></h2>
    <apexchart class="chart__svg" type=line height=230 :options="chartOptionsArea" :series="series" />
    <apexchart class="chart__brush" type=area height=130 :options="chartOptionsBrush" :series="series" />
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
      fetch(`https://fintual.cl/api/real_assets/${this.realAssetId}/days`)
      .then(data => data.json())
      .then(data => {
        this.series =
        [
          {
            name: 'Serie A',
            data: data['data']
                    .map(day => [day['attributes']['date'], day['attributes']['price']])
                    .sort((a, b) => a[0] - b[0])
          },
        ]
      });
    },
    setExtremes(e) {
      this.startDate = e.min;
      this.endDate = e.max;
    }
  },
  computed: {
    chartOptionsArea() {
      return {
        chart: {
          id: `chartArea-${this.realAssetId}`,
          toolbar: {
            autoSelected: 'pan',
            show: false
          },
          locales: [{
            'name': 'es',
            'options': {
              'months': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              'shortMonths': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
              'days': ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
              'shortDays': ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'],
            }
          }],
          defaultLocale: 'es',
          events: {
            mounted: (chartContext, config) => {
              console.log('area');
              console.log(config);
            },
            selection: (chartContext, { xaxis, yaxis }) => {
              console.log('area');
              console.log(xaxis);
              console.log(yaxis);
            },
            dataPointSelection: (event, chartContext, config) => {
              console.log('area');
              console.log(chartContext);
              console.log(config);
            },
            scrolled: (chartContext, { xaxis }) => {
              console.log('area');
              console.log(xaxis);
            },
            zoomed: (chartContext, { xaxis }) => {
              console.log('area');
              console.log(xaxis);
            },
            updates: (chartContext, config) => {
              console.log('area');
              console.log(config);
            }
          }
        },
        colors: ['#333333'],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          showAlways: true,
        }
      };
    },
    chartOptionsBrush() {
      return {
        chart: {
          id: `chartBrush-${this.realAssetId}`,
          brush: {
            target: `chartArea-${this.realAssetId}`,
            enabled: true
          },
          selection: {
            enabled: true,
            xaxis: {
              min: _.min(this.series.map(x => x[0])),
              max: _.max(this.series.map(x => x[0])),
            },
          },
          events: {
            selection: (chartContext, { xaxis, yaxis }) => {
              console.log('brush');
              console.log(xaxis);
              console.log(yaxis);
            }
          }
        },
        colors: ['#3DADE2'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          }
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          }
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
<style>
h1.chart__title, h3.chart__subtitle {
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
.chart__brush .apexcharts-yaxis {
  display: none;
}
@media (max-width: 768px) {
  h1, h2, h3, h4, h5, h6 {
    font-size: .8em;
  }
}
</style>
