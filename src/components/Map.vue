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
      default: () => []
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    maxZoom: {
      type: Number,
      default: 8
    },
    zoomAnimation: {
      type: Boolean,
      default: true
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
      features: [],
      config: {
        attributionControl: false,
        zoomControl: false
      }
    }
  },
  watch: {
    geojson: {
      handler (newVal) {
        if (newVal.length) {
          this.setGeoJSON(newVal)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.map = L.map(this.$refs.leafletMap, this.config).setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
    this.setGeoJSON(this.geojson)
  },
  methods: {
    setGeoJSON (geojson) {
      this.features = L.geoJSON(geojson).addTo(this.map)
      this.map[this.zoomAnimation ? 'flyToBounds' : 'fitBounds'](this.features.getBounds(), {
        maxZoom: this.maxZoom
      })
    },
    setView (coordinates) {
      this.map.setView(coordinates)
    }
  }
}
</script>
<style lang="scss">

</style>
