<template>
  <div style="height: 100%;">
    <map-component :geojson="geojson"/>
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
  </div>
</template>

<script>

import MapComponent from '@/components/Map.vue'
import { makeRequest } from '@/helpers/makeRequest'

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
    pointMe () {
      console.log('entra')
      navigator.geolocation.getCurrentPosition(pos => {
        alert(pos.coords.latitude)
      }, error => {
        console.log(error)
        // alert(JSON.stringify(error))
      })
    }
  }
}
</script>
