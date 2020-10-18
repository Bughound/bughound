<template>
  <v-container
    fluid
    class="pa-0">
    <v-app-bar
      rounded="false"
      color="transparent"
      flat
    >
      <v-toolbar-title>Observaciones</v-toolbar-title>
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-list two-line>
      <template v-for="(item) in filteredList">
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
            <h3 class="text-h4 mt-15 font-weight-light">Cargando observaciones</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <v-speed-dial
      v-model="filter"
      bottom
      right
      direction="top"
      style="bottom: 80px"
      fixed
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          color="primary"
          dark
          fab
          medium
          >
          <v-icon
            v-if="filter"
            dark>
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-filter
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        v-for="(btn, index) in filterButtons"
        :key="index"
        fab
        dark
        small
        @click="setFilter(btn.value)"
        :color="filterImportance.includes(btn.value) ? 'primary lighten-2' : 'primary'"
      >
        <v-icon>{{ btn.icon }}</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>

import { makeRequest } from '@/helpers/makeRequest'
import apiRoute from '@/helpers/apiRoute'
import CreatedAgo from '@/helpers/createdAgo.js'
import ImportanceColor from '@/views/Taxon/const/importanceColor.js'

export default {
  computed: {
    importanceColor () {
      return ImportanceColor
    },
    filteredList () {
      return this.observations.filter(item => this.filterImportance.length === 0 || this.filterImportance.some(filter => item.taxon[filter]))
    }
  },
  data () {
    return {
      observations: [],
      tabs: ['Mis observaciones', 'Cercanas'],
      filterImportance: [],
      filter: false,
      isLoading: true,
      filterButtons: [
        {
          icon: 'fa-heartbeat',
          value: 'sanitary'
        },
        {
          icon: 'fa-seedling',
          value: 'economic'
        }
      ]
    }
  },
  async mounted () {
    this.observations = (await makeRequest('get', '/observations', { params: { _sort: 'id:DESC' } })).data
    this.isLoading = false
  },
  methods: {
    composeScientificName (observation) {
      return `${observation.taxon.parent.name} ${observation.taxon.name}`
    },
    displayDate (date) {
      const time = Object.values(this.createdAgo(date))
      const labels = ['dias', 'horas', 'minutos', 'segundos']
      const index = time.findIndex(item => item > 0)
      return `Hace ${time[index]} ${labels[index]}`
    },
    setFilter (value) {
      const index = this.filterImportance.findIndex(filter => filter === value)

      if (index > -1) {
        this.filterImportance.splice(index, 1)
      } else {
        this.filterImportance.push(value)
      }
    },
    imageRoute: (path) => `${apiRoute}${path}`,
    createdAgo: CreatedAgo
  }
}
</script>
