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

const BugIcon = new L.DivIcon({
  html: '<div class="v-btn v-btn--depressed v-btn--fab v-btn--round theme--dark v-size--x-small primary blob red"><i class="v-icon notranslate fa fa-bug theme--dark"></i></div>',
  iconSize: [40, 40],
  className: 'myDivIcon'
})

// const BugOrangeIcon = L.divIcon({
//  html: '<div class="v-btn v-btn--depressed v-btn--fab v-btn--round theme--dark v-size--small blob orange"><i class="v-icon notranslate fa fa-bug theme--dark"></i></div>',
//  iconSize: [40, 40],
//  className: 'myDivIcon'
// })

const PositionIcon = new L.DivIcon({
  html: '<div class="v-btn v-btn--depressed v-btn--fab v-btn--round theme--dark v-size--x-small blue blob "><i class="v-icon notranslate fa fa-street-view theme--dark"></i></div>',
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
    },
    addMarker: {
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
      markers: undefined,
      config: {
        attributionControl: false,
        zoomControl: false
      },
      currentPosition: {
        marker: undefined,
        radius: undefined
      },
      markerClusters: new L.MarkerClusterGroup()
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
    this.map = new L.Map(this.$refs.leafletMap, this.config).setView([0, 0], 2)
    this.handleEvents()
    new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
    if (this.clusters) {
      this.map.addLayer(this.markerClusters)
    }
    this.markers = new L.FeatureGroup().addTo(this.map)
    this.setGeoJSON(this.geojson)
  },
  methods: {
    handleEvents () {
      this.map.on('click', (e) => {
        if (!this.addMarker) return
        this.createMarker(e)
      })
    },
    setGeoJSON (geojson) {
      this.features = new L.GeoJSON(geojson, {
        pointToLayer: this.pointToLayer,
        onEachFeature: this.onEachFeature
      })
      if (this.clusters) {
        this.markerClusters.clearLayers()
        this.markerClusters.addLayers(this.features)
      } else {
        this.map.addLayer(this.features)
      }
    },
    clearLayers () {
      this.markers.clearLayers()
    },
    setUserLocation (coordinates, meters = 5000) {
      if (this.currentPosition.marker) {
        this.currentPosition.marker.setLatLng(coordinates)
      } else {
        this.currentPosition.marker = new L.Marker(coordinates).setIcon(PositionIcon)
        this.currentPosition.marker.addTo(this.map)
      }

      if (this.currentPosition.radius) {
        this.currentPosition.radius.setLatLng(coordinates)
        this.currentPosition.radius.setRadius(meters)
      } else {
        if (meters > 0) {
          this.currentPosition.radius = new L.Circle(coordinates, {
            color: '#2196F3',
            weight: 1,
            fillColor: '#2196F3',
            fillOpacity: 0.1,
            radius: meters
          })
          this.currentPosition.radius.addTo(this.map)
        }
      }
    },
    zoomToMarkers (zoom = this.maxZoom) {
      this.map[this.zoomAnimation ? 'flyToBounds' : 'fitBounds'](this.markers.getBounds(), {
        maxZoom: zoom
      })
    },
    zoomToPoints (zoom = this.maxZoom) {
      this.map[this.zoomAnimation ? 'flyToBounds' : 'fitBounds'](this.features.getBounds(), {
        maxZoom: zoom
      })
    },
    zoomToUserLocation (zoom) {
      this.map[this.zoomAnimation ? 'flyToBounds' : 'fitBounds'](this.currentPosition.radius ? this.currentPosition.radius.getBounds() : [this.currentPosition.marker.getLatLng()], {
        maxZoom: zoom
      })
    },
    setView (coordinates) {
      this.map.setView(coordinates)
    },
    pointToLayer (feature, latlng) {
      const shape = (feature.properties.radius ? new L.Circle(latlng, Number(feature.properties.radius)) : new L.Marker(latlng))
      Object.assign(shape, { feature: feature })
      return shape
    },
    onEachFeature (feature, layer) {
      const featureType = feature.geometry.type
      const isCircle = Object.prototype.hasOwnProperty.call(feature.properties, 'radius')

      if (featureType === 'Point' && !isCircle) {
        layer.setIcon(BugIcon)
        if (feature.properties) {
          if (feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent)
          }
          if (feature.properties.icon) {
            layer.setIcon(this.insectIcon(feature.properties.icon, feature.properties.color))
          } else {
            layer.setIcon(BugIcon)
          }
        }
      }
    },
    insectIcon (icon, color) {
      return new L.DivIcon({
        html: `<div class="v-btn v-btn--depressed v-btn--fab v-btn--round theme--dark v-size--x-small blob ${color}"><i class="v-icon notranslate fa ${icon} theme--dark"></i></div>`,
        iconSize: [40, 40],
        className: 'myDivIcon'
      })
    },
    createMarker (e) {
      const marker = new L.Marker(e.latlng)

      this.markers.addLayer(marker)
      this.$emit('onAddMarker', marker.toGeoJSON())
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
