<template>
  <v-container
    class="pa-5"
    fluid>
    <div class="d-inline-flex align-center mb-2">
      <span class="text-h5 mr-2">Económica</span>
      <v-chip
        dark
        :color="importanceColor()"
        rounded
        small
      >
        {{ importanceLevel() }}
      </v-chip>
    </div>
    <v-divider/>
    <v-row>
      <v-col
        class="pt-0 mt-2"
        cols="auto">
        <v-chip-group>
          <v-chip
            v-for="(plant, index) in taxon.hosts"
            :key="index"
            color="primary"
            rounded
          >
            {{ plant.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <h5 class="text-h6">Ataca principalmente</h5>
    <v-row>
      <v-col
        class="pt-0"
        cols="auto">
        <ul>
          <li
            v-for="(part, index) in taxon.plant_parts"
            :key="index"
            class="text-body-1">
            {{ part.name }}
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h6 class="text-h6">Recomendaciones</h6>
        <ul>
          <li
            v-for="(recomendation, index) in taxon.economic_recomendations"
            :key="index"
            class="text-body-1">
            {{ recomendation.description }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import importanceColors from './const/importanceColor'
import importanceLevel from './const/importanceLevel'

export default {
  props: {
    taxon: {
      type: Object,
      required: true
    },
    importance: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    importanceColor () {
      return this.importance.Economic ? importanceColors[this.importance.Economic] : 'primary'
    },
    importanceLevel () {
      return importanceLevel[this.importance.Economic].toUpperCase()
    }
  }
}
</script>
