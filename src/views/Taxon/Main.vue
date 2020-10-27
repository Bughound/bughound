<template>
  <v-container
    fluid
    style="height: 100%;"
    class="pa-0">
    <v-dialog
      v-if="isLoading"
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
            <h3 class="text-h4 mt-15 font-weight-light">Cargando especie</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <template v-else>
    <div class="species-header">
      <v-img
        height="250px"
        :src="imageRoute(taxon.image.url)"
        @click="zoomImage(imageRoute(taxon.image.url))"/>
      <div class="species-description ml-6">
        <span class="text-h5 d-block font-italic">{{ taxon.parent.name }} {{ taxon.name }}</span>
        <span class="text-h6"><b>{{ taxon.common_name }}</b></span>
      </div>
    </div>
    <navigation-bar
      :levels="menuImportance"
      :taxon="taxon"
      class="navbar-position ml-4 mr-4"
      v-model="view"/>
    <component
      class="mt-2"
      v-if="componentExist"
      :taxon="taxon"
      :importance="menuImportance"
      :is="componentView"/>
    </template>
  </v-container>
</template>

<script>

import SanitaryComponent from './Sanitary.vue'
import DistributionComponent from './Distribution'
import StatisticsComponent from './Statistics/Main'
import HabitatComponent from './Habitat'
import HabitComponent from './Habit'
import EconomicComponent from './Economic'
import apiRoute from '@/helpers/apiRoute.js'
import NavigationBar from './NavBar.vue'

import { makeRequest } from '@/helpers/makeRequest.js'
import { PhotoViewer } from '@ionic-native/photo-viewer'

export default {
  components: {
    NavigationBar,
    DistributionComponent,
    StatisticsComponent,
    SanitaryComponent,
    HabitatComponent,
    HabitComponent,
    EconomicComponent
  },
  computed: {
    menuImportance () {
      return Object.fromEntries(this.importanceGroups.map(item => {
        return [item, this.taxon[item.toLowerCase()] || 0]
      }))
    },
    componentExist () {
      return this.$options.components[`${this.view}Component`]
    },
    componentView () {
      return `${this.view}Component`
    }
  },
  data () {
    return {
      taxon: {},
      isLoading: true,
      importanceGroups: ['Habit', 'Economic', 'Sanitary'],
      view: undefined,
      imgs: '', // Img Url , string or Array of string
      visible: false,
      index: 0
    }
  },
  async mounted () {
    makeRequest('get', `/taxons/${this.$route.params.id}`).then(response => {
      this.taxon = response.data
      this.isLoading = false
      this.$vuetify.goTo(0)
      this.view = Object.keys(this.menuImportance)[Object.values(this.menuImportance).indexOf(Math.max(...Object.values(this.menuImportance)))]
    })
  },
  methods: {
    imageRoute: (path) => `${apiRoute}${path}`,
    composeScientificName (observation) {
      return `${observation.parent.name} ${observation.taxon.name}`
    },
    setView (view) {
      this.view = view
    },
    zoomImage (imageUrl) {
      PhotoViewer.show(imageUrl)
    }
  }
}
</script>

<style>
.species-header {
  position: relative;
}
.navbar-position {
  position: relative;
  margin-top: -26px;
}
.species-description {
  position: absolute;
  bottom: 38px;
  color: white;
}
</style>
