<template>
  <v-container
    fluid
    fill-height
    class="pa-0 ma-0 map-container">
    <map-component
      ref="leaflet"
      clusters
      :zoomAnimation="false"
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
      },
      distance: 5
    }
  },
  async mounted () {
    const coordinates = await Geolocation.getCurrentPosition(this.options)
    makeRequest('get', '/observations', {
      params: {
        lat: coordinates.coords.latitude,
        long: coordinates.coords.longitude,
        distance: this.distance
      }
    }).then(response => {
      this.$refs.leaflet.setUserLocation(Object.values(coordinates.coords).slice(0, 2), this.distance)
      this.$refs.leaflet.zoomToUserLocation()
      this.observations = response.data
    })
  },
  methods: {
    async pointMe () {
      const coordinates = await Geolocation.getCurrentPosition(this.options)
      this.$refs.leaflet.setUserLocation(Object.values(coordinates.coords).slice(0, 2), this.distance)
      this.$refs.leaflet.zoomToUserLocation()
    }
  }
}
</script>
<style scoped>
.map-container {
  height: calc(100% + 12px)
}
</style>
