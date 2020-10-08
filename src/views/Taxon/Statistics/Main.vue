<template>
  <v-container
    fluid>
    <h4 class="text-h6">Avistamientos</h4>
    <v-divider/>
    <line-chart
      :chart-data="datacollection"
      :options="chartConfig"/>
  </v-container>
</template>

<script>

import { mapRange } from '@/helpers/math.js'
import { Months } from '@/const/dates.js'
import { TaxonStatistics } from '@/request/resources'
import LineChart from './LineChart'

export default {
  components: {
    LineChart
  },
  props: {
    taxon: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      months: Months.map(m => m.charAt(0)),
      count: [],
      temp: {},
      datacollection: null,
      chartConfig: {
        borderWidth: 3,
        fill: false
      }
    }
  },
  mounted () {
    TaxonStatistics(this.taxon.id).then(response => {
      this.count = response.data.date_count
      this.temp = response.data.temp
      this.fillData(this.count)
    })
  },
  methods: {
    fillData (count) {
      this.datacollection = {
        labels: this.months,
        datasets: ((years = Object.keys(count)) => years.map((year, index) => {
          return {
            label: year,
            fill: false,
            borderWidth: 2,
            data: count[year],
            borderColor: this.getRandomColor(3, years)
          }
        }))()
      }
    },
    getRandomColor (index, years) {
      return `hsl(${60 * index}, ${mapRange(index, 0, years.length, 10, 30)}%, 40%)`
    }
  }
}
</script>
