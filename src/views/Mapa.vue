<template>
  <div style="height: 100%;">
    <map-component :geojson="geojson"/>
    <v-btn
      color="primary"
      style="bottom: 80px"
      dark
      fixed
      bottom
      right
      fab
     >
      <v-icon>mdi-camera</v-icon>
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
      observations: []
    }
  },
  mounted () {
    makeRequest('get', '/observations').then(response => {
      this.observations = response.data
    })
  }
}
</script>
