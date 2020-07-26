<template>
    <v-list three-line>
    <template v-for="(item, index) in observations">
      <v-divider
        :key="index"
      ></v-divider>

      <v-list-item
        :key="item.id"
        :to="{ name: 'Observacion', params: { id: item.id } }"
      >
        <v-list-item-avatar>
          <v-img :src="imageRoute(item.image.formats.thumbnail.url)"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="composeScientificName(item)"></v-list-item-title>
          <v-list-item-subtitle v-html="item.date"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider
        :key="index"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import apiRoute from '@/helpers/apiRoute'

export default {
  computed: {

  },
  data () {
    return {
      observations: []
    }
  },
  mounted () {
    makeRequest('get', '/observations').then(response => {
      const observationsResponse = response.data
      const promises = observationsResponse.map(observation => makeRequest('get', `/taxons/${observation.taxon.parent}`))

      Promise.all(promises).then((parentsResponse) => {
        const parents = parentsResponse.map(parent => parent.data)
        this.observations = observationsResponse.map(observation => Object.assign(observation, { parent: parents.find(parent => parent.id === observation.taxon.parent) }))
      })
    })
  },
  methods: {
    composeScientificName (observation) {
      return `${observation.parent.name} ${observation.taxon.name}`
    },
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>
