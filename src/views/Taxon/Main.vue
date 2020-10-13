<template>
  <v-container
    fluid
    style="height: 100%;"
    class="pa-0">
    <div class="species-header">
      <v-img
        height="250px"
        :src="imageRoute(taxon.image.url)"/>
      <div class="species-description ml-6">
        <span class="text-h5 d-block font-italic">{{ taxon.parent.name }} {{ taxon.name }}</span>
        <span class="text-h6"><b>{{ taxon.common_name }}</b></span>
      </div>
    </div>
    <navigation-bar
      :levels="menuImportance"
      class="navbar-position ml-4 mr-4"
      v-model="view"/>
    <component
      class="mt-2"
      v-if="componentExist"
      :taxon="taxon"
      :importance="menuImportance"
      :is="componentView"/>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest.js'
import SanitaryComponent from './Sanitary.vue'
import DistributionComponent from './Distribution'
import StatisticsComponent from './Statistics/Main'
import HabitatComponent from './Habitat'
import HabitComponent from './Habit'
import apiRoute from '@/helpers/apiRoute.js'
import NavigationBar from './NavBar.vue'

export default {
  components: {
    NavigationBar,
    DistributionComponent,
    StatisticsComponent,
    SanitaryComponent,
    HabitatComponent,
    HabitComponent
  },
  computed: {
    menuImportance () {
      return Object.fromEntries(this.taxon.importances.map(item => {
        return [item.importance_group.type, item.level]
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
      taxon: undefined,
      isLoading: false,
      importanceGroups: [],
      view: undefined
    }
  },
  async mounted () {
    this.importanceGroups = (await makeRequest('get', '/importance-groups')).data

    makeRequest('get', `/taxons/${this.$route.params.id}`).then(response => {
      this.taxon = response.data
      this.$vuetify.goTo(0)
      this.taxon.importances.forEach((item, index) => {
        this.taxon.importances[index].importance_group = this.importanceGroups.find(group => group.id === item.importance_group)
      })
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
