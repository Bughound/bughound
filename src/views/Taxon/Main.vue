<template>
  <v-container
    fluid
    style="height: 100%;"
    class="pa-0">
    <div class="species-header">
      <v-img
        height="220px"
        :src="imageRoute(taxon.image.url)"/>
      <div class="species-description ml-6">
        <span class="text-h5 d-block font-italic">{{ taxon.parent.name }} {{ taxon.name }}</span>
        <span class="text-h6 font-weight-light">{{ taxon.common_name }}</span>
      </div>
    </div>
    <navigation-bar
      :levels="menuImportance"
      class="navbar-position"
      v-model="view"/>
    <component
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
import StatisticsComponent from './Statistics'
import apiRoute from '@/helpers/apiRoute.js'
import NavigationBar from './NavBar.vue'

export default {
  components: {
    NavigationBar,
    DistributionComponent,
    StatisticsComponent,
    SanitaryComponent
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
  margin-top: -24px;
}
.species-description {
  position: absolute;
  bottom: 38px;
  color: white;
}
</style>
