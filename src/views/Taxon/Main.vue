<template>
  <v-container
    fluid
    class="pa-0">
    <div class="species-header">
      <v-img
        height="340px"
        :src="imageRoute(taxon.image.url)"/>
      <div class="species-description ml-6">
        <v-chip
          class="mb-2"
          color="primary"
          small
          label
        >
          ARAÑA
        </v-chip>
        <span class="text-h5 d-block font-italic">{{ taxon.parent.name }} {{ taxon.name }}</span>
        <span class="text-h6 font-weight-light">{{ taxon.common_name }}</span>
      </div>
    </div>
    <navigation-bar
      :levels="menuImportance"
      class="navbar-position"/>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest.js'
import apiRoute from '@/helpers/apiRoute.js'
import NavigationBar from './NavBar.vue'

export default {
  components: {
    NavigationBar
  },
  computed: {
    menuImportance () {
      return Object.fromEntries(this.taxon.importances.map(item => {
        return [item.importance_group.type, item.level]
      }))
    }
  },
  data () {
    return {
      taxon: undefined,
      isLoading: false,
      importanceGroups: []
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
    })
  },
  methods: {
    imageRoute: (path) => `${apiRoute}${path}`,
    composeScientificName (observation) {
      return `${observation.parent.name} ${observation.taxon.name}`
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
