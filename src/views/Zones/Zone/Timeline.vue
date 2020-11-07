<template>
  <v-container class="pl-0 pr-8">
    <v-timeline
      dense
      clipped
    >
      <v-slide-x-transition
        group
      >
        <v-timeline-item
          v-for="observation in observations"
          :key="observation.id"
          class="mb-4"
          :color="getImportanceColor(observation.taxon)"
          large
          fill-dot
        >
          <template v-slot:icon>
            <v-avatar size="46">
              <img
                @click="loadObservation(observation.id)"
                :src="imageRoute(observation.image.formats.thumbnail.url)">
            </v-avatar>
          </template>
          <v-row justify="space-between">
            <v-col cols="7">
              <span>{{ observation.taxon.common_name }}</span>
              <div class="caption">
                {{ observation.taxon.parent.name }} {{ observation.taxon.name }}
              </div>
            </v-col>
            <v-col
              class="text-right"
              cols="5"
            >
              <span class="text-caption">{{ displayDate(observation.date) }}</span><br>
              <v-chip
                class="white--text text-uppercase"
                :color="getImportanceColor(observation.taxon)"
                label
                rounded
                x-small
              >
                {{ getImportanceLevel(observation.taxon) }}
              </v-chip>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
  </v-container>
</template>

<script>

import CreatedAgo from '@/helpers/createdAgo.js'
import ImportanceColor from '@/views/Taxon/const/importanceColor.js'
import ImportanceLevel from '@/views/Taxon/const/importanceLevel.js'
import apiRoute from '@/helpers/apiRoute'

export default {
  props: {
    observations: {
      type: Array,
      required: true
    }
  },
  methods: {
    displayDate (date) {
      const time = Object.values(CreatedAgo(date))
      const labels = ['dias', 'horas', 'minutos', 'segundos']
      const index = time.findIndex(item => item > 0)
      return `Hace ${time[index]} ${labels[index]}`
    },
    getImportanceColor (taxon) {
      const level = taxon.economic || taxon.sanitary
      return ImportanceColor[level]
    },
    getImportanceLevel (taxon) {
      const level = taxon.economic || taxon.sanitary
      return ImportanceLevel[level]
    },
    loadObservation (obsId) {
      this.$router.push({ name: 'Observacion', params: { id: obsId } })
    },
    imageRoute: (path) => `${apiRoute}${path}`
  }
}
</script>
