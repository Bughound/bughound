<template>
  <v-container
    class="pl-0 pr-0 pt-0">
    <v-list
      class="mt-0"
      two-line>
      <template v-for="(item) in notifications">
        <v-list-item
          :class="{ 'green lighten-5': !item.seen }"
          :key="item.id"
          :to="{ name: 'Observacion', params: { id: item.observation.id } }"
        >
          <v-list-item-avatar>
            <v-img :src="imageRoute(item.observation.image.formats.thumbnail.url)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="composeScientificName(item.observation)"></v-list-item-title>
            <v-list-item-subtitle>{{ item.observation.taxon.common_name }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ getDistanceFromZone(item.observation.geojson) }} Kms de la ubicación</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ displayDate(item.created_at) }}</v-list-item-action-text>
            <v-icon
              v-if="item.observation.taxon.sanitary"
              small
              :color="importanceColor[item.observation.taxon.sanitary]">fa-heartbeat</v-icon>
            <v-icon
              v-if="item.observation.taxon.economic"
              small
              :color="importanceColor[item.observation.taxon.economic]">fa-seedling</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider :key="`${item.observation.taxon.id}-divider`"/>
      </template>
    </v-list>
  </v-container>
</template>

<script>

import { GetAlerts } from '@/request/resources.js'
import CreatedAgo from '@/helpers/createdAgo.js'
import apiRoute from '@/helpers/apiRoute'
import ImportanceColor from '@/views/Taxon/const/importanceColor.js'
import * as Turf from '@turf/turf'

export default {
  props: {
    zone: {
      type: Object,
      required: true
    }
  },
  computed: {
    importanceColor () {
      return ImportanceColor
    }
  },
  data () {
    return {
      notifications: []
    }
  },
  mounted () {
    GetAlerts({ params: { 'zone.id': this.zone.id } }).then(response => {
      this.notifications = response.data
    })
  },
  methods: {
    composeScientificName: (observation) => `${observation.taxon.parent.name} ${observation.taxon.name}`,
    imageRoute: (path) => `${apiRoute}${path}`,
    displayDate (date) {
      const time = Object.values(CreatedAgo(date))
      const labels = ['dia', 'hora', 'minuto', 'segundo']
      const index = time.findIndex(item => item > 0)
      return `Hace ${time[index]} ${labels[index]}${time[index] === 1 ? '' : 's'}`
    },
    getDistanceFromZone (geojson) {
      const from = Turf.point(this.zone.geojson.geometry.coordinates)
      const to = Turf.point(geojson.features[0].geometry.coordinates)

      return Turf.distance(from, to).toFixed(2)
    }
  }
}
</script>
