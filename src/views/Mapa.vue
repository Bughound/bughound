<template>
  <v-container
    fluid
    fill-height
    class="pa-0 ma-0 map-container">

    <v-menu
      v-model="menu"
      min-width="100%"
      width="100%"
      offset-y
      bottom
      attach
      style="top: -12px !important"
      rounded="b-xl"
      :close-on-content-click="false"
      transition="slide-y-transition"
    >
      <v-card>
        <v-card-title>
          <h2 class="title">Importancia</h2>
        </v-card-title>
        <v-card-text>
          <v-chip-group
            v-model="filterSelected"
            multiple
            active-class="primary--text"
          >
            <v-chip
              v-for="filter in filterType"
              :key="filter.value"
              :value="filter.value"
            >
              {{ filter.label }}
            </v-chip>
          </v-chip-group>

          <v-slider
            v-model="importanceLevel"
            :tick-labels="['Ninguna', 'Baja', 'Media', 'Alta']"
            :max="3"
            step="1"
            :color="importanceColor[importanceLevel]"
            ticks="always"
            persistent-hint
            tick-size="4"
          ></v-slider>
        </v-card-text>
        <v-card-text>
          <v-slider
            v-model="distance"
            step="5"
            color="blue"
            thumb-color="blue"
            thumb-label="always"
            hint="Distancia (km)"
            persistent-hint
            max="100"
            min="5"
          ></v-slider>
        </v-card-text>
      </v-card>
    </v-menu>

    <map-component
      ref="leaflet"
      clusters
      :zoomAnimation="false"
      :geojson="geojson"/>
    <v-btn
      @click="pointMe()"
      color="primary"
      style="bottom: 150px"
      dark
      elevation="2"
      fixed
      bottom
      right
      fab
      medium
     >
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>

    <v-btn
      @click="menu = true"
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
      <v-icon>mdi-filter</v-icon>
    </v-btn>

    <v-dialog
      color="white"
      v-model="isLoading"
      fullscreen
      hide-overlay>
      <v-container
      class="white"
        fill-height
        fluid>
        <v-row align="center"
          justify="center">
          <v-col align="center">
            <v-progress-circular
              :width="7"
              :size="100"
              color="primary mb-15"
              indeterminate
            ></v-progress-circular>
            <h3 class="text-h4 mt-15 font-weight-light">Cargando observaciones</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
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
      return this.observations.filter(item => {
        return item.geojson && (!this.filterSelected.length || this.filterSelected.some(filter => item.taxon[filter] <= this.importanceLevel && item.taxon[filter] > 0))
      }).map(obs => {
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
      fab: false,
      observations: [],
      options: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      },
      distance: 5,
      menu: false,
      importanceColor: ImportanceColor,
      importanceLevel: 3,
      filterType: [
        {
          label: 'Economica',
          value: 'economic'
        },
        {
          label: 'Sanitaria',
          value: 'sanitary'
        }
      ],
      filterSelected: [],
      isLoading: true
    }
  },
  watch: {
    distance: {
      async handler (newVal) {
        const coordinates = await Geolocation.getCurrentPosition(this.options)
        makeRequest('get', '/observations', {
          params: {
            lat: coordinates.coords.latitude,
            long: coordinates.coords.longitude,
            distance: this.distance
          }
        }).then(response => {
          this.$refs.leaflet.setUserLocation(Object.values(coordinates.coords).slice(0, 2), this.distance * 1000)
          this.$refs.leaflet.zoomToUserLocation()
          this.observations = response.data
        })
      }
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
      this.$refs.leaflet.setUserLocation(Object.values(coordinates.coords).slice(0, 2), this.distance * 1000)
      this.$refs.leaflet.zoomToUserLocation()
      this.observations = response.data
      this.isLoading = false
    })
  },
  methods: {
    async pointMe () {
      const coordinates = await Geolocation.getCurrentPosition(this.options)
      this.$refs.leaflet.setUserLocation(Object.values(coordinates.coords).slice(0, 2), this.distance * 1000)
      this.$refs.leaflet.zoomToUserLocation(15)
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
