<template>
  <v-container
    class="pa-5"
    fluid>
    <div class="d-inline-flex align-center mb-2">
      <span class="text-h5 mr-2">Comportamiento</span>
      <v-dialog
        v-model="dialog"
        width="100%"
        content-class="dialog-information"
        origin="bottom center"
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            dark
            color="primary"
            rounded
            small
            class="text-uppercase"
            v-bind="attrs"
            v-on="on"
          >
            {{ taxon.feeding.name }}
          </v-chip>
        </template>

        <v-card>
          <v-card-title class="text-capitalize">
            {{ taxon.feeding.name }}
          </v-card-title>

          <v-card-text>
            {{ taxon.feeding.description }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <v-divider/>

    <v-row class="mb-4">
      <v-col
        class="subtitle-1">
        <v-icon small>fa-moon</v-icon>Actividad registrada<br>
        <span class="text-h6 text-capitalize">{{ dayTimeString }}</span>
      </v-col>
      <v-divider
        vertical/>

      <v-col
        class="subtitle-1">
        <v-icon small>fa-clock</v-icon> Horario mas avistada<br>
        <span class="text-h6">{{ time.max }}hs</span>
      </v-col>
    </v-row>
    <template v-if="biologicalRelationships.length">
      <h5 class="text-h6">Relaciones biologicas</h5>
      <v-row>
        <v-col
          class="pt-0"
          cols="auto">
          <ul>
            <li
              v-for="(biologicalRelationship, index) in biologicalRelationships"
              :key="index"
              class="text-body-1">
              <span class="text-capitalize">{{ biologicalRelationship.biological_relationship_type.name }}</span> de {{ biologicalRelationship.objective.common_name }}
            </li>
          </ul>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>

import { TaxonStatistics } from '@/request/resources'
import { inRange } from '@/helpers/math.js'
import { makeRequest } from '@/helpers/makeRequest'

export default {
  props: {
    taxon: {
      type: Object,
      required: true
    }
  },
  computed: {
    dayTime () {
      return this.time ? inRange(this.time.min, 6, 19) || inRange(this.time.max, 6, 19) : false
    },
    nightTime () {
      return this.time ? (inRange(this.time.max, 20, 23) || inRange(this.time.min, 0, 5)) : false
    },
    dayTimeString () {
      if (this.dayTime && this.nightTime) {
        return 'Diurna / Nocturna'
      } else if (this.dayTime) {
        return 'Diurna'
      } else {
        return 'Nocturna'
      }
    }
  },
  data () {
    return {
      time: undefined,
      biologicalRelationships: [],
      dialog: false
    }
  },
  async mounted () {
    TaxonStatistics(this.taxon.id).then(response => {
      this.time = response.data.time
    })
    this.biologicalRelationships = (await makeRequest('get', '/biological-relationships', { params: { 'subject.id': this.taxon.id } })).data
  }
}
</script>
<style>
  .dialog-information {
    margin: 0;
    position: absolute;
    top: 0px !important;
  }
</style>
