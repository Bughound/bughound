<template>
  <div
    :style="mapStyle"
    ref="leafletMap"/>
</template>

<script>

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  props: {
    geojson: {
      type: [Array, Object],
      default: undefined
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    mapStyle () {
      return {
        width: this.width,
        height: this.height,
        zIndex: 2
      }
    }
  },
  data () {
    return {
      map: undefined,
      config: {
        attributionControl: false,
        zoomControl: false
      }
    }
  },
  watch: {
    geojson: {
      handler (newVal) {
        this.setGeoJSON(newVal)
      },
      deep: true
    }
  },
  mounted () {
    this.map = L.map(this.$refs.leafletMap, this.config).setView([-37.979858, -57.589794], 5)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
  },
  methods: {
    setGeoJSON (geojson) {
      L.geoJSON(geojson).addTo(this.map)
    }
  }
}
</script>
<style lang="scss">

</style>
