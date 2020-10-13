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
      medium
     >
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>
  </v-container>
</template>

<script>

import MapComponent from '@/components/Map.vue'
import { makeRequest } from '@/helpers/makeRequest'
import { Plugins } from '@capacitor/core'
import ImportanceColor from '@/views/Taxon/const/importanceColor'
import apiRoute from '@/helpers/apiRoute'

const { Geolocation } = Plugins

export default {
  name: 'Mapa',
  components: {
    MapComponent
  },
  computed: {
    geojson () {
      return this.observations.filter(item => item.geojson).map(obs => {
        const level = obs.taxon.economic || obs.taxon.sanitary
        obs.geojson.features[0].properties.icon = obs.taxon.economic === obs.taxon.sanitary ? 'fa-bug' : obs.taxon.economic > obs.taxon.sanitary ? 'fa-seedling' : 'fa-bug'
        obs.geojson.features[0].properties.color = ImportanceColor[level]
        obs.geojson.features[0].properties.popupContent = `
        <a href="/taxons/${obs.taxon.id}" class="v-list-item v-list-item--link theme--light pl-0">
          <div class="v-avatar v-list-item__avatar grey" style="height: 40px; min-width: 40px; width: 40px;">
          <div class="v-image v-responsive theme--light">
            <div class="v-responsive__sizer" style="padding-bottom: 55.5102%;"></div>
            <div class="v-image__image v-image__image--cover" style="background-image: url(&quot;${this.imageRoute(obs.taxon.image.formats.thumbnail.url)}&quot;); 
              background-position: center center;"></div><div class="v-responsive__content" style="width: 245px;"></div>
            </div>
          </div>
          <div>
            <div class="v-list-item__title headline">${obs.taxon.common_name}</div>
            <div class="v-list-item__subtitle">${obs.taxon.parent.name} ${obs.taxon.name}</div>
          </div>
        </a>`
        return obs
      }).map(item => item.geojson)
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
    },
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>
<style scoped>
.map-container {
  height: calc(100% + 12px)
}
</style>
