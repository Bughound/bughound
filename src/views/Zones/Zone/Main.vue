<template>
  <v-container
    fluid
    style="height: 100%;"
    class="pa-0">
    <v-card
      height="130px"
      flat
      tile
      color="primary"
      class="d-flex align-center">
      <v-card-text class="pl-6 pt-0">
      <span class="text-h5 white--text font-weight-medium">{{ zone.name }}</span><br>
      <span class="text-subtitle1 font-weight-light white--text"><b>{{ zoneType[zone.type].type }}</b></span>
      </v-card-text>
    </v-card>
    <nav-bar
      v-model="view"
      class="navbar-position"/>
    <component
      class="mt-2"
      v-if="componentExist"
      :observations="observations"
      :zone="zone"
      :distance="distance"
      :is="componentView"/>
    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="topButton"
        fab
        dark
        fixed
        bottom
        right
        style="bottom: 80px"
        color="primary"
        @click="toTop"
      >
        <v-icon>fa-angle-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>

import { GetterNames } from '@/store/getters/getters'
import NavBar from './NavBar'
import TimelineComponent from './Timeline'
import DistributionComponent from './Distribution'
import SpeciesComponent from './Species'
import SettingsComponent from './Settings'
import { makeRequest } from '@/helpers/makeRequest.js'
import apiRoute from '@/helpers/apiRoute.js'

export default {
  components: {
    NavBar,
    DistributionComponent,
    TimelineComponent,
    SettingsComponent,
    SpeciesComponent
  },
  computed: {
    componentExist () {
      return this.$options.components[`${this.view}Component`]
    },
    componentView () {
      return `${this.view}Component`
    },
    zone () {
      return this.$store.getters[GetterNames.GetZoneById](this.$route.params.id)
    }
  },
  data () {
    return {
      isLoading: false,
      view: 'Distribution',
      topButton: false,
      distance: 100,
      zoneType: {
        sanitary: {
          label: 'Urbana',
          type: 'Sanitaria'
        },
        economic: {
          label: 'Rural',
          type: 'Económica'
        }
      },
      observations: []
    }
  },
  async created () {
    this.observations = (await makeRequest('get', '/observations', {
      params: {
        lat: this.zone.geojson.geometry.coordinates[1],
        long: this.zone.geojson.geometry.coordinates[0],
        distance: this.distance
      }
    })).data
    this.$vuetify.goTo(0)
  },
  methods: {
    imageRoute: (path) => `${apiRoute}${path}`,
    setView (view) {
      this.view = view
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.topButton = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
