<template>
  <v-container
    fluid
    fill-height
    class="pa-0">
    <v-tabs
      grow
      >
      <v-tab>Mapa</v-tab>
      <v-tab>Especies</v-tab>
    </v-tabs>
    <map-component
      ref="leaflet"
      :geojson="geojson"/>
    <v-btn
      @click="pointMe()"
      color="primary"
      style="bottom: 80px"
      dark
      fixed
      bottom
      right
      fab
     >
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>
  </v-container>
</template>

<script>

import MapComponent from '@/components/Map.vue'
import { makeRequest } from '@/helpers/makeRequest'
import { Plugins } from '@capacitor/core'

const { Geolocation } = Plugins

export default {
  name: 'Mapa',
  components: {
    MapComponent
  },
  computed: {
    geojson () {
      return this.observations.filter(item => item.geojson).map(item => item.geojson)
    }
  },
  data () {
    return {
      observations: [],
      options: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    }
  },
  mounted () {
    makeRequest('get', '/observations').then(response => {
      this.observations = response.data
    })
  },
  methods: {
    async pointMe () {
      const coordinates = await Geolocation.getCurrentPosition(this.options)
      this.$refs.leaflet.setView([coordinates.coords.latitude, coordinates.coords.longitude])
    }
  }
}
</script>
