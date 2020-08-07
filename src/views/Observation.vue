<template>
  <div v-if="observation">
  <v-card
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          class="headline"
          v-html="composeScientificName(observation)"
        />
        <v-list-item-subtitle>{{ observation.taxon.common_name }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="imageRoute(observation.image.formats.medium.url)"
      height="194"
    ></v-img>

    <v-card-text>
      Avistada por: {{ observation.created_by.name }} {{ observation.created_by.last_name }}
    </v-card-text>
  </v-card>
    <v-tabs
      grow
      v-model="tabIndex">
      <v-tab
        v-for="tab in tabs"
        :key="tab">{{ tab }}
      </v-tab>
    </v-tabs>
    <component
      :is="componentView"
      class="ma-5"
      :taxon="observation.taxon"/>
    <map-component
      height="300px"
      :geojson="[observation.geojson]"
      :zoom-animation="false"
      :max-zoom="12"/>
  </div>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import apiRoute from '@/helpers/apiRoute'
import MapComponent from '@/components/Map.vue'
import InformacionComponent from '@/views/Taxon/Information.vue'

export default {
  components: {
    MapComponent,
    InformacionComponent
  },
  computed: {
    componentView () {
      return `${this.tabs[this.tabIndex]}Component`
    }
  },
  data () {
    return {
      isLoading: false,
      observation: undefined,
      tabs: ['Informacion', 'Destribucion'],
      tabIndex: 'Informacion'
    }
  },
  mounted () {
    makeRequest('get', `/observations/${this.$route.params.id}`).then(response => {
      const observation = response.data
      makeRequest('get', `/taxons/${observation.taxon.parent}`).then(parentResponse => {
        observation.parent = parentResponse.data
        this.observation = observation
        this.isLoading = false
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
