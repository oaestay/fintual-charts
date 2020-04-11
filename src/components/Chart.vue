<template>
  <div class="chart">
    <h1 class="chart__title">Valor cuota fondo {{fundName}} - {{ serieName }}</h1>
    <h2 class="chart__subtitle">{{ profit }}</h2>
    <apexchart class="chart__svg" type=area height=230 :options="chartOptions" :series="series" />
  </div>
</template>
<script>
/* eslint-disable */

import _ from 'lodash';

export default {
  name: 'Chart',
  props: {
    fundName: String,
    serieName: String,
    assetId: Number,
  },
  data: function () {
    return {
      series: [{ data: [] }],
      startDate: null,
      endDate: null,
    };
  },
  created: function () {
    this.fetchDays();
  },
  methods: {
    fetchDays() {
      fetch(`https://fintual.cl/api/real_assets/${this.assetId}/days`)
        .then(data => data.json())
        .then(data => {
          this.series = [{
            name: this.serieName,
            data: data['data']
                     .map(day => [Date.parse(`${day['attributes']['date']}T00:00:00.000-04:00`), day['attributes']['price']])
                     .filter(([date, price]) => !!price)
                     .sort((a, b) => a[0] - b[0]),
          }];
        }).then(() => this.setExtremes({}))
          .then(() => this.$emit('loaded', this.assetId));
    },
    setExtremes({ min, max }) {
      this.startDate = min ? min : _.min(this.series[0].data.map(val => val[0]));
      this.endDate = max ? max : _.max(this.series[0].data.map(val => val[0]));
    },
    formatDate(time) {
      const date = new Date(time);
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return `${day} de ${monthNames[monthIndex]} del ${year}`;
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          stacked: false,
          fontFamily: 'Poppins, Roboto, sans-serif',
          zoom: {
            type: 'x',
            enabled: true
          },
          toolbar: {
            autoSelected: 'zoom',
          },
          locales: [{
            name: 'es',
            options: {
              months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
              days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
              shortDays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
              toolbar: {
                exportToSVG: 'Descargar SVG',
                exportToPNG: 'Descargar PNG',
                menu: 'Menu',
                selection: 'Seleccionar',
                selectionZoom: 'Seleccionar Zoom',
                zoomIn: 'Acercar',
                zoomOut: 'Alejar',
                pan: 'Navegación',
                reset: 'Reiniciar Zoom'
              }
            }
          }],
          defaultLocale: 'es',
          events: {
            scrolled: (chartContext, { xaxis }) => {
              this.setExtremes(xaxis);
            },
            zoomed: (chartContext, { xaxis }) => {
              this.setExtremes(xaxis);
            },
          }
        },
        colors: ['#005AD6'],
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
          type: 'datetime',
          min: _.min(this.series[0].data.map(x => x[0])),
          max: _.max(this.series[0].data.map(x => x[0])),
        },
        yaxis: {
          showAlways: true,
          labels: {
            formatter: function(value) {
              var i = String(parseInt(value.toFixed(0)));
              var j = (j = i.length) > 3 ? j % 3 : 0;
              return "$ " + (j ? i.substr(0, j) + "." : "") +
                i.substr(j).replace(/(\,{3})(?=\,)/g, "$1" + ".");
            }
          }
        },
        tooltip: {
          y: {
            formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
              var i = String(parseInt(value.toFixed(4)));
              var j = (j = i.length) > 3 ? j % 3 : 0;
              return "$ " + (j ? i.substr(0, j) + "." : "") +
                i.substr(j).replace(/(\,{3})(?=\,)/g, "$1" + ".") +
	              ("," + Math.abs(value - i).toFixed(4).slice(2));
            }
          }
        }
      };
    },
    profit() {
      if (!this.startDate || !this.endDate || _.isEmpty(this.series[0].data)) { return '' }
      const sortedValues = _.cloneDeep(this.series[0].data).sort((a, b) => a[0] - b[0]);
      const daysInRange = sortedValues.filter(value => this.startDate <= value[0] && value[0] <= this.endDate);
      const startElement = _.first(daysInRange);
      const endElement = _.last(daysInRange);
      return `(Rentabilidad entre el ${this.formatDate(this.startDate)} y el ${this.formatDate(this.endDate)}: ${_.round(((endElement[1] - startElement[1]) / startElement[1]) * 100, 2)}%)`
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1.chart__title, h3.chart__subtitle {
  font-family: Poppins, Roboto, sans-serif;
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
.chart__svg .apexcharts-zoom-icon.selected svg,
.chart__svg .apexcharts-selection-icon.selected svg,
.chart__svg .apexcharts-reset-zoom-icon.selected svg,
.chart__svg .apexcharts-pan-icon.selected svg {
  fill: #005AD6;
}
@media (max-width: 768px) {
  h1, h2, h3, h4, h5, h6 {
    font-size: .8em;
  }
}
</style>
