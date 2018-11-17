<template>
  <div class="chart">
    <highcharts :constructor-type="'stockChart'" :options="options"></highcharts>
  </div>
</template>
<script>

export default {
  name: 'Chart',
  props: {
    name: String,
    realAssetId: Number,
  },
  data: function () {
    return {
      days: [],
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
    }
  },
  computed: {
    options() {
      return {
        title: {
          text: `Valor cuota fondo ${this.name}`
        },
        series: [{
          name: 'Valor Cuota',
          data: this.days
        }],
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
