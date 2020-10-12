<template>
  <v-container
    fluid>
    <h4 class="text-h6">Clima y habitat</h4>
    <v-divider/>

    <v-row>
      <v-col
        class="subtitle-1">
        Temperatura<br>
        <span class="display-1">{{ Math.trunc(weather.temp.min) }} / {{ Math.trunc(weather.temp.max) }}&deg;C
          <v-icon medium>fa-thermometer-three-quarters</v-icon>
        </span>
      </v-col>

      <v-divider
        vertical/>

      <v-col
        class="subtitle-1">
        Humedad<br>
        <span class="display-1">{{ Math.trunc(weather.humidity.min) }} / {{ Math.trunc(weather.humidity.max) }}%
          <v-icon medium>fa-tint</v-icon>
        </span>
      </v-col>
    </v-row>
    <h5 class="text-h6 mt-2">Zona</h5>
    <v-row>
      <v-col
        class="pt-0"
        cols="auto">
        <v-chip-group>
          <v-chip
            v-for="(zone, index) in [].concat(taxon.zone_types, taxon.habitats)"
            :key="index"
            color="primary"
            rounded
          >
            {{ zone.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <h5 class="text-h6">Descripción</h5>
    <p v-html="taxon.habitat_description"></p>
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
