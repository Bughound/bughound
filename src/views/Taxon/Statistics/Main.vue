<template>
  <v-container
    fluid>
    <h4 class="text-h6">Avistamientos</h4>
    <v-divider/>
    <line-chart :chart-data="dataCollection"/>
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
      dataCollection: null
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
      this.dataCollection = {
        labels: this.months,
        datasets: ((years = Object.keys(count)) => years.map((year, index) => {
          return {
            label: year,
            fill: false,
            borderWidth: 3,
            data: count[year],
            borderColor: this.getRandomColor((index + 1), years)
          }
        }))()
      }
    },
    getRandomColor (index, years) {
      return `hsl(${50 * index}, ${mapRange(index, 0, years.length, 40, 180)}%, 30%)`
    }
  }
}
</script>
