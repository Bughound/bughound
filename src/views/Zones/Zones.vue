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
      <template v-for="(zone) in zones">
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
            <v-icon
              :color="zone.alerts.length ? 'red' : ''"
              small>fa-bell</v-icon>
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

  </v-container>
</template>

<script>

import { GetterNames } from '@/store/getters/getters'
import { ActionNames } from '@/store/actions/actions'
import CreatedAgo from '@/helpers/createdAgo.js'
import SanitaryImage from '@/assets/images/zones/sanitary.svg'
import EconomicImage from '@/assets/images/zones/economic.svg'

export default {
  computed: {
    zones () {
      return this.$store.getters[GetterNames.GetZones]
    }
  },
  data () {
    return {
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
  beforeCreate () {
    this.$store.dispatch(ActionNames.LoadZones)
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
