<template>
  <div>
    <v-sheet
      rounded
      style="top: 26px; z-index: 4; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap;">
      <v-card-text>
        <span class="text-subtitle-2">Marque la localizacion en el mapa</span>
      </v-card-text>
    </v-sheet>
    <map-component
      ref="leafletZone"
      style="height: 84vh; position: inherit"
      @onAddMarker="addMarker"
      :add-marker="mapMarker"/>

    <v-btn
      @click="markerSet(!mapMarker)"
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
        v-if="mapMarker"
        dark>
        mdi-close
      </v-icon>
      <v-icon
        v-else
        dark>
        fas fa-map-marker-alt
      </v-icon>
    </v-btn>

    <v-btn
      @click="sendData()"
      color="primary"
      style="bottom: 150px"
      elevation="2"
      :disabled="!zone.geojson"
      fixed
      bottom
      right
      fab
      medium
    >
      <v-icon
        dark>
        fa-check
      </v-icon>
    </v-btn>
  </div>
</template>

<script>

import MapComponent from '@/components/Map.vue'

import { Plugins } from '@capacitor/core'

const { Geolocation } = Plugins

export default {
  components: {
    MapComponent
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    zone: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  data () {
    return {
      options: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      },
      mapMarker: false
    }
  },
  async mounted () {
    const coordinates = await Geolocation.getCurrentPosition(this.options)

    this.$refs.leafletZone.setUserLocation(Object.values(coordinates.coords).slice(0, 2), 0)
    this.$nextTick(() => {
      this.$refs.leafletZone.zoomToUserLocation(6)
    })
  },
  methods: {
    removePreviousPoint () {
      this.$refs.leafletZone.clearLayers()
    },
    markerSet (value) {
      if (value) {
        this.removePreviousPoint()
      }
      this.mapMarker = value
    },
    addMarker (geojson) {
      this.markerSet(false)
      this.$refs.leafletZone.zoomToMarkers(14)
      this.zone.geojson = geojson
    },
    sendData () {
      this.$emit('onAccept')
    }
  }
}
</script>
<style scoped>
.map-container {
  height: calc(100% + 12px)
}
</style>
