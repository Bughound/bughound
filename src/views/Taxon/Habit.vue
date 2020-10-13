<template>
  <v-container
    fluid>
    <div class="d-inline-flex align-center mb-2">
      <span class="text-h5 mr-2">Comportamiento</span>
    </div>
    <v-divider/>

  </v-container>
</template>

<script>

import { TaxonStatistics } from '@/request/resources'
import { inRange } from '@/helpers/math.js'

export default {
  props: {
    taxon: {
      type: Object,
      required: true
    }
  },
  computed: {
    dayTime () {
      return this.time ? inRange(this.time.min, 6, 19) || inRange(this.time.max, 6, 19) : false
    },
    nightTime () {
      return this.time ? (inRange(this.time.max, 20, 23) || inRange(this.time.min, 0, 5)) : false
    },
    dayTimeString () {
      if (this.dayTime && this.nightTime) {
        return 'dia / noche'
      } else if (this.dayTime) {
        return 'dia'
      } else {
        return 'noche'
      }
    }
  },
  data () {
    return {
      time: undefined,
      weather: {}
    }
  },
  mounted () {
    TaxonStatistics(this.taxon.id).then(response => {
      this.time = response.data.time
      this.weather = response.data.weather
    })
  }
}
</script>
