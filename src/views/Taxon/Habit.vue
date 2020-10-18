<template>
  <v-container
    class="pa-5"
    fluid>
    <div class="mb-2">
      <span class="text-h5">Comportamiento</span>
    </div>
    <v-divider/>

    <v-row>
      <v-col
        class="subtitle-1">
        <v-icon small>fa-moon</v-icon>Actividad registrada<br>
        <span class="text-h6 text-capitalize">{{ dayTimeString }}</span>
      </v-col>
      <v-divider
        vertical/>

      <v-col
        class="subtitle-1">
        <v-icon small>fa-clock</v-icon> Horario mas avistada<br>
        <span class="text-h6">{{ time.max }}hs</span>
      </v-col>
    </v-row>
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
        return 'Diurna / Nocturna'
      } else if (this.dayTime) {
        return 'Diurna'
      } else {
        return 'Nocturna'
      }
    }
  },
  data () {
    return {
      time: undefined
    }
  },
  mounted () {
    TaxonStatistics(this.taxon.id).then(response => {
      this.time = response.data.time
    })
  }
}
</script>
