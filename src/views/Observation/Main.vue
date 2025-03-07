<template>
  <v-container
    fluid
    v-if="observation"
    class="pa-0">
    <v-card
      class="mx-auto"
    >
      <v-list-item :to="{ name: 'Especie', params: { id: observation.taxon.id } }">
        <v-list-item-avatar color="grey">
          <v-img :src="imageRoute(observation.taxon.image.formats.thumbnail.url)"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="headline"
            v-html="composeScientificName(observation)"
          />
          <v-list-item-subtitle>{{ observation.taxon.common_name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img
        :src="imageRoute(observation.image.url)"
        contain
        class="grey darken-4"
        height="200"
        @click="zoomImage(imageRoute(observation.image.url))"
      ></v-img>
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
        v-if="componentExist"
        :observation="observation"
        :is="componentView"/>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import apiRoute from '@/helpers/apiRoute'
import ImportanceColor from '@/views/Taxon/const/importanceColor'
import { PhotoViewer } from '@ionic-native/photo-viewer'
import DistribucionComponent from './Map'
import MetadatosComponent from './Metadata'

export default {
  components: {
    DistribucionComponent,
    MetadatosComponent
  },
  computed: {
    componentExist () {
      return this.$options.components[`${this.componentView}`]
    },
    componentView () {
      return `${this.tabs[this.tabIndex]}Component`
    },
    feature () {
      const geojson = this.observation.geojson
      const obs = this.observation
      const level = obs.taxon.economic || obs.taxon.sanitary

      geojson.features[0].properties.icon = obs.taxon.economic === obs.taxon.sanitary ? 'fa-bug' : obs.taxon.economic > obs.taxon.sanitary ? 'fa-seedling' : 'fa-bug'
      geojson.features[0].properties.color = ImportanceColor[level]

      return geojson
    }
  },
  data () {
    return {
      isLoading: false,
      observation: undefined,
      tabs: ['Distribucion', 'Metadatos'],
      tabIndex: 0
    }
  },
  async mounted () {
    this.observation = (await makeRequest('get', `/observations/${this.$route.params.id}`)).data
    this.observation.taxon.parent = (await makeRequest('get', `/taxons/${this.observation.taxon.parent}`)).data
    this.isLoading = false
    this.$vuetify.goTo(0)
    this.$nextTick(() => {
      this.$refs.leaflet.zoomToPoints(16)
    })
  },
  methods: {
    imageRoute: (path) => `${apiRoute}${path}`,
    composeScientificName (observation) {
      return `${observation.taxon.parent.name} ${observation.taxon.name}`
    },
    zoomImage (imageUrl) {
      PhotoViewer.show(imageUrl)
    }
  }
}
</script>
