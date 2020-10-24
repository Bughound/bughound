<template>
  <v-container
    fluid
    class="pa-0">
    <v-app-bar
      rounded="false"
      color="transparent"
      flat
    >
      <v-toolbar-title>Zonas</v-toolbar-title>
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-list two-line>
      <template v-for="(zone) in filteredList">
        <v-list-item
          :key="zone.id"
          :to="{ name: 'Zona', params: { id: zone.id } }"
        >
          <v-list-item-avatar>
            <v-img :src="zoneType[zone.type].image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="zone.name"></v-list-item-title>
            <v-list-item-subtitle v-text="zoneType[zone.type].label"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ displayDate(zone.created_at) }}</v-list-item-action-text>
            </v-list-item-action>
        </v-list-item>
        <v-divider :key="`${zone.id}-divider`"/>
      </template>
    </v-list>

    <v-fab-transition>
      <v-btn
        fab
        dark
        fixed
        bottom
        right
        style="bottom: 80px"
        color="primary"
        :to="{ name: 'NewZone' }"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog
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
            <h3 class="text-h4 mt-15 font-weight-light">Cargando zonas</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import CreatedAgo from '@/helpers/createdAgo.js'
import SanitaryImage from '@/assets/images/zones/sanitary.svg'
import EconomicImage from '@/assets/images/zones/economic.svg'

export default {
  computed: {
    filteredList () {
      return this.zones
    }
  },
  data () {
    return {
      zones: [],
      isLoading: true,
      zoneType: {
        sanitary: {
          label: 'Urbana',
          image: SanitaryImage
        },
        economic: {
          label: 'Rural',
          image: EconomicImage
        }
      }
    }
  },
  async mounted () {
    this.zones = (await makeRequest('get', '/zones', { params: { _sort: 'id:DESC' } })).data
    this.isLoading = false
  },
  methods: {
    displayDate (date) {
      const time = Object.values(this.createdAgo(date))
      const labels = ['dias', 'horas', 'minutos', 'segundos']
      const index = time.findIndex(item => item > 0)
      return `Hace ${time[index]} ${labels[index]}`
    },
    createdAgo: CreatedAgo
  }
}
</script>
