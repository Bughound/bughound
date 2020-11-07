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
    <h5 class="text-h6 mt-4">Cultivos afectados</h5>
    <v-row>
      <v-col
        class="pt-0"
        cols="auto">
        <v-chip-group>
          <v-dialog
            v-model="dialog"
            v-for="(plant, index) in taxon.hosts"
            :key="index"
            width="100%"
            content-class="dialog-information"
            origin="bottom center"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                v-on="on"
                :key="index"
                color="primary"
                rounded
              >
                {{ plant.name }}
              </v-chip>
            </template>

            <v-card>
              <v-card-title class="text-capitalize">
                {{ plant.name }}
              </v-card-title>

              <v-card-text>
                {{ plant.description }}
              </v-card-text>
            </v-card>
          </v-dialog>
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
