<template>
  <v-container
    class="pa-5"
    fluid>
    <div class="mb-2">
      <span class="text-h5">Habitat</span>
    </div>
    <v-divider/>

    <v-row>
      <v-col
        class="subtitle-1">
        <v-icon small>fa-cloud-sun</v-icon> Clima<br>
        <span class="text-h6 text-capitalize">{{ weatherPred }}</span>
      </v-col>
      <v-divider
        vertical/>
      <v-col
        class="subtitle-1">
        <v-icon small>fa-thermometer-three-quarters</v-icon> Temp.<br>
        <span class="text-h6">{{ Math.trunc(weather.temp.min) }} / {{ Math.trunc(weather.temp.max) }}&deg;C
        </span>
      </v-col>

      <v-divider
        vertical/>

      <v-col
        class="subtitle-1">
        <v-icon small>fa-tint</v-icon> Humedad<br>
        <span class="text-h6">{{ Math.trunc(weather.humidity.min) }} / {{ Math.trunc(weather.humidity.max) }}%
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="pt-0"
        cols="auto">
        <v-chip-group>
          <v-dialog
            v-model="dialog[index]"
            v-for="(zone, index) in [].concat(taxon.zone_types, taxon.habitats)"
            :key="index"
            width="100%"
            content-class="dialog-information"
            origin="bottom center"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                color="primary"
                rounded
                v-bind="attrs"
                v-on="on"
              >
                {{ zone.name }}
              </v-chip>
            </template>

            <v-card>
              <v-card-title class="text-capitalize">
                {{ zone.name }}
              </v-card-title>

              <v-card-text>
                {{ zone.description }}
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-chip-group>
      </v-col>
    </v-row>
    <p v-html="taxon.habitat_description"></p>
  </v-container>
</template>

<script>

import { TaxonStatistics } from '@/request/resources'
const weatherRange = {
  calido: 18,
  templado: 12,
  frio: 0,
  polar: -30
}

export default {
  props: {
    taxon: {
      type: Object,
      required: true
    }
  },
  computed: {
    weatherPred () {
      return this.weather ? this.getWeather(this.weather.temp.max - ((this.weather.temp.max - this.weather.temp.min) / 2)) : 'n/a'
    }
  },
  data () {
    return {
      time: undefined,
      weather: undefined,
      dialog: {}
    }
  },
  mounted () {
    TaxonStatistics(this.taxon.id).then(response => {
      this.time = response.data.time
      this.weather = response.data.weather
    })
  },
  methods: {
    getWeather (temp) {
      return Object.keys(weatherRange).find(k => temp > weatherRange[k])
    }
  }
}
</script>
