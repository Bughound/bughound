<template>
  <div
    class="pa-0 ma-0 map-container">
    <map-component
      ref="leaflet"
      :geojson="geojson"/>
  </div>
</template>
<script>

import MapComponent from '@/components/Map.vue'
import { makeRequest } from '@/helpers/makeRequest'

export default {
  props: {
    taxon: {
      type: Object,
      required: true
    }
  },
  components: {
    MapComponent
  },
  data () {
    return {
      geojson: []
    }
  },
  mounted () {
    makeRequest('get', '/observations', { params: { 'taxon.id': this.taxon.id } }).then(response => {
      this.geojson = response.data.map(observation => observation.geojson).filter(json => json)
      this.$nextTick(() => {
        this.$refs.leaflet.zoomToPoints()
      })
    })
  }
}
</script>
<style scoped>
.map-container {
  position: relative;
  top: -27px;
  height: calc(100% - 200px)
}
</style>
