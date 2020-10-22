<template>
  <v-container
    class="map-container pa-0">
    <v-stepper
      class="elevation-0 pa-0"
      :value="step">
      <v-stepper-header class="elevation-0">
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="step > n"
            :step="n"
          >
            Paso {{ n }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-items class="pa-0">
        <v-stepper-content
          class="pt-2"
          step="1">
          <v-row>
            <v-col
              align="center"
              justify="center"
              @click="setZone('sanitary')">
              <v-img
                class="mb-4 mt-4"
                :width="200"
                src="@/assets/images/zones/sanitary.svg"/>
              <span class="text-h4">Urbana</span>
              <p class="mt-4 mb-4">Zonas enfocadas a la detección de especies potencialmente perjudiciales para la salud</p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col
              align="center"
              justify="center"
              @click="setZone('economic')">
              <v-img
                class="mb-4 mt-8"
                :width="200"
                src="@/assets/images/zones/economic.svg"/>
              <span class="text-h4">Rural</span>
              <p class="mt-4">Zonas agrícolas, enfocadas principalmente a la deteccion de plagas que afectan los cultivos</p>
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content
          class="pa-0 pt-0"
          step="2">
          <v-sheet
            rounded
            style="top: 26px; z-index: 4; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap;">
            <v-card-text>
              <span class="text-subtitle-2">Marque la localizacion en el mapa</span>
            </v-card-text>
          </v-sheet>
          <map-component
            v-if="step === 2"
            ref="leafletZone"
            style="height: 84vh; position: inherit"
            :add-marker="true"/>

          <v-btn
            @click="menu = !menu"
            color="primary"
            style="bottom: 80px"
            elevation="2"
            dark
            fixed
            bottom
            right
            fab
            medium
          >
            <v-icon
              dark>
              fas fa-map-marker-alt
            </v-icon>
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>

import MapComponent from '@/components/Map.vue'
import { Plugins } from '@capacitor/core'

const { Geolocation } = Plugins

export default {
  components: {
    MapComponent
  },
  data () {
    return {
      options: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      },
      step: 1,
      steps: 2,
      zone: {
        type: undefined
      },
      zoneType: {
        economic: 3,
        sanitary: 2
      }
    }
  },
  watch: {
    step: {
      async handler (newVal) {
        if (newVal === 2) {
          const coordinates = await Geolocation.getCurrentPosition(this.options)

          this.$refs.leafletZone.setUserLocation(Object.values(coordinates.coords).slice(0, 2), 0)
          this.$nextTick(() => {
            this.$refs.leafletZone.zoomToUserLocation(6)
          })
        }
      }
    }
  },
  methods: {
    setZone (value) {
      this.zone.type = value
      this.steps = this.zoneType[value]
      this.step++
    },
    removePreviousPoint () {
      this.$refs.leafletZone.clearLayers()
    }
  }
}
</script>
<style scoped>
.map-container {
  height: calc(100% + 12px)
}
</style>
