<template>
  <div
    :style="mapStyle"
    ref="leafletMap"/>
</template>

<script>

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const BugIcon = L.divIcon({
  html: '<div class="v-btn v-btn--depressed v-btn--fab v-btn--round theme--dark v-size--small primary blob red"><i class="v-icon notranslate fa fa-bug theme--dark"></i></div>',
  iconSize: [40, 40],
  className: 'myDivIcon'
})

// const BugOrangeIcon = L.divIcon({
//  html: '<div class="v-btn v-btn--depressed v-btn--fab v-btn--round theme--dark v-size--small blob orange"><i class="v-icon notranslate fa fa-bug theme--dark"></i></div>',
//  iconSize: [40, 40],
//  className: 'myDivIcon'
// })

const PositionIcon = L.divIcon({
  html: '<div class="v-btn v-btn--depressed v-btn--fab v-btn--round theme--dark v-size--small blue blob "><i class="v-icon notranslate fa fa-street-view theme--dark"></i></div>',
  iconSize: [40, 40],
  className: 'myDivIcon'
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
    },
    clusters: {
      type: Boolean,
      default: false
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
      },
      currentPosition: {
        marker: undefined,
        radius: undefined
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
      this.features = L.geoJSON(geojson, {
        onEachFeature: this.onEachFeature
      })
      if (this.clusters) {
        const markers = L.markerClusterGroup()
        markers.addLayers(this.features)
        this.map.addLayer(markers)
      } else {
        this.map.addLayer(this.features)
      }
    },
    setUserLocation (coordinates, meters = 5) {
      if (this.currentPosition.marker) {
        this.currentPosition.marker.setLatLng(coordinates)
        this.currentPosition.radius.setLatLng(coordinates)
      } else {
        this.currentPosition.marker = L.marker(coordinates).setIcon(PositionIcon)
        this.currentPosition.radius = L.circle(coordinates, {
          color: '#2196F3',
          weight: 1,
          fillColor: '#2196F3',
          fillOpacity: 0.1,
          radius: meters * 1000
        })
        this.currentPosition.marker.addTo(this.map)
        this.currentPosition.radius.addTo(this.map)
      }
    },
    zoomToPoints () {
      this.map[this.zoomAnimation ? 'flyToBounds' : 'fitBounds'](this.features.getBounds(), {
        maxZoom: this.maxZoom
      })
    },
    zoomToUserLocation () {
      this.map[this.zoomAnimation ? 'flyToBounds' : 'fitBounds'](this.currentPosition.radius.getBounds())
    },
    setView (coordinates) {
      this.map.setView(coordinates)
    },
    onEachFeature (feature, layer) {
      layer.setIcon(BugIcon)
      if (feature.properties) {
        if (feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent)
        }
        if (feature.properties.importance) {
          const icono = BugIcon
          layer.setIcon(icono)
        }
      }
    }
  }
}
</script>
<style lang="scss">

.blob.red {
    background: rgba(255, 82, 82, 1);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
    animation: pulse-red 2s infinite;
}

.blob.blue {
    background: #2196F3;
    box-shadow: 0 0 0 0 #2196F3;
    animation: pulse-blue 2s infinite;
}

.blob.orange {
  background: rgba(255, 183, 77, 1);
  box-shadow: 0 0 0 0 rgba(255, 183, 77, 1);
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-red {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
}

@keyframes pulse-orange {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 183, 77, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px  rgba(255, 183, 77, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0  rgba(255, 183, 77, 0);
    }
}

@keyframes pulse-blue {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7)
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(33, 150, 243, 0)
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(33, 150, 243, 0)
    }
}

</style>
