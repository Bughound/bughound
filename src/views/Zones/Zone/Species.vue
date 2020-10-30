<template>
  <v-container
    fluid
    class="pa-0">
    <v-list two-line>
      <template v-for="(item) in speciesList">
        <v-list-item
          :key="item.id"
          :to="{ name: 'Especie', params: { id: item.taxon.id } }"
        >
          <v-list-item-avatar>
            <v-img :src="imageRoute(item.taxon.image.formats.thumbnail.url)"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="composeScientificName(item)"></v-list-item-title>
            <v-list-item-subtitle v-text="item.taxon.common_name"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ item.count }} avistada</v-list-item-action-text>
              <v-icon
                v-if="item.taxon.sanitary"
                small
                :color="importanceColor[item.taxon.sanitary]">fa-heartbeat</v-icon>
              <v-icon
                v-if="item.taxon.economic"
                small
                :color="importanceColor[item.taxon.economic]">fa-seedling</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider :key="`${item.id}-divider`"/>
      </template>
    </v-list>

  </v-container>
</template>
<script>

import ImportanceColor from '@/views/Taxon/const/importanceColor.js'
import apiRoute from '@/helpers/apiRoute'

export default {
  props: {
    observations: {
      type: Array,
      required: true
    }
  },
  computed: {
    speciesList () {
      return Object.values(this.observations.map(o => o.taxon).reduce((accumulator, species) => {
        const id = species.id
        if (accumulator[id]) {
          accumulator[id].count++
        } else {
          accumulator[id] = {
            taxon: species,
            count: 1
          }
        }
        return accumulator
      }, {}))
    },
    importanceColor () {
      return ImportanceColor
    }
  },
  methods: {
    composeScientificName: (observation) => `${observation.taxon.parent.name} ${observation.taxon.name}`,
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>
