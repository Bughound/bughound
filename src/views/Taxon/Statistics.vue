<template>
  <v-container
    fluid>
    <h4 class="text-h6">Avistamientos</h4>
    <v-divider/>
    <v-sheet color="gray">
    <v-sparkline
      :labels="months"
      :value="count"
      color="primary"
      line-width="4"
      label-size="12"
      height="140"
      padding="6"
      auto-draw
      smooth
    >
    </v-sparkline>
    </v-sheet>
  </v-container>
</template>

<script>

import { Months } from '@/const/dates.js'
import { TaxonStatistics } from '@/request/resources'

export default {
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
      temp: {}
    }
  },
  mounted () {
    TaxonStatistics(this.taxon.id).then(response => {
      this.count = response.data.date_count
      this.temp = response.data.temp
    })
  }
}
</script>

<style>

</style>
