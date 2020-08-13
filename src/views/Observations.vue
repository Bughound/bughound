<template>
  <v-container
    fluid
    class="pa-0">
    <v-list two-line>
      <template v-for="(item) in observations">
        <v-list-item
          :key="item.id"
          :to="{ name: 'Observacion', params: { id: item.id } }"
        >
          <v-list-item-avatar>
            <v-img :src="imageRoute(item.image.formats.thumbnail.url)"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="composeScientificName(item)"></v-list-item-title>
            <v-list-item-subtitle v-text="item.taxon.common_name"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ displayDate(item.created_at) }}</v-list-item-action-text>
              <v-icon>mdi-edit</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider :key="`${item.id}-divider`"/>
      </template>
    </v-list>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import apiRoute from '@/helpers/apiRoute'
import CreatedAgo from '@/helpers/createdAgo.js'

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
    displayDate (date) {
      const time = Object.values(this.createdAgo(date))
      const labels = ['dias', 'horas', 'minutos', 'segundos']
      const index = time.findIndex(item => item > 0)
      return `Hace ${time[index]} ${labels[index]}`
    },
    imageRoute: (path) => `${apiRoute}${path}`,
    createdAgo: CreatedAgo
  }
}
</script>
